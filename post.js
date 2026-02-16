// Get slug from URL
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug');

// Initialize marked
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
        
        // Update title
        document.title = post.title;
        
        // Convert markdown to HTML
        const htmlContent = marked.parse(markdownText);
        
        // Render
        document.getElementById('loading').style.display = 'none';
        const postBody = document.getElementById('postBody');
        postBody.innerHTML = htmlContent;
        postBody.style.display = 'block';
        
    } catch (error) {
        console.error('Error loading post:', error);
        showError();
    }
}

function showError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
}
