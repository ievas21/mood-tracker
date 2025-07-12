# Mood Tracker App – Sentiment Analysis on Journal Entries

A full-stack web application that helps users track their emotional well-being over time by analyzing journal entries using multiple NLP sentiment analysis models.
Includes side-by-side model comparisons and explainability for each sentiment prediction.

## Features

- User authentication (signup & login)
- Sentiment analysis using VADER, TextBlob, and BERT
- Journal entry submission and analysis
- Token-based authentication with JWT
- FastAPI backend with SQLite

## Tech Stack

- **Frontend**: React, styled-components
- **Backend**: FastAPI, SQLAlchemy, SQLite
- **NLP**: TextBlob, VADER, Hugging Face Transformers
- **Auth**: JWT (JSON Web Tokens)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mood-journal.git
cd mood-journal
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
### 2. Set Up the Frontend

```bash
cd frontend
npm install
npm start
```
The React app will be served at http://localhost:3000 and will connect to the FastAPI backend at http://localhost:8000.

### 3. Environment Variables
In the backend folder, create a .env file with the following keys:

```
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
```
You can generate a secret key using Python:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```


### License
This project is for educational purposes and not intended for production use.
