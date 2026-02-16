// Load and display posts
document.addEventListener('DOMContentLoaded', async () => {
    await loadPosts();
});

async function loadPosts() {
    try {
        const response = await fetch('posts/posts.json');
        const posts = await response.json();
        
        // Sort by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Group by month-year
        const grouped = groupByMonth(posts);
        
        // Render
        renderPosts(grouped);
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('postsList').innerHTML = 
            '<p style="color: #666;">Error loading posts.</p>';
    }
}

function groupByMonth(posts) {
    const groups = {};
    
    posts.forEach(post => {
        const date = new Date(post.date);
        const monthYear = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
        });
        
        if (!groups[monthYear]) {
            groups[monthYear] = [];
        }
        
        groups[monthYear].push(post);
    });
    
    return groups;
}

function renderPosts(grouped) {
    const postsList = document.getElementById('postsList');
    
    let html = '';
    
    Object.entries(grouped).forEach(([monthYear, posts]) => {
        html += `<div class="month-group">`;
        html += `<div class="month-header">${monthYear}</div>`;
        
        posts.forEach(post => {
            const day = new Date(post.date).getDate();
            html += `
                <div class="post-item">
                    <span class="post-date">${day.toString().padStart(2, '0')}</span>
                    <a href="post.html?slug=${post.slug}" class="post-link">${post.title}</a>
                </div>
            `;
        });
        
        html += `</div>`;
    });
    
    postsList.innerHTML = html;
}
