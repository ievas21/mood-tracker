# schemas/analyze.py
from pydantic import BaseModel
from typing import List, Tuple

# defines the data structure used for the input of the analysis endpoint (i.e., the journal entry)
class Entry(BaseModel):
    entry: str

# defines the data structure used for the output of the sentiment analysis of the entry 
class Result(BaseModel):
    model: str
    score: float
    label: str

# defines the data structure used for the response of the analysis endpoint (i.e., interprets the results from all of the models)
class AnalysisResponse(BaseModel):
    text: str
    results: List[Result]

