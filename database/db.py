from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

try:
    client = MongoClient(os.getenv("MONGODB_URL"), serverSelectionTimeoutMS=5000)
    client.server_info()
    db = client["codelens_ai"]
    DB_CONNECTED = True
except Exception as e:
    print(f"MongoDB connection failed: {e}")
    DB_CONNECTED = False
    db = None


def save_analysis(code, language, result):
    if not DB_CONNECTED:
        return False
    try:
        analysis = {
            "code": code[:2000],
            "language": language,
            "intention": result.get("intention", ""),
            "actual_behavior": result.get("actual_behavior", ""),
            "gaps": result.get("gaps", []),
            "security_issues": result.get("security_issues", []),
            "performance_issues": result.get("performance_issues", []),
            "explanation": result.get("explanation", ""),
            "score": result.get("score", 0),
            "score_breakdown": result.get("score_breakdown", {}),
            "improvements": result.get("improvements", []),
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        db.analyses.insert_one(analysis)
        return True
    except Exception as e:
        print(f"Save error: {e}")
        return False


def get_history():
    if not DB_CONNECTED:
        return []
    try:
        return list(
            db.analyses.find({}, {"_id": 0})
            .sort("timestamp", -1)
            .limit(20)
        )
    except Exception as e:
        print(f"History error: {e}")
        return []