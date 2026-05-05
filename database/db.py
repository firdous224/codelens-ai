from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# Connect to MongoDB Atlas
client = MongoClient(
    os.getenv("mongodb+srv://banglewalefirdous_db_user:firdous224@cluster0.dqzudxu.mongodb.net/?appName=Cluster0")
)
db = client["codelens_ai"]

def save_analysis(
    code, language, result
):
    analysis = {
        "code": code,
        "language": language,
        "intention": result["intention"],
        "actual_behavior": result["actual_behavior"],
        "gaps": result["gaps"],
        "alternatives": result["alternatives"],
        "explanation": result["explanation"],
        "score": result["score"],
        "improvements": result["improvements"],
        "corrected_code": result["corrected_code"],
        "timestamp": datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        )
    }
    db.analyses.insert_one(analysis)
    return True

def get_history():
    return list(
        db.analyses.find(
            {},
            {"_id": 0}
        ).sort("timestamp", -1).limit(10)
    )