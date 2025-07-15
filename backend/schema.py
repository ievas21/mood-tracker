# backend/schema.py
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# sends a request to the database to create a new user.
class SignupRequest(BaseModel):
    email: EmailStr
    firstName: str
    lastName: str
    password: str
    confirmPassword: str

# used to login a user by sending a request to the database
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

 # used to return user information for the profile page
class UserResponse(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str

    class Config:
        # allows us to work with ORM models
        orm_mode = True

# used to submit user input to the database (in user entry page)
class EntryCreate(BaseModel):
    title: str
    content: str
    mood_score: Optional[str] = None

# used to display entry information to the user (in profile page)
class EntryOut(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime
    mood_score: Optional[str]

    class Config:
        orm_mode = True

