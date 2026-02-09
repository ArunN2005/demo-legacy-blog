# Legacy Blog Platform

A simple blog platform built in 2019. Needs modernization.

## Issues
- No authentication system
- No database (uses in-memory storage)
- Old Flask version
- No API documentation
- Plain CSS (no framework)
- No error handling
- No input validation
- Hardcoded configuration

## Setup
```bash
pip install -r requirements.txt
python app.py
```

Open `http://localhost:5000`

## API Endpoints
- GET `/api/posts` - Get all posts
- POST `/api/posts` - Create post
- GET `/api/posts/<id>` - Get single post
- DELETE `/api/posts/<id>` - Delete post
