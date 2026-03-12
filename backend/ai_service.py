import os
from google import genai
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

async def get_ai_assistance(code: str, language: str, api_key: str, prompt_type: str = "complete"):
    """
    Get AI assistance for code completion, fixing, or explanation.
    prompt_type: "complete", "fix", "explain"
    """
    if not api_key:
        return "Error: Gemini API key not provided. Please add your API key in your profile."

    try:
        # Create a new client with the user's API key
        client = genai.Client(api_key=api_key)
        
        prompts = {
            "complete": f"Continue the following {language} code. Provide ONLY the additional code, no explanations or markdown backticks:\n\n{code}",
            "fix": f"Identify and fix any errors in the following {language} code. Provide ONLY the corrected code, no explanations or markdown backticks:\n\n{code}",
            "explain": f"Explain what the following {language} code does in a concise way:\n\n{code}"
        }

        prompt = prompts.get(prompt_type, prompts["complete"])
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt
        )
        text = response.text.strip()
        
        if text.startswith("```"):
            lines = text.split("\n")
            if lines[0].startswith("```"):
                lines = lines[1:]
            if lines and lines[-1].startswith("```"):
                lines = lines[:-1]
            text = "\n".join(lines).strip()
        return text
    except Exception as e:
        return f"AI Error: {str(e)}"
