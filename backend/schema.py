# backend/schema.py
from pydantic import BaseModel, EmailStr

# sends a request to the database to create a new user.
class SignupRequest(BaseModel):
    email: EmailStr
    firstName: str
    lastName: str
    password: str
    confirmPassword: str
