# backend/main.py

from fastapi import FastAPI, Request
from pydantic import BaseModel

from schemas.analyze import Entry, Result, AnalysisResponse

from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from transformers import pipeline

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# load HuggingFace sentiment pipeline (only once at startup)
bert_classifier = pipeline("sentiment-analysis")

# VADER instance
vader_analyzer = SentimentIntensityAnalyzer()

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

