# 🚀 Modernized Legacy Blog Platform

This repository contains a professionally enhanced version of the 2019 Legacy Blog Platform. While the core business logic and API structure remain identical to the original for 100% compatibility, the user interface and developer experience have been brought up to modern standards.

## ✨ Enhancements
- **Modern UI/UX**: Completely redesigned with Tailwind CSS and modern design principles.
- **Responsive Design**: Fully functional on mobile, tablet, and desktop.
- **Improved Codebase**: Refactored JavaScript using `async/await` and modern ES6+ syntax.
- **API Standards**: Backend updated to support CORS and standardized JSON responses.
- **Container Ready**: Optimized for modern deployment workflows.
- **Data Seeding**: Automatic database initialization with sample content.

## 🛠 Tech Stack
- **Backend**: Flask (Python 3.x)
- **Frontend**: Vanilla JS (ES6+), Tailwind CSS, Google Fonts (Inter)
- **API**: RESTful JSON

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Server**:
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:8000`

3. **Open Frontend**:
   Simply open `index.html` in your browser or use a Live Server.

## 📡 API Endpoints (Preserved)
- `GET /api/posts` - Retrieve all blog posts
- `POST /api/posts` - Create a new blog post
- `GET /api/posts/<id>` - Retrieve a specific post
- `PUT /api/posts/<id>` - Update an existing post
- `DELETE /api/posts/<id>` - Remove a post