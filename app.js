/**
 * MODERNIZED BLOG FRONTEND
 * Preserves all original functionality with enhanced error handling and dynamic routing.
 */

// Auto-detect backend URL (works for both local AND E2B deployment)
function getBackendURL() {
    const currentURL = window.location.href;
    // Check if running in E2B sandbox (URL pattern: https://3000-SANDBOX_ID.e2b.app)
    if (currentURL.includes('.e2b.app')) {
        const sandboxID = currentURL.match(/https:\/\/\d+-([a-z0-9]+)\.e2b\.app/)?.[1];
        return sandboxID ? `https://8000-${sandboxID}.e2b.app` : 'http://127.0.0.1:8000';
    }
    return 'http://127.0.0.1:8000';  // Local development
}

const BACKEND_URL = getBackendURL();
const API_URL = `${BACKEND_URL}/api`;

// Load posts on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log(`%c🚀 Connecting to Backend: ${BACKEND_URL}`, "color: #00ff00; font-weight: bold;");
    loadPosts();
    
    // Form submission
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            createPost();
        });
    }
});

/**
 * Fetch all posts from the API
 * Optimized with async/await and error handling
 */
async function loadPosts() {
    const postsList = document.getElementById('postsList');
    
    try {
        const response = await fetch(`${API_URL}/posts`);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error loading posts:', error);
        if (postsList) {
            postsList.innerHTML = `
                <div class="error-state">
                    <p>❌ Failed to load posts. Is the backend running at ${BACKEND_URL}?</p>
                </div>
            `;
        }
    }
}

/**
 * Create a new post
 * Preserves original logic: title, author (default 'Anonymous'), and content
 */
async function createPost() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const contentInput = document.getElementById('content');
    const submitBtn = document.querySelector('#postForm button');

    const post = {
        title: titleInput.value,
        author: authorInput.value || 'Anonymous',
        content: contentInput.value
    };
    
    try {
        // Visual feedback
        submitBtn.disabled = true;
        submitBtn.textContent = 'Publishing...';

        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        if (!response.ok) throw new Error('Failed to create post');

        // Clear form
        document.getElementById('postForm').reset();
        
        // Reload all posts
        await loadPosts();
        
        // Success notification (optional enhancement)
        console.log('Post created successfully');
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Publish Post';
    }
}

/**
 * Render posts to the DOM
 * Preserves original structure with enhanced styling classes
 */
function displayPosts(posts) {
    const postsList = document.getElementById('postsList');
    if (!postsList) return;
    
    if (!posts || posts.length === 0) {
        postsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <p>No posts yet. Be the first to share something!</p>
            </div>
        `;
        return;
    }
    
    postsList.innerHTML = posts.map(post => `
        <div class="post-card" data-id="${post.id}">
            <div class="post-header">
                <h3>${escapeHtml(post.title)}</h3>
                <span class="post-date">${formatDate(post.created_at)}</span>
            </div>
            <div class="post-meta">
                <span class="author-badge">👤 ${escapeHtml(post.author)}</span>
            </div>
            <div class="post-content">
                ${escapeHtml(post.content)}
            </div>
            <div class="post-actions">
                <button class="btn-edit" onclick="editPost('${post.id}')">
                    <span class="icon">✏️</span> Edit
                </button>
                <button class="btn-delete" onclick="deletePost('${post.id}')">
                    <span class="icon">🗑️</span> Delete
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Delete a post
 * Preserves original logic
 */
async function deletePost(id) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Delete failed');
        
        await loadPosts();
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post.');
    }
}

/**
 * Edit a post
 * Preserves original "Not implemented" alert as per legacy code
 */
function editPost(id) {
    alert('Edit functionality not implemented yet! This is a legacy placeholder.');
}

/**
 * Basic XSS prevention
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}