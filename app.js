/**
 * MODERNIZED BLOG FRONTEND
 * Logic preserved from original app.js
 * Enhanced with async/await and modern error handling
 */

// CRITICAL: window.__API_BASE_URL__ is injected at deploy time
const API_BASE_URL = window.__API_BASE_URL__ || 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Lazarus Engine: Initializing Blog Interface...');
    loadPosts();
    
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
 * Preserves original logic: loadPosts()
 */
async function loadPosts() {
    const postsList = document.getElementById('postsList');
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts`);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error loading posts:', error);
        postsList.innerHTML = `
            <div class="p-8 text-center bg-red-50 border border-red-200 rounded-xl text-red-600">
                <p class="font-bold">⚠️ Connection Error</p>
                <p class="text-sm">Could not connect to the API at ${API_BASE_URL}</p>
            </div>
        `;
    }
}

/**
 * Creates a new post
 * Preserves original logic: createPost()
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
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="animate-pulse">Publishing...</span>';

        const response = await fetch(`${API_BASE_URL}/api/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        });

        if (!response.ok) throw new Error('Failed to create post');

        // Reset form and reload
        document.getElementById('postForm').reset();
        await loadPosts();
        
        // Visual feedback
        console.log('✅ Post created successfully');
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post. Please check the console for details.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Publish Post';
    }
}

/**
 * Renders posts to the DOM
 * Preserves original logic: displayPosts(posts)
 */
function displayPosts(posts) {
    const postsList = document.getElementById('postsList');
    
    if (!posts || posts.length === 0) {
        postsList.innerHTML = `
            <div class="empty-state flex flex-col items-center justify-center p-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
                <svg class="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
                <p class="text-lg font-medium">No posts yet. Create one above!</p>
            </div>
        `;
        return;
    }

    postsList.innerHTML = posts.map(post => `
        <div class="post-card group bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm hover:shadow-md transition-all duration-300" data-id="${post.id}">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">${escapeHtml(post.title)}</h3>
                <span class="text-xs font-mono bg-gray-50 text-gray-400 px-2 py-1 rounded">ID: ${post.id.substring(0,8)}</span>
            </div>
            <div class="post-meta flex items-center text-sm text-gray-500 mb-4">
                <div class="flex items-center mr-4">
                    <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-[10px] font-bold">
                        ${post.author.charAt(0).toUpperCase()}
                    </div>
                    <span>By <span class="font-semibold text-gray-700">${escapeHtml(post.author)}</span></span>
                </div>
                <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    ${formatDate(post.created_at)}
                </div>
            </div>
            <div class="post-content text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap">${escapeHtml(post.content)}</div>
            <div class="post-actions flex gap-3 pt-4 border-t border-gray-50">
                <button class="btn-edit flex items-center px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors text-sm font-medium" onclick="editPost('${post.id}')">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    Edit
                </button>
                <button class="btn-delete flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium" onclick="deletePost('${post.id}')">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Deletes a post
 * Preserves original logic: deletePost(id)
 */
async function deletePost(id) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete post');
        await loadPosts();
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post.');
    }
}

/**
 * Edit post placeholder
 * Preserves original logic: editPost(id)
 */
function editPost(id) {
    alert('Edit functionality not implemented yet! (Preserving original behavior)');
}

/**
 * Basic XSS prevention
 * Preserves original logic: escapeHtml(text)
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Date formatting
 * Preserves original logic: formatDate(dateString)
 */
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