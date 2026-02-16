// Run: node generate-posts.js
// This creates a folder for each post with an index.html inside

const fs = require('fs');
const path = require('path');

const posts = JSON.parse(fs.readFileSync('posts/posts.json', 'utf8'));

const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="postTitle">Post</title>
    <link rel="stylesheet" href="../post.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="back-button">
        <a href="../blog.html">← back</a>
    </div>
    
    <main>
        <article id="postContent">
            <div id="loading">Loading...</div>
            <div id="error" style="display: none;">Error loading post.</div>
            <div id="postBody" style="display: none;"></div>
        </article>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
        const SLUG = 'SLUG_PLACEHOLDER';
        
        marked.setOptions({
            breaks: true,
            gfm: true
        });

        document.addEventListener('DOMContentLoaded', async () => {
            await loadPost(SLUG);
        });

        async function loadPost(slug) {
            try {
                const postsResponse = await fetch('../posts/posts.json');
                const posts = await postsResponse.json();
                const post = posts.find(p => p.slug === slug);
                
                if (!post) {
                    showError();
                    return;
                }
                
                const markdownResponse = await fetch(\`../posts/\${post.file}\`);
                const markdownText = await markdownResponse.text();
                
                document.title = post.title;
                
                const htmlContent = marked.parse(markdownText);
                
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
    </script>
</body>
</html>`;

console.log('Generating post folders...\n');

posts.forEach(post => {
    const folderPath = post.slug;
    
    // Create folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
    
    // Generate index.html with the slug embedded
    const html = template.replace('SLUG_PLACEHOLDER', post.slug);
    fs.writeFileSync(path.join(folderPath, 'index.html'), html);
    
    console.log(`✓ Created: ${folderPath}/index.html`);
});

console.log('\nDone! All post folders created.');
console.log('\nYour posts are now accessible at:');
posts.forEach(post => {
    console.log(`  the3vedi.github.io/${post.slug}`);
});
