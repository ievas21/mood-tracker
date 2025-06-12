from fastapi import FastAPI, Request
from pydantic import BaseModel

from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

class Entry(BaseModel):
    entry: str

@app.post("/analyze")
def analyze(entry: Entry):
    text = entry.entry

    blob_score = TextBlob(text).sentiment.polarity
    vader_score = SentimentIntensityAnalyzer().polarity_scores(text)['compound']

    return {
        "results": [
            {"model": "TextBlob", "score": round(blob_score, 3)},
            {"model": "VADER", "score": round(vader_score, 3)}
        ]
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

