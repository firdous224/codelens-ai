import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API
genai.configure(
    api_key=os.getenv("AIzaSyCykF9zzpPZ8r_2cVBew_cox6BdjUHp9h0")
)

# Use Gemini 1.5 Pro for best results
model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config={
        "temperature": 0.3,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
    }
)

def analyze_code(code, language):
    prompt = f"""
You are an expert code analyzer AI.
Analyze the following {language} code
very carefully and provide a detailed
analysis in EXACTLY this format:

INTENTION:
[What the programmer was trying to do,
in 2-3 clear sentences]

ACTUAL_BEHAVIOR:
[What the code actually does,
in 2-3 clear sentences]

GAPS:
[List each gap/bug found like this:
- Line X: [issue] → [should be]
- Line X: [issue] → [should be]]

ALTERNATIVE_1:
[First optimized implementation
with proper code]

ALTERNATIVE_2:
[Second optimized implementation
with proper code]

ALTERNATIVE_3:
[Third optimized implementation
with proper code]

EXPLANATION:
[Explain the entire code in simple
English that a non programmer
can understand, in 3-4 sentences]

SCORE:
[A number between 0-100 based on:
- Code correctness (40 points)
- Code quality (30 points)
- Best practices (30 points)]

IMPROVEMENTS:
[List 3-5 specific improvements
the programmer should make]

CODE:
```{language}
[Write the complete corrected
version of the code]
```

Now analyze this code:
```{language}
{code}
```
"""
    try:
        response = model.generate_content(prompt)
        return parse_response(
            response.text,
            code
        )
    except Exception as e:
        return {
            "intention": "Error analyzing code",
            "actual_behavior": str(e),
            "gaps": "Could not analyze",
            "alternatives": [],
            "explanation": "Error occurred",
            "score": 0,
            "improvements": [],
            "corrected_code": code
        }

def parse_response(response, original):
    result = {
        "intention": "",
        "actual_behavior": "",
        "gaps": "",
        "alternatives": [],
        "explanation": "",
        "score": 0,
        "improvements": "",
        "corrected_code": ""
    }
    
    sections = {
        "INTENTION:": "intention",
        "ACTUAL_BEHAVIOR:": "actual_behavior",
        "GAPS:": "gaps",
        "EXPLANATION:": "explanation",
        "IMPROVEMENTS:": "improvements",
    }
    
    current = None
    alt_count = 0
    current_alt = ""
    in_code_block = False
    corrected_code = []
    in_corrected = False
    
    lines = response.split('\n')
    
    for line in lines:
        # Get score
        if line.startswith("SCORE:"):
            score_text = line.replace(
                "SCORE:", ""
            ).strip()
            digits = ''.join(
                filter(str.isdigit, score_text)
            )
            if digits:
                result["score"] = min(
                    int(digits), 100
                )
            current = None
            continue
            
        # Get alternatives
        if line.startswith("ALTERNATIVE_"):
            if current_alt:
                result["alternatives"].append(
                    current_alt.strip()
                )
            current_alt = ""
            alt_count += 1
            current = None
            continue
            
        # Get corrected code
        if line.startswith("CODE:"):
            in_corrected = True
            current = None
            continue
            
        if in_corrected:
            corrected_code.append(line)
            continue
            
        # Check sections
        found = False
        for key, val in sections.items():
            if line.startswith(key):
                current = val
                found = True
                break
                
        if not found and current:
            if current == "intention":
                result["intention"] += line + " "
            elif current == "actual_behavior":
                result["actual_behavior"] += line + " "
            elif current == "gaps":
                result["gaps"] += line + "\n"
            elif current == "explanation":
                result["explanation"] += line + " "
            elif current == "improvements":
                result["improvements"] += line + "\n"
        elif not found and alt_count > 0:
            current_alt += line + "\n"
    
    if current_alt:
        result["alternatives"].append(
            current_alt.strip()
        )
    
    result["corrected_code"] = '\n'.join(
        corrected_code
    ).strip()
    
    # Clean up
    for key in ["intention", "actual_behavior", 
                "explanation"]:
        result[key] = result[key].strip()
    
    return result