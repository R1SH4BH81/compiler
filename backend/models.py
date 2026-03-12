from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional, List

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    gemini_api_key: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    executions: List["ExecutionHistory"] = Relationship(back_populates="user")

class ExecutionHistory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    code: str
    input_data: Optional[str] = None
    output: Optional[str] = None
    language: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="executions")

class UserCreate(SQLModel):
    email: str
    password: str

class UserLogin(SQLModel):
    email: str
    password: str

class UserResponse(SQLModel):
    id: int
    email: str
    has_api_key: bool
    created_at: datetime

class Token(SQLModel):
    access_token: str
    token_type: str

class TokenData(SQLModel):
    email: Optional[str] = None

class APIKeyUpdate(SQLModel):
    gemini_api_key: str

class CodeSubmission(SQLModel):
    code: str
    input_data: Optional[str] = None
    language: str
