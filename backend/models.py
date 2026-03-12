from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class ExecutionHistory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    code: str
    input_data: Optional[str] = None
    output: Optional[str] = None
    language: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CodeSubmission(SQLModel):
    code: str
    input_data: Optional[str] = None
    language: str
