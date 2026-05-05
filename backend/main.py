from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os
sys.path.append(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
))
from ai.analyzer import analyze_code
from database.db import save_analysis, get_history

app = FastAPI(
    title="CodeLens AI",
    description="AI Code Analyzer API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeInput(BaseModel):
    code: str
    language: str

@app.get("/")
def home():
    return {
        "message": "CodeLens AI Running!",
        "status": "active"
    }

@app.post("/analyze")
def analyze(input: CodeInput):
    result = analyze_code(
        input.code,
        input.language
    )
    save_analysis(
        input.code,
        input.language,
        result
    )
    return result

@app.get("/history")
def history():
    return get_history()