# NewsAI

AI-powered news summarizer and sentiment dashboard.

## Features
- Search latest articles by keyword
- AI summarization (T5 small)
- Sentiment classification (DistilBERT)
- Dashboard with pie chart, trend line, word cloud
- Admin login and logs

## Tech Stack
- Frontend: React + Tailwind
- Backend: Node.js + Express + MongoDB
- AI Service: FastAPI + Hugging Face
- Database: MongoDB Atlas or local

## Run Locally
```bash
git clone <repo>
cd newsai
docker-compose up --build
