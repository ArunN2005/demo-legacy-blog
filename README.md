# 🚀 Modernized Legacy Blog Platform

A fully resurrected and modernized version of the 2019 Legacy Blog Platform. This version maintains 100% of the original business logic while upgrading the tech stack to FastAPI, modern JavaScript (ES6+), and a high-end responsive UI.

## ✨ Enhancements
- **Backend**: Migrated from Flask to **FastAPI** for high performance and automatic documentation.
- **Frontend**: Refactored to modern JavaScript with `async/await` and dynamic backend detection.
- **Styling**: Complete UI overhaul using modern CSS variables, glassmorphism, and responsive design.
- **API**: Standardized JSON responses with CORS enabled for cross-origin compatibility.
- **Persistence**: Initialized with seed data for immediate testing.

## 🛠️ Tech Stack
- **Backend**: Python 3.9+, FastAPI, Uvicorn
- **Frontend**: Vanilla JS (ES6+), Modern CSS3, HTML5
- **Deployment**: Optimized for E2B sandboxes and local development

## 🚀 Quick Start

### Local Development
1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Server**:
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:8000`.

3. **View the App**:
   Open `index.html` directly in your browser or use a Live Server extension.

## 📡 API Endpoints
- `GET /` - API Health Check & Metadata
- `GET /api/posts` - Retrieve all blog posts
- `POST /api/posts` - Create a new blog post
- `GET /api/posts/{id}` - Retrieve a specific post
- `PUT /api/posts/{id}` - Update an existing post
- `DELETE /api/posts/{id}` - Remove a post