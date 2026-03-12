import httpx
import os
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

JDOODLE_API_URL = "https://api.jdoodle.com/v1/execute"
JDOODLE_CLIENT_ID = os.getenv("JDOODLE_CLIENT_ID")
JDOODLE_CLIENT_SECRET = os.getenv("JDOODLE_CLIENT_SECRET")

# Language mapping for JDoodle API
# For JDoodle, versionIndex is required. 0 usually represents the latest version.
LANGUAGE_MAP = {
    "python": {"lang": "python3", "versionIndex": "4"}, # Python 3.10+
    "java": {"lang": "java", "versionIndex": "4"},   # JDK 17
    "cpp": {"lang": "cpp17", "versionIndex": "1"},  # G++ 17
    "c": {"lang": "c", "versionIndex": "5"}         # GCC 11
}

async def execute_remote_code(code: str, language: str, input_data: Optional[str] = None):
    if not JDOODLE_CLIENT_ID or not JDOODLE_CLIENT_SECRET:
        return "Error: JDoodle API credentials not configured in .env file."

    config = LANGUAGE_MAP.get(language)
    if not config:
        return f"Error: Unsupported language '{language}'"

    payload = {
        "clientId": JDOODLE_CLIENT_ID,
        "clientSecret": JDOODLE_CLIENT_SECRET,
        "script": code,
        "stdin": input_data or "",
        "language": config["lang"],
        "versionIndex": config["versionIndex"]
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(JDOODLE_API_URL, json=payload, timeout=20.0)
            response.raise_for_status()
            result = response.json()
            
            # JDoodle response format: { "output": "...", "statusCode": 200, "memory": "...", "cpuTime": "..." }
            output = result.get("output", "")
            
            # Handle potential internal errors from JDoodle
            if result.get("statusCode") != 200:
                return f"JDoodle Error: {output}"
                
            return output
            
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 401:
                return "API Error: Invalid JDoodle credentials. Please check your .env file."
            return f"API Error: {e.response.status_code} - {e.response.text}"
        except Exception as e:
            return f"Execution Error: {str(e)}"

async def compile_and_execute_python(code, input_data):
    return await execute_remote_code(code, "python", input_data)

async def compile_and_execute_java(code, input_data):
    return await execute_remote_code(code, "java", input_data)

async def compile_and_execute_cpp(code, input_data):
    return await execute_remote_code(code, "cpp", input_data)

async def compile_and_execute_c(code, input_data):
    return await execute_remote_code(code, "c", input_data)
