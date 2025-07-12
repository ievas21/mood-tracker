# backend/db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# define the database URL (using SQLite for simplicity)
DATABASE_URL = "sqlite:///./moodjournal.db"

# create the database engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

# function to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()