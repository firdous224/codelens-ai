from google import genai
import os, json
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_code(code):
    prompt = f"""
You are an expert software engineer.

Analyze ANY programming language code.

Return ONLY JSON:
{{
 "intent": "",
 "gaps": [],
 "bugs": [],
 "suggestions": [],
 "alternatives": [],
 "score": 0,
 "explanation": ""
}}

Code:
{code}
"""

    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt
    )

    text = response.text.strip()

    try:
        return json.loads(text)
    except:
        start = text.find("{")
        end = text.rfind("}") + 1
        return json.loads(text[start:end])