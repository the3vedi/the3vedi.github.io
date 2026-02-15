// Get slug from URL
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug');

// Initialize marked with options
marked.setOptions({
    breaks: true,
    gfm: true
});

document.addEventListener('DOMContentLoaded', async () => {
    if (!slug) {
        showError();
        return;
    }
    
    await loadPost(slug);
});

async function loadPost(slug) {
    try {
        // Load posts.json to get post metadata
        const postsResponse = await fetch('posts/posts.json');
        const posts = await postsResponse.json();
        const post = posts.find(p => p.slug === slug);
        
        if (!post) {
            showError();
            return;
        }
        
        // Load markdown content
        const markdownResponse = await fetch(`posts/${post.file}`);
        const markdownText = await markdownResponse.text();
        
        // Render post
        renderPost(post, markdownText);
        
    } catch (error) {
        console.error('Error loading post:', error);
        showError();
    }
}

function renderPost(post, markdownText) {
    // Update document title
    document.title = `${post.title} - The3vedi`;
    document.getElementById('postTitle').textContent = `${post.title} - The3vedi`;
    
    // Update post header
    document.getElementById('postDate').textContent = formatDate(post.date);
    document.getElementById('postTitleHeader').textContent = post.title;
    
    // Render tags
    const tagsContainer = document.getElementById('postTags');
    tagsContainer.innerHTML = post.tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join('');
    
    // Convert markdown to HTML
    const htmlContent = marked.parse(markdownText);
    document.getElementById('postBody').innerHTML = htmlContent;
    
    // Hide loading, show content
    document.getElementById('loading').style.display = 'none';
    document.getElementById('postContent').style.display = 'block';
}

function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
