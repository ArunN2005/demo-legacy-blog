// Legacy JavaScript - no modern framework
// No error handling, no TypeScript
// Lots of repetition and hardcoded values

// Hardcoded API URL - bad practice!
const API_URL = 'http://localhost:5000/api';

// Load posts on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
    
    // Form submission
    document.getElementById('postForm').addEventListener('submit', function(e) {
        e.preventDefault();
        createPost();
    });
});

// No async/await - using old .then() syntax
function loadPosts() {
    fetch(`${API_URL}/posts`)
        .then(response => response.json())
        .then(posts => {
            displayPosts(posts);
        })
        .catch(error => {
            console.error('Error:', error);
            // No user-facing error message!
        });
}

function createPost() {
    // No validation!
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;
    
    const post = {
        title: title,
        author: author || 'Anonymous',
        content: content
    };
    
    fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(newPost => {
        // Clear form
        document.getElementById('postForm').reset();
        // Reload all posts (inefficient!)
        loadPosts();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayPosts(posts) {
    const postsList = document.getElementById('postsList');
    
    if (posts.length === 0) {
        postsList.innerHTML = `
            <div class="empty-state">
                <p>📭 No posts yet. Create one above!</p>
            </div>
        `;
        return;
    }
    
    // Manual DOM manipulation - no virtual DOM
    postsList.innerHTML = posts.map(post => `
        <div class="post-card" data-id="${post.id}">
            <h3>${escapeHtml(post.title)}</h3>
            <div class="post-meta">
                By ${escapeHtml(post.author)} • ${formatDate(post.created_at)}
            </div>
            <div class="post-content">
                ${escapeHtml(post.content)}
            </div>
            <div class="post-actions">
                <button class="btn-edit" onclick="editPost('${post.id}')">Edit</button>
                <button class="btn-delete" onclick="deletePost('${post.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function deletePost(id) {
    // No confirmation dialog!
    fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        loadPosts();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function editPost(id) {
    // TODO: Implement edit functionality
    alert('Edit functionality not implemented yet!');
}

// Basic XSS prevention
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
