from flask import Flask, request, jsonify, send_from_directory
import uuid
from datetime import datetime

app = Flask(__name__)

# In-memory storage (data lost on restart!)
posts = []

# Hardcoded config - bad practice!
PORT = 5000
DEBUG = True

# No CORS handling
# No authentication
# No input validation

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/api/posts', methods=['GET'])
def get_posts():
    # No error handling
    return jsonify(posts)

@app.route('/api/posts', methods=['POST'])
def create_post():
    # No validation!
    data = request.json
    
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
    # No error handling for missing posts
    for post in posts:
        if post['id'] == post_id:
            return jsonify(post)
    return {'error': 'Post not found'}, 404

@app.route('/api/posts/<post_id>', methods=['DELETE'])
def delete_post(post_id):
    # No authentication check!
    global posts
    posts = [p for p in posts if p['id'] != post_id]
    return '', 204

@app.route('/api/posts/<post_id>', methods=['PUT'])
def update_post(post_id):
    # No validation
    data = request.json
    for post in posts:
        if post['id'] == post_id:
            post['title'] = data.get('title', post['title'])
            post['content'] = data.get('content', post['content'])
            post['updated_at'] = datetime.now().isoformat()
            return jsonify(post)
    return {'error': 'Not found'}, 404

if __name__ == '__main__':
    # Insecure DEBUG mode
    app.run(host='0.0.0.0', port=PORT, debug=DEBUG)
