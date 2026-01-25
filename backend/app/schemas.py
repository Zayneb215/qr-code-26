from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserOut(BaseModel):
    id: int
    email: EmailStr
    name: str
    last_name: str

    model_config = {"from_attributes": True}


class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    name: str
    last_name: str


class TokenOut(BaseModel):
    access_token: str


# ---- New: generic user create/list schemas (for /users) ----
class UserCreate(BaseModel):
    name: str
    age: int = Field(ge=0, le=150)
    email: EmailStr
    matriculation_number: str
    married: bool
    phone_number: str


class UserInfoOut(BaseModel):
    id: int
    name: str
    age: Optional[int] = None
    email: EmailStr
    matriculation_number: Optional[str] = None
    married: Optional[bool] = None
    phone_number: Optional[str] = None

    model_config = {"from_attributes": True}