from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["codelens"]

users = db["users"]
analysis = db["analysis"]

def create_user(username, password):
    users.insert_one({"username": username, "password": password})

def find_user(username):
    return users.find_one({"username": username})

def save_result(username, code, result):
    analysis.insert_one({
        "username": username,
        "code": code,
        "result": result
    })

def get_history(username):
    return list(analysis.find({"username": username}, {"_id": 0}))