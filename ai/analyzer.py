from google import genai
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("AIzaSyCykF9zzpPZ8r_2cVBew_cox6BdjUHp9h0"))

def analyze_code(code):
    prompt = f"""
You are an expert software engineer.

Analyze the code and return ONLY JSON:

{{
  "intent": "",
  "bugs": [],
  "gaps": [],
  "suggestions": [],
  "alternatives": [],
  "score": 0,
  "explanation": ""
}}

Code:
{code}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        text = response.text.strip()
        print("AI RAW:", text)

        start = text.find("{")
        end = text.rfind("}") + 1
        json_text = text[start:end]

        return json.loads(json_text)

    except Exception as e:
        print("AI ERROR:", e)

        return {
            "intent": "Error analyzing code",
            "bugs": [],
            "gaps": [],
            "suggestions": [],
            "alternatives": [],
            "score": 0,
            "explanation": str(e)
        }