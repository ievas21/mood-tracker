# backend/main.py
from fastapi import FastAPI, Request, Depends
from pydantic import BaseModel

from schemas.analyze import Entry, Result, AnalysisResponse

from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from transformers import pipeline

from fastapi.middleware.cors import CORSMiddleware

from schema import SignupRequest
from auth import signup_user
from fastapi import HTTPException

from auth import hash_pwd
from dotenv import load_dotenv

from db import SessionLocal
from sqlalchemy.orm import Session
from models import User, Base
from db import engine

load_dotenv()

Base.metadata.create_all(bind=engine)
app = FastAPI()

# CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[    "http://localhost:3000",
                        "http://192.168.1.230:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# load HuggingFace sentiment pipeline (only once at startup)
bert_classifier = pipeline("sentiment-analysis")

# VADER instance
vader_analyzer = SentimentIntensityAnalyzer()

# define the api endpoint for user signup
@app.post("/signup")
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    """
        This endpoint allows users to sign up by providing their email, first name, last name, password, and confirm password.
        It validates the input, checks if the passwords match, and then calls the signup_user function to create a new user.
        It returns a 400 error if the passwords do not match or if there is an error creating the user.
    """
    # confirm that the password and confirm_password fields match
    if data.password != data.confirmPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    # check to ensure that the user does not already exist in the database
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    # has the password and create a new user in the database
    hashed_pw = hash_pwd(data.password)
    new_user = User(
        email=data.email,
        first_name=data.firstName,
        last_name=data.lastName,
        hashed_password=hashed_pw
    )

    # add the new user to the database session and commit the changes
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

@app.post("/analyze", response_model=AnalysisResponse)
def analyze(entry: Entry):
    text = entry.entry

    # call the TEXTBLOB inastance to analyze the text
    text_blob_score = TextBlob(text).sentiment.polarity
    # classify the score into a label (e.g. Positive, Negative, Neutral)
    text_blob_label = classify_label(text_blob_score)

    # call the VADER instance to analyze the text (returning the normalized, weighted, and compounded score)
    vader_score = vader_analyzer.polarity_scores(text)['compound']
    # classify the score into a label (e.g. Positive, Negative, Neutral)
    vader_label = classify_label(vader_score)

    # call the BERT instance to analyze the text, returning the label and score
    bert_raw = bert_classifier(text)[0] 
    bert_label = "" 

    if bert_raw['label'] == "POSITIVE":
        bert_label = "Positive"
    else:
        bert_label = "Negative"

    bert_score = bert_raw['score']

    # compile the results into a list of Result objects
    results = [
        Result(model="TextBlob", score=round(text_blob_score, 3), label=text_blob_label),
        Result(model="VADER", score=round(vader_score, 3), label=vader_label),
        Result(model="BERT", score=round(bert_score, 3), label=bert_label)
    ]

    # return the AnalysisResponse object containing the text and results
    return AnalysisResponse(text=text, results=results)


# helper function that classifies the sentiment score into a label
def classify_label(score: float) -> str:
    if score > 0.1:
        return "Positive"
    elif score < -0.1:
        return "Negative"
    else:
        return "Neutral"
