# ai-service/app/sentiment.py
from transformers import pipeline

classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

def analyze_sentiment(text: str):
    if not text:
        return {"label": "Neutral", "score": 0}
    result = classifier(text[:512])[0]
    label = result["label"]
    if label == "POSITIVE":
        label = "Positive"
    elif label == "NEGATIVE":
        label = "Negative"
    else:
        label = "Neutral"
    return {"label": label, "score": result["score"]}