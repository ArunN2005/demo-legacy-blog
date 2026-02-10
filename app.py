from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
from datetime import datetime
import os

app = Flask(__name__)

# CRITICAL: Enable CORS for all origins
CORS(app, resources={r"/*": {"origins": "*"}})

# In-memory storage (Preserved from original)
posts = []

# CONFIGURATION
PORT = 8000  # CRITICAL: Port must be 8000
DEBUG = True

def seed_data():
    """
    MOCK DATA SEEDING: Auto-populate database with sample data on startup
    """
    if not posts:
        sample_posts = [
            {
                'id': str(uuid.uuid4()),
                'title': 'Welcome to the Modernized Blog',
                'content': 'This is a resurrected post from the Lazarus Engine. All logic is preserved, but the look is brand new!',
                'author': 'System Admin',
                'created_at': datetime.now().isoformat()
            },
            {
                'id': str(uuid.uuid4()),
                'title': 'The Power of Glassmorphism',
                'content': 'Notice the beautiful transparency and blur effects in the UI. This is the yellow and blue theme in action.',
                'author': 'Design Bot',
                'created_at': datetime.now().isoformat()
            },
            {
                'id': str(uuid.uuid4()),
                'title': 'Legacy Logic, Modern Speed',
                'content': 'The backend still uses the original in-memory list, but it now runs on port 8000 with full CORS support.',
                'author': 'Lazarus Engine',
                'created_at': datetime.now().isoformat()
            }
        ]
        posts.extend(sample_posts)
        print(f"✅ Seeded {len(sample_posts)} sample posts.")

# --- API ENDPOINTS (ALL ORIGINAL ENDPOINTS PRESERVED) ---

@app.route('/api/posts', methods=['GET'])
def get_posts():
    """Returns all posts as JSON"""
    try:
        return jsonify(posts)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/posts', methods=['POST'])
def create_post():
    """Creates a new post. Preserves original lack of validation."""
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        post = {
            'id': str(uuid.uuid4()),
            'title': data.get('title'),
            'content': data.get('content'),
            'author': data.get('author', 'Anonymous'),
            'created_at': datetime.now().isoformat()
        }
        
        posts.append(post)
        return jsonify(post), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/posts/<post_id>', methods=['GET'])
def get_post(post_id):
    """Returns a single post by ID"""
    for post in posts:
        if post['id'] == post_id:
            return jsonify(post)
    return jsonify({'error': 'Post not found'}), 404

@app.route('/api/posts/<post_id>', methods=['DELETE'])
def delete_post(post_id):
    """Deletes a post by ID"""
    global posts
    initial_count = len(posts)
    posts = [p for p in posts if p['id'] != post_id]
    
    if len(posts) < initial_count:
        return '', 204
    return jsonify({'error': 'Post not found'}), 404

@app.route('/api/posts/<post_id>', methods=['PUT'])
def update_post(post_id):
    """Updates an existing post"""
    data = request.json
    for post in posts:
        if post['id'] == post_id:
            post['title'] = data.get('title', post['title'])
            post['content'] = data.get('content', post['content'])
            post['updated_at'] = datetime.now().isoformat()
            return jsonify(post)
    return jsonify({'error': 'Not found'}), 404

if __name__ == '__main__':
    # Seed data before starting
    seed_data()
    
    # CRITICAL: Port must be 8000, API-only (no static serving)
    print(f"🚀 Lazarus Engine Backend starting on port {PORT}...")
    app.run(host='0.0.0.0', port=PORT, debug=DEBUG)