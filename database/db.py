from pymongo import MongoClient

# 🔥 Direct MongoDB URL (no .env issues)
MONGO_URI = "mongodb+srv://codelens:codelens224@cluster0.dqzudxu.mongodb.net/codelens"

client = MongoClient(MONGO_URI)

# Test connection
try:
    client.admin.command('ping')
    print("✅ MongoDB Connected Successfully")
except Exception as e:
    print("❌ MongoDB Error:", e)

db = client["codelens"]

users = db["users"]
analysis = db["analysis"]

def create_user(username, password):
    users.insert_one({
        "username": username,
        "password": password
    })

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