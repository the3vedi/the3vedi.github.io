// Blog configuration
const POSTS_PER_PAGE = 6;
let allPosts = [];
let filteredPosts = [];
let currentPage = 1;
let currentTag = 'all';
let searchQuery = '';

// Initialize blog
document.addEventListener('DOMContentLoaded', async () => {
    await loadPosts();
    setupEventListeners();
});

// Load posts from posts.json
async function loadPosts() {
    try {
        const response = await fetch('posts/posts.json');
        allPosts = await response.json();
        
        // Sort posts by date (newest first)
        allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Extract all unique tags
        const allTags = new Set();
        allPosts.forEach(post => {
            post.tags.forEach(tag => allTags.add(tag));
        });
        
        // Create tag filters
        createTagFilters(Array.from(allTags).sort());
        
        // Initial render
        filterAndRender();
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('postsGrid').innerHTML = 
            '<p style="text-align: center; color: var(--text-light);">Error loading posts. Please check posts/posts.json exists.</p>';
    }
}

// Create tag filter buttons
function createTagFilters(tags) {
    const filterTags = document.getElementById('filterTags');
    
    tags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'tag-filter';
        button.dataset.tag = tag;
        button.textContent = tag;
        filterTags.appendChild(button);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        currentPage = 1;
        filterAndRender();
    });
    
    // Tag filters
    document.getElementById('filterTags').addEventListener('click', (e) => {
        if (e.target.classList.contains('tag-filter')) {
            document.querySelectorAll('.tag-filter').forEach(btn => 
                btn.classList.remove('active')
            );
            e.target.classList.add('active');
            currentTag = e.target.dataset.tag;
            currentPage = 1;
            filterAndRender();
        }
    });
}

// Filter posts based on search and tags
function filterAndRender() {
    filteredPosts = allPosts.filter(post => {
        // Filter by tag
        const tagMatch = currentTag === 'all' || post.tags.includes(currentTag);
        
        // Filter by search query
        const searchMatch = !searchQuery || 
            post.title.toLowerCase().includes(searchQuery) ||
            post.excerpt.toLowerCase().includes(searchQuery) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery));
        
        return tagMatch && searchMatch;
    });
    
    renderPosts();
    renderPagination();
    
    // Show/hide no results message
    const noResults = document.getElementById('noResults');
    noResults.style.display = filteredPosts.length === 0 ? 'block' : 'none';
}

// Render posts for current page
function renderPosts() {
    const postsGrid = document.getElementById('postsGrid');
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);
    
    postsGrid.innerHTML = postsToShow.map((post, index) => `
        <article class="post-card" onclick="window.location.href='post.html?slug=${post.slug}'" style="animation-delay: ${index * 0.1}s">
            <time class="post-date">${formatDate(post.date)}</time>
            <h2>${post.title}</h2>
            <p class="post-excerpt">${post.excerpt}</p>
            <div class="post-meta">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="post.html?slug=${post.slug}" class="read-more">Read more</a>
        </article>
    `).join('');
}

// Render pagination
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = `
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            Previous
        </button>
    `;
    
    // Show page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || 
            i === totalPages || 
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            paginationHTML += `
                <button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += '<span style="padding: 0.75rem;">...</span>';
        }
    }
    
    paginationHTML += `
        <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            Next
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    currentPage = page;
    filterAndRender();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
