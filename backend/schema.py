# backend/schema.py
from pydantic import BaseModel, EmailStr

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
