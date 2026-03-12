from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import List, Optional
from jose import JWTError, jwt
from database import get_session, init_db
from models import (
    ExecutionHistory, CodeSubmission, User, UserCreate, 
    UserResponse, Token, TokenData, APIKeyUpdate
)
from compiler import (
    compile_and_execute_python, compile_and_execute_java, 
    compile_and_execute_cpp, compile_and_execute_c
)
from ai_service import get_ai_assistance
from auth_utils import verify_password, get_password_hash, create_access_token, SECRET_KEY, ALGORITHM

app = FastAPI(title="Compiler API")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    
    user = session.exec(select(User).where(User.email == token_data.email)).first()
    if user is None:
        raise credentials_exception
    return user

@app.on_event("startup")
def on_startup():
    init_db()

# Auth Endpoints
@app.post("/register", response_model=UserResponse)
async def register(user_data: UserCreate, session: Session = Depends(get_session)):
    existing_user = session.exec(select(User).where(User.email == user_data.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = get_password_hash(user_data.password)
    new_user = User(email=user_data.email, hashed_password=hashed_pwd)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return UserResponse(
        id=new_user.id, 
        email=new_user.email, 
        has_api_key=False, 
        created_at=new_user.created_at
    )

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        has_api_key=current_user.gemini_api_key is not None,
        created_at=current_user.created_at
    )

@app.post("/update-api-key")
async def update_api_key(key_data: APIKeyUpdate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    current_user.gemini_api_key = key_data.gemini_api_key
    session.add(current_user)
    session.commit()
    return {"message": "API Key updated successfully"}

# Compiler & AI Endpoints
class AIRequest(BaseModel):
    code: str
    language: str
    prompt_type: str = "complete"

@app.post("/ai/assist")
async def ai_assist(request: AIRequest, current_user: User = Depends(get_current_user)):
    if not current_user.gemini_api_key:
        raise HTTPException(status_code=400, detail="Gemini API Key not configured in profile")
    
    try:
        suggestion = await get_ai_assistance(
            request.code, 
            request.language, 
            current_user.gemini_api_key, 
            request.prompt_type
        )
        return {"suggestion": suggestion}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/run", response_model=ExecutionHistory)
async def run_code(submission: CodeSubmission, current_user: Optional[User] = Depends(get_current_user), session: Session = Depends(get_session)):
    try:
        if submission.language == 'python':
            output = await compile_and_execute_python(submission.code, submission.input_data)
        elif submission.language == 'java':
            output = await compile_and_execute_java(submission.code, submission.input_data)
        elif submission.language == 'cpp':
            output = await compile_and_execute_cpp(submission.code, submission.input_data)
        elif submission.language == 'c':
            output = await compile_and_execute_c(submission.code, submission.input_data)
        else:
            raise HTTPException(status_code=400, detail="Unsupported language")

        execution_record = ExecutionHistory(
            code=submission.code,
            input_data=submission.input_data,
            output=output,
            language=submission.language,
            user_id=current_user.id if current_user else None
        )
        session.add(execution_record)
        session.commit()
        session.refresh(execution_record)
        return execution_record
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history", response_model=List[ExecutionHistory])
async def get_history(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    statement = select(ExecutionHistory).where(ExecutionHistory.user_id == current_user.id).order_by(ExecutionHistory.created_at.desc())
    results = session.exec(statement).all()
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
