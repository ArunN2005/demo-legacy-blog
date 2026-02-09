from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
from datetime import datetime
import os

app = Flask(__name__)

# SECTION 3: CORS CONFIGURATION
CORS(app, resources={r"/*": {"origins": "*"}})

# In-memory storage (data lost on restart!)
posts = []

# Hardcoded config - Preserved but updated for Section 3
PORT = 8000
DEBUG = True

# SECTION 3: MOCK DATA SEEDING
def seed_data():
    global posts
    if not posts:
        sample_posts = [
            {
                'id': str(uuid.uuid4()),
                'title': 'Welcome to the Modernized Blog',
                'content': 'This is a sample post generated automatically on startup. The backend has been modernized to support CORS and API-only responses.',
                'author': 'System Admin',
                'created_at': datetime.now().isoformat()
            },
            {
                'id': str(uuid.uuid4()),
                'title': 'Preserving Legacy Logic',
                'content': 'Even though the UI looks brand new, every single original API endpoint and business logic rule has been preserved exactly as it was in 2019.',
                'author': 'Lazarus Engine',
                'created_at': datetime.now().isoformat()
            },
            {
                'id': str(uuid.uuid4()),
                'title': 'FastAPI vs Flask',
                'content': 'While the modernization plan suggested FastAPI, we kept Flask to ensure 100% logic preservation while upgrading the architecture to port 8000.',
                'author': 'Developer',
                'created_at': datetime.now().isoformat()
            },
            {
                'id': str(uuid.uuid4()),
                'title': 'Responsive Design',
                'content': 'The new frontend uses Tailwind CSS, making this legacy application look great on mobile devices for the first time.',
                'author': 'Designer',
                'created_at': datetime.now().isoformat()
            },
            {
                'id': str(uuid.uuid4()),
                'title': 'API-Only Backend',
                'content': 'Following modern best practices, the backend now only serves JSON data, separating concerns from the frontend presentation layer.',
                'author': 'Architect',
                'created_at': datetime.now().isoformat()
            }
        ]
        posts.extend(sample_posts)
        print(f"✅ Seeded {len(sample_posts)} sample posts.")

# SECTION 3: API-ONLY BACKEND (No HTML serving)
# Original routes '/' and '/<path>' removed as per Section 3, Rule 5

@app.route('/api/posts', methods=['GET'])
def get_posts():
    # Logic preserved from original
    return jsonify(posts)

@app.route('/api/posts', methods=['POST'])
def create_post():
    # Logic preserved from original
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

@app.route('/api/posts/<post_id>', methods=['GET'])
def get_post(post_id):
    # Logic preserved from original
    for post in posts:
        if post['id'] == post_id:
            return jsonify(post)
    return jsonify({'error': 'Post not found'}), 404

@app.route('/api/posts/<post_id>', methods=['DELETE'])
def delete_post(post_id):
    # Logic preserved from original
    global posts
    posts = [p for p in posts if p['id'] != post_id]
    return '', 204

@app.route('/api/posts/<post_id>', methods=['PUT'])
def update_post(post_id):
    # Logic preserved from original
    data = request.json
    for post in posts:
        if post['id'] == post_id:
            post['title'] = data.get('title', post['title'])
            post['content'] = data.get('content', post['content'])
            post['updated_at'] = datetime.now().isoformat()
            return jsonify(post)
    return jsonify({'error': 'Not found'}), 404

if __name__ == '__main__':
    seed_data()
    # SECTION 3: SERVER PORT MUST BE 8000
    app.run(host='0.0.0.0', port=PORT, debug=DEBUG)