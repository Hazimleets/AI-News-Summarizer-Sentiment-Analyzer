# ai-service/app/preprocess.py
import re
import nltk
from nltk.corpus import stopwords

nltk.download("stopwords", quiet=True)
stop_words = set(stopwords.words("english"))

def clean_text(text: str) -> str:
    text = re.sub(r"http\\S+", "", text)
    text = re.sub(r"[^a-zA-Z ]", "", text)
    tokens = [w for w in text.lower().split() if w not in stop_words]
    return " ".join(tokens)