/**
 * LAZARUS ENGINE ENHANCED - app.js
 * All original functionality preserved.
 * Modernized with async/await and improved error handling.
 */

// CRITICAL: window.__API_BASE_URL__ is injected at deploy time
const API_BASE_URL = window.__API_BASE_URL__ || '';

// Load posts on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    
    // Form submission
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await createPost();
        });
    }
});

/**
 * Fetches all posts from the API
 * Preserves original loadPosts functionality
 */
async function loadPosts() {
    const postsList = document.getElementById('postsList');
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error loading posts:', error);
        if (postsList) {
            postsList.innerHTML = `
                <div class="error-state">
                    <p>❌ Failed to load posts. Please check if the backend is running.</p>
                    <small>${error.message}</small>
                </div>
            `;
        }
    }
}

/**
 * Creates a new post
 * Preserves original createPost logic and validation-less structure
 */
async function createPost() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const contentInput = document.getElementById('content');
    const postForm = document.getElementById('postForm');

    const post = {
        title: titleInput.value,
        author: authorInput.value || 'Anonymous',
        content: contentInput.value
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        if (!response.ok) throw new Error('Failed to create post');

        const newPost = await response.json();
        
        // Clear form
        postForm.reset();
        
        // Reload all posts (Preserved original behavior)
        await loadPosts();
        
        // Visual feedback
        console.log('Post created successfully:', newPost.id);
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to publish post. See console for details.');
    }
}

/**
 * Renders posts to the DOM
 * Preserves original displayPosts structure with enhanced styling
 */
function displayPosts(posts) {
    const postsList = document.getElementById('postsList');
    if (!postsList) return;
    
    if (!posts || posts.length === 0) {
        postsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <p>No posts yet. Be the first to share your thoughts!</p>
            </div>
        `;
        return;
    }
    
    // Manual DOM manipulation - Preserved original map logic
    postsList.innerHTML = posts.map(post => `
        <div class="post-card" data-id="${post.id}">
            <div class="post-header">
                <h3>${escapeHtml(post.title)}</h3>
                <span class="post-date">${formatDate(post.created_at)}</span>
            </div>
            <div class="post-meta">
                By <span class="author-name">${escapeHtml(post.author)}</span>
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
 * Deletes a post by ID
 * Preserves original deletePost functionality
 */
async function deletePost(id) {
    // Added a modern confirmation (Enhancement)
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Delete failed');
        
        await loadPosts();
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Could not delete post.');
    }
}

/**
 * Placeholder for edit functionality
 * Preserves original alert behavior
 */
function editPost(id) {
    alert('Edit functionality not implemented yet!');
}

/**
 * Basic XSS prevention
 * Preserved from original
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Formats ISO date string
 * Preserved from original
 */
function formatDate(dateString) {
    if (!dateString) return 'Unknown Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}