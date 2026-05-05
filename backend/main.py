from fastapi import FastAPI
from pydantic import BaseModel
from ai.analyzer import analyze_code
from database.db import *

app = FastAPI()

class Auth(BaseModel):
    username: str
    password: str

class CodeInput(BaseModel):
    username: str
    code: str

@app.post("/register")
def register(data: Auth):
    try:
        if find_user(data.username):
            return {"msg": "User exists"}

        create_user(data.username, data.password)
        return {"msg": "Registered successfully"}

    except Exception as e:
        return {"msg": str(e)}

@app.post("/login")
def login(data: Auth):
    user = find_user(data.username)

    if user and user["password"] == data.password:
        return {"msg": "Success"}

    return {"msg": "Invalid credentials"}

@app.post("/analyze")
def analyze(data: CodeInput):
    result = analyze_code(data.code)
    save_result(data.username, data.code, result)
    return result

@app.get("/history/{username}")
def history(username: str):
    return get_history(username)