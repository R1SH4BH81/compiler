import os
import hashlib
import bcrypt
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from dotenv import load_dotenv

load_dotenv()

# Security settings
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

def _get_prehashed_password(password: str) -> bytes:
    # SHA-256 hash the password and return the hex digest as bytes
    # This ensures the input to bcrypt is always 64 characters (well within 72 byte limit)
    return hashlib.sha256(password.encode("utf-8")).hexdigest().encode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        # Convert hashed_password string from DB to bytes
        hashed_bytes = hashed_password.encode("utf-8")
        
        # Try verifying with pre-hashing first (for new passwords)
        prehashed = _get_prehashed_password(plain_password)
        if bcrypt.checkpw(prehashed, hashed_bytes):
            return True
    except Exception:
        pass
    
    # Fallback to direct verification (for legacy passwords)
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_bytes)
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    prehashed = _get_prehashed_password(password)
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(prehashed, salt)
    return hashed.decode("utf-8")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
