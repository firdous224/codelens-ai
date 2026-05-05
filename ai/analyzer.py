import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """
You are CodeLens AI — the world's most advanced code analyzer.
You analyze code in ANY programming language with extreme precision.
You understand logic errors, security vulnerabilities, performance issues,
design patterns, memory leaks, edge cases, and best practices.
Always provide detailed, accurate, and actionable analysis.
"""

def analyze_code(code, language):
    prompt = f"""
Perform a DEEP and COMPREHENSIVE analysis of this {language} code.

Respond in EXACTLY this format with these EXACT headers:

INTENTION:
[2-3 sentences about what programmer was trying to accomplish]

ACTUAL_BEHAVIOR:
[2-3 sentences about what code actually does when executed]

COMPLEXITY:
[Time complexity: O(?) and Space complexity: O(?)]

GAPS:
[List every gap found like:
- Line X: [exact issue] → [fix needed]]

SECURITY_ISSUES:
[List security vulnerabilities or "None found"]

PERFORMANCE_ISSUES:
[List performance problems or "None found"]

ALTERNATIVE_1:
[Title: Better approach name]
[Complete optimized code]

ALTERNATIVE_2:
[Title: Most efficient approach]
[Complete optimized code]

ALTERNATIVE_3:
[Title: Production ready approach]
[Complete production code]

CORRECTED_CODE:
[Complete corrected version of original code]

EXPLANATION:
[4-5 sentences in simple English for non-programmers]

SCORE:
[Number 0-100]

SCORE_BREAKDOWN:
Correctness: X/40
Security: X/20
Performance: X/20
Best Practices: X/20

IMPROVEMENTS:
[List 5-7 improvements:
- [improvement]: [why needed]]

CODE:
```{language}
[Complete fixed production ready version]
```

Now analyze this {language} code:
```{language}
{code}
```
"""
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                temperature=0.2,
                max_output_tokens=8192,
            ),
            contents=prompt
        )
        return parse_response(response.text, language)
    except Exception as e:
        return error_response(str(e))


def parse_response(response, language):
    result = {
        "intention": "",
        "actual_behavior": "",
        "complexity": "",
        "gaps": [],
        "security_issues": [],
        "performance_issues": [],
        "alternatives": [],
        "corrected_code": "",
        "explanation": "",
        "score": 0,
        "score_breakdown": {},
        "improvements": [],
        "fixed_code": "",
        "language": language
    }

    current_section = None
    current_alt = []
    alt_title = ""
    alternatives = []
    fixed_code_lines = []
    corrected_lines = []

    lines = response.split('\n')

    for line in lines:
        if line.startswith("INTENTION:"):
            current_section = "intention"; continue
        elif line.startswith("ACTUAL_BEHAVIOR:"):
            current_section = "actual_behavior"; continue
        elif line.startswith("COMPLEXITY:"):
            current_section = "complexity"; continue
        elif line.startswith("GAPS:"):
            current_section = "gaps"; continue
        elif line.startswith("SECURITY_ISSUES:"):
            current_section = "security"; continue
        elif line.startswith("PERFORMANCE_ISSUES:"):
            current_section = "performance"; continue
        elif line.startswith("ALTERNATIVE_"):
            if current_alt:
                alternatives.append({"title": alt_title, "code": '\n'.join(current_alt)})
            current_alt = []
            alt_title = line.split(":", 1)[-1].strip() if ":" in line else f"Alternative {len(alternatives)+1}"
            current_section = "alternative"; continue
        elif line.startswith("CORRECTED_CODE:"):
            current_section = "corrected"; continue
        elif line.startswith("EXPLANATION:"):
            current_section = "explanation"; continue
        elif line.startswith("SCORE_BREAKDOWN:"):
            current_section = "score_breakdown"; continue
        elif line.startswith("SCORE:"):
            score_text = line.replace("SCORE:", "").strip()
            digits = ''.join(filter(str.isdigit, score_text))
            if digits:
                result["score"] = min(int(digits[:3]), 100)
            current_section = None; continue
        elif line.startswith("IMPROVEMENTS:"):
            current_section = "improvements"; continue
        elif line.startswith("CODE:"):
            current_section = "fixed_code"; continue

        if current_section == "intention":
            result["intention"] += line + " "
        elif current_section == "actual_behavior":
            result["actual_behavior"] += line + " "
        elif current_section == "complexity":
            result["complexity"] += line + " "
        elif current_section == "gaps":
            if line.strip().startswith("-"):
                result["gaps"].append(line.strip())
        elif current_section == "security":
            if line.strip().startswith("-"):
                result["security_issues"].append(line.strip())
        elif current_section == "performance":
            if line.strip().startswith("-"):
                result["performance_issues"].append(line.strip())
        elif current_section == "alternative":
            current_alt.append(line)
        elif current_section == "corrected":
            corrected_lines.append(line)
        elif current_section == "explanation":
            result["explanation"] += line + " "
        elif current_section == "score_breakdown":
            if ":" in line:
                parts = line.split(":", 1)
                result["score_breakdown"][parts[0].strip()] = parts[1].strip()
        elif current_section == "improvements":
            if line.strip().startswith("-"):
                result["improvements"].append(line.strip())
        elif current_section == "fixed_code":
            fixed_code_lines.append(line)

    if current_alt:
        alternatives.append({"title": alt_title, "code": '\n'.join(current_alt)})

    result["alternatives"] = alternatives
    result["corrected_code"] = '\n'.join(corrected_lines).strip()
    result["fixed_code"] = '\n'.join(fixed_code_lines).strip()

    for field in ["intention", "actual_behavior", "complexity", "explanation"]:
        result[field] = result[field].strip()

    return result


def error_response(error):
    return {
        "intention": "Error analyzing code",
        "actual_behavior": str(error),
        "complexity": "N/A",
        "gaps": ["Could not analyze code. Check your API key."],
        "security_issues": [],
        "performance_issues": [],
        "alternatives": [],
        "corrected_code": "",
        "explanation": "An error occurred during analysis.",
        "score": 0,
        "score_breakdown": {},
        "improvements": [],
        "fixed_code": "",
        "language": "unknown"
    }