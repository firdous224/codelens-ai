from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from pymongo import MongoClient
from bson import ObjectId
import re

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- MONGODB ----------------
MONGO_URI = "mongodb+srv://codelens:codelens224@cluster0.dqzudxu.mongodb.net/codelens"

client = MongoClient(MONGO_URI)

try:
    client.admin.command('ping')
    print("✅ MongoDB Connected")
except Exception as e:
    print("❌ MongoDB Error:", e)

db = client["codelens"]

history_collection = db["history"]
users_collection = db["users"]

# ---------------- MODELS ----------------
class CodeInput(BaseModel):
    code: str
    username: str

class UserLogin(BaseModel):
    username: str
    password: str = ""

# ---------------- AUTH ----------------
@app.post("/register")
def register(user: UserLogin):
    try:
        if not user.username:
            return {"status": "error", "message": "Username required", "username": None}

        existing_user = users_collection.find_one({"username": user.username})

        if existing_user:
            return {"status": "error", "message": "User already exists", "username": user.username}

        users_collection.insert_one({
            "username": user.username,
            "password": user.password,
            "created_at": datetime.utcnow()
        })
        print(f"✅ New user created: {user.username}")
        return {"status": "success", "message": "User registered successfully", "username": user.username}

    except Exception as e:
        print("❌ Register Error:", e)
        return {"status": "error", "message": "Registration failed", "username": None}


@app.post("/login")
def login(user: UserLogin):
    try:
        if not user.username:
            return {"status": "error", "message": "Username required", "username": None}

        existing_user = users_collection.find_one({"username": user.username})

        if not existing_user:
            return {"status": "error", "message": "User not found", "username": user.username}

        # simple password check
        if existing_user.get("password") != user.password:
            return {"status": "error", "message": "Invalid password", "username": user.username}

        print(f"✅ User logged in: {user.username}")
        return {"status": "success", "message": "Login successful", "username": user.username}

    except Exception as e:
        print("❌ Login Error:", e)
        return {"status": "error", "message": "Login failed", "username": None}


# ---------------- LANGUAGE DETECTION ----------------
def detect_language(code: str) -> str:
    patterns = {
        "Python": [r"def \w+\(", r"import \w+", r"print\(", r"if __name__ == ['\"]__main__['\"]:"],
        "JavaScript": [r"const \w+ =", r"let \w+ =", r"console\.log\(", r"function \w+\(", r"=>"],
        "Java": [r"public class \w+", r"public static void main", r"System\.out\.println"],
        "C++": [r"#include <iostream>", r"int main\(\)", r"std::cout"],
        "C": [r"#include <stdio\.h>", r"printf\("],
        "Go": [r"package main", r"func main\(\)", r"fmt\.Println"],
        "Rust": [r"fn main\(\)", r"println!"],
        "PHP": [r"<\?php", r"echo "]
    }
    
    scores = {lang: 0 for lang in patterns}
    
    for lang, regexes in patterns.items():
        for regex in regexes:
            if re.search(regex, code):
                scores[lang] += 1
                
    best_match = max(scores, key=scores.get)
    return best_match if scores[best_match] > 0 else "Unknown"

# ---------------- ANALYZER ----------------
def analyze_code_logic(code: str, language: str):
    bugs = []
    score = 90

    if "/ 0" in code or "b = 0" in code:
        bugs.append("Division by zero error")
        score -= 30

    if "for" in code and "range" not in code:
        bugs.append("Inefficient loop detected")
        score -= 10

    if "==" in code:
        bugs.append("Possible logical comparison issue")
        score -= 5

    return {
        "intent": "The code aims to process an array, iterate over it, and perform specific logic or validation checks.",
        "bugs": bugs,
        "gaps": [
            "Missing null/None checks",
            "Potential inefficiency in large loops",
            "Missing type validations"
        ],
        "gap_summary": [
            {"issue": "Missing None check", "impact": "High", "color": "var(--accent-red)"},
            {"issue": "Inefficient lookup", "impact": "Medium", "color": "#f5a623"},
            {"issue": "Potential edge case", "impact": "Low", "color": "var(--accent-green)"}
        ],
        "suggestions": ["Add validation checks", "Use more efficient data structures like sets"] if bugs else ["Code is optimized"],
        "alternatives": ["Use list comprehension or specialized library functions"],
        "score": score,
        "explanation": "This code takes an input list, checks each item, and builds a result based on conditions.",
        "step_by_step_explanation": [
            {"title": "Read a list of items", "desc": "It takes a list as input and prepares for processing."},
            {"title": "Check each item one by one", "desc": "It loops through the list from start to end."},
            {"title": "Validate and process", "desc": "It checks conditions and adds the item to the result if it passes."},
            {"title": "Return the final output", "desc": "Finally, it returns the processed data."}
        ],
        "time_complexity": "O(n^2)",
        "space_complexity": "O(n)",
        "actual_code": code,
        "intended_code": "def intended_logic(arr):\n    if arr is None:\n        return []\n    \n    result = []\n    seen = set()\n    for item in arr:\n        if item not in seen:\n            seen.add(item)\n            result.append(item)\n    return result"
    }


# ---------------- ANALYZE + SAVE ----------------
@app.post("/analyze")
def analyze(data: CodeInput):
    try:
        print("👉 Analyzing for:", data.username)

        detected_lang = detect_language(data.code)
        result = analyze_code_logic(data.code, detected_lang)
        result["language"] = detected_lang

        history_collection.insert_one({
            "username": data.username,
            "code": data.code,
            "language": detected_lang,
            "result": result,
            "created_at": datetime.utcnow()
        })

        print(f"✅ Saved to MongoDB - Lang: {detected_lang}")

        return result

    except Exception as e:
        print("❌ Analyze Error:", e)
        raise HTTPException(status_code=500, detail="Analysis failed")


# ---------------- HISTORY ----------------
@app.get("/history/{username}")
def get_history(username: str):
    try:
        data = list(
            history_collection.find(
                {"username": username}
            ).sort("created_at", -1)
        )

        for item in data:
            item["_id"] = str(item["_id"])

        print(f"📜 History fetched for {username}: {len(data)} items")
        return data

    except Exception as e:
        print("❌ History Error:", e)
        return []

@app.get("/report/{id}")
def get_report(id: str):
    try:
        report = history_collection.find_one({"_id": ObjectId(id)})
        if not report:
            raise HTTPException(status_code=404, detail="Report not found")
        
        report["_id"] = str(report["_id"])
        return report
    except Exception as e:
        print("❌ Get Report Error:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch report")