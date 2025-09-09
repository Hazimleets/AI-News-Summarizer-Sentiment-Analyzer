# ai-service/app/main.py

from fastapi import FastAPI
from pydantic import BaseModel
from .summarizer import summarize_text  # import the function directly
from .sentiment import analyze_sentiment

app = FastAPI()

class TextIn(BaseModel):
    text: str
    
@app.get("/")
async def root():
    return {"message": "✅ AI Service backend is working!"}

@app.post("/summarize")
async def summarize(payload: TextIn):
    return {"summary": summarize_text(payload.text)}

@app.post("/sentiment")
async def sentiment(payload: TextIn):
    return analyze_sentiment(payload.text)
