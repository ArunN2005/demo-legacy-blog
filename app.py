from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime
import uvicorn

app = FastAPI(title="Legacy Blog API", description="Modernized Backend for Legacy Blog Platform")

# CORS Configuration - Allow all origins for development/E2B
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (Preserved from original)
posts = []

# Data Models
class PostBase(BaseModel):
    title: str
    content: str
    author: Optional[str] = "Anonymous"

class Post(PostBase):
    id: str
    created_at: str
    updated_at: Optional[str] = None

# Mock Data Seeding (Requirement 8)
def seed_data():
    global posts
    if not posts:
        sample_posts = [
            {
                "id": str(uuid.uuid4()),
                "title": "Welcome to the Resurrected Blog",
                "content": "This platform has been modernized from a 2019 Flask app to a high-performance FastAPI service.",
                "author": "System Architect",
                "created_at": datetime.now().isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "The Power of Preservation",
                "content": "Maintaining original business logic while upgrading the UI is the core of the Lazarus Engine.",
                "author": "Lazarus AI",
                "created_at": datetime.now().isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "FastAPI vs Flask",
                "content": "FastAPI provides automatic documentation and better performance through asynchronous handling.",
                "author": "DevOps Lead",
                "created_at": datetime.now().isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Modern CSS in 2024",
                "content": "Glassmorphism and CSS variables make legacy applications feel brand new.",
                "author": "UI Designer",
                "created_at": datetime.now().isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Data Persistence Note",
                "content": "Note: This demo still uses in-memory storage. Data will reset on server restart.",
                "author": "Admin",
                "created_at": datetime.now().isoformat()
            }
        ]
        posts.extend(sample_posts)

# Root Health Endpoint (Requirement 6)
@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "Legacy Blog API is running",
        "version": "2.0.0",
        "endpoints": {
            "list_posts": "/api/posts",
            "create_post": "/api/posts (POST)",
            "docs": "/docs"
        }
    }

# API Endpoints (Preserving all original logic)

@app.get("/api/posts", response_model=List[dict])
async def get_posts():
    """Get all posts - Preserved logic"""
    return posts

@app.post("/api/posts", status_code=201)
async def create_post(post_data: PostBase):
    """Create post - Preserved logic with added validation"""
    new_post = {
        "id": str(uuid.uuid4()),
        "title": post_data.title,
        "content": post_data.content,
        "author": post_data.author or "Anonymous",
        "created_at": datetime.now().isoformat()
    }
    posts.append(new_post)
    return new_post

@app.get("/api/posts/{post_id}")
async def get_post(post_id: str):
    """Get single post - Preserved logic with error handling"""
    for post in posts:
        if post['id'] == post_id:
            return post
    raise HTTPException(status_code=404, detail="Post not found")

@app.delete("/api/posts/{post_id}", status_code=204)
async def delete_post(post_id: str):
    """Delete post - Preserved logic"""
    global posts
    initial_len = len(posts)
    posts = [p for p in posts if p['id'] != post_id]
    if len(posts) == initial_len:
        # Original didn't error, but we'll keep it silent as per 204 behavior
        pass
    return None

@app.put("/api/posts/{post_id}")
async def update_post(post_id: str, post_data: PostBase):
    """Update post - Preserved logic"""
    for post in posts:
        if post['id'] == post_id:
            post['title'] = post_data.title or post['title']
            post['content'] = post_data.content or post['content']
            post['updated_at'] = datetime.now().isoformat()
            return post
    raise HTTPException(status_code=404, detail="Post not found")

if __name__ == '__main__':
    # Seed data before starting
    seed_data()
    # Run on port 8000 as required
    uvicorn.run(app, host='0.0.0.0', port=8000)