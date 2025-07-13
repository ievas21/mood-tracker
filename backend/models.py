# backend/models.py
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# defines the user table for storing user information
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)

    # establishes the one-to-many relationship with journal entries
    journal_entries = relationship("JournalEntry", back_populates="owner")

# defines the journal entry table for storing user journal entries
class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    mood_score = Column(String)

    # establishes the foreign key relationship with the user table
    user_id = Column(Integer, ForeignKey("users.id"))
    # establishes the relationship with the user who owns the journal entry
    owner = relationship("User", back_populates="journal_entries")
