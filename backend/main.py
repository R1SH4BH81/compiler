from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from typing import List
from database import get_session, init_db
from models import ExecutionHistory, CodeSubmission
from compiler import compile_and_execute_python, compile_and_execute_java, compile_and_execute_cpp, compile_and_execute_c

app = FastAPI(title="Compiler API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.post("/run", response_model=ExecutionHistory)
async def run_code(submission: CodeSubmission, session: Session = Depends(get_session)):
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
            language=submission.language
        )
        session.add(execution_record)
        session.commit()
        session.refresh(execution_record)
        return execution_record
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history", response_model=List[ExecutionHistory])
async def get_history(session: Session = Depends(get_session)):
    statement = select(ExecutionHistory).order_by(ExecutionHistory.created_at.desc())
    results = session.exec(statement).all()
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
