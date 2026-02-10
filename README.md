# 🚀 Modernized Legacy Blog Platform

![Version](https://img.shields.io/badge/version-6.0-blue.svg)
![Status](https://img.shields.io/badge/status-resurrected-success.svg)

A simple blog platform originally built in 2019, now enhanced with the **Lazarus Engine v6.0**. This version preserves all original business logic while introducing a modern, high-performance UI and robust API structure.

## ✨ Enhancements
- **UI/UX**: Modern Glassmorphism design with a Yellow/Blue high-contrast theme.
- **Frontend**: Migrated to modern asynchronous JavaScript with improved error handling.
- **Backend**: Ported to Port 8000, added CORS support, and implemented automatic data seeding.
- **Responsiveness**: Fully fluid layout using modern CSS variables and Flexbox/Grid.

## 🛠️ Tech Stack
- **Backend**: Flask (Python)
- **Frontend**: Vanilla JS (ES6+), Modern CSS3
- **Database**: In-memory (Preserved from original)

## 🚀 Quick Start

### 1. Backend Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```
The API will be available at `http://localhost:8000`

### 2. Frontend Setup
Simply open `index.html` in your browser or serve it via a local web server.

## 📡 API Endpoints
- `GET /api/posts` - Retrieve all blog entries
- `POST /api/posts` - Create a new entry
- `GET /api/posts/<id>` - Retrieve a specific entry
- `PUT /api/posts/<id>` - Update an entry
- `DELETE /api/posts/<id>` - Remove an entry

---
*Resurrected by Lazarus Engine - Absolute Preservation Mode*