# Minimal Modern Blog

A clean, elegant markdown-based blog system with full-featured search, tags, and pagination.

## Features

✨ **Full-Featured**
- Search across all posts
- Tag-based filtering
- Pagination
- Responsive design

🎨 **Clean & Modern**
- Generous white space
- Beautiful typography (Crimson Pro + DM Sans)
- Smooth animations
- Mobile-friendly

📝 **Markdown-Based**
- Write posts in markdown
- Automatic conversion to HTML
- Syntax highlighting for code
- Easy to maintain

## Setup

1. **Copy all files to your GitHub Pages repository**
   ```
   your-repo/
   ├── blog.html
   ├── blog.css
   ├── blog.js
   ├── post.html
   ├── post.css
   ├── post.js
   └── posts/
       ├── posts.json
       └── *.md (your markdown files)
   ```

2. **Update navigation** in `blog.html` and `post.html`
   - Change the logo text from "The3vedi" to your preferred name
   - Update the `index.html` link to match your home page

3. **Customize styling** in `blog.css`
   - Update CSS variables in `:root` to match your brand colors
   - Modify fonts if desired

## Adding New Posts

### Step 1: Write your markdown file

Create a new `.md` file in the `posts/` directory:

```markdown
# Your Post Title

Your content here with **markdown** formatting.

## Subheadings work too

- Bullet points
- Code blocks
- Images
- Everything markdown supports!
```

### Step 2: Add to posts.json

Add an entry to `posts/posts.json`:

```json
{
  "slug": "your-post-slug",
  "title": "Your Post Title",
  "date": "2024-02-16",
  "excerpt": "A brief description of your post (1-2 sentences).",
  "tags": ["tag1", "tag2", "tag3"],
  "file": "your-markdown-file.md"
}
```

**Fields explained:**
- `slug`: URL-friendly identifier (lowercase, hyphens)
- `title`: Post title (displayed in list and on post page)
- `date`: Publication date (YYYY-MM-DD format)
- `excerpt`: Short summary shown in the post list
- `tags`: Array of tags for filtering
- `file`: Your markdown filename (must be in `posts/` directory)

### Step 3: Commit and push

```bash
git add posts/your-markdown-file.md posts/posts.json
git commit -m "Add new blog post"
git push
```

Your post will be live at: `your-site.github.io/post.html?slug=your-post-slug`

## Configuration

### Posts per page

Edit `POSTS_PER_PAGE` in `blog.js`:

```javascript
const POSTS_PER_PAGE = 6; // Change to any number
```

### Colors

Update CSS variables in `blog.css`:

```css
:root {
    --primary: #2c3e50;      /* Main text color */
    --accent: #e74c3c;       /* Accent color (links, buttons) */
    --background: #ffffff;   /* Page background */
    --surface: #f8f9fa;      /* Card backgrounds */
    /* ... more colors ... */
}
```

### Fonts

The blog uses:
- **Crimson Pro** for headings (serif)
- **DM Sans** for body text (sans-serif)

To change fonts, update the Google Fonts link in the HTML files and the CSS variables:

```css
:root {
    --font-display: 'Your Display Font', serif;
    --font-body: 'Your Body Font', sans-serif;
}
```

## Markdown Features

Your posts support:

- **Bold** and *italic* text
- [Links](https://example.com)
- `Inline code`
- Code blocks with syntax highlighting
- > Blockquotes
- Lists (ordered and unordered)
- Images: `![alt text](image-url.jpg)`
- Tables
- Headers (H1-H6)
- Horizontal rules

## File Structure

```
blog/
├── blog.html           # Main blog index page
├── blog.css            # Styles for blog index
├── blog.js             # Blog functionality (search, filter, pagination)
├── post.html           # Individual post template
├── post.css            # Styles for individual posts
├── post.js             # Post loading logic
└── posts/
    ├── posts.json      # Index of all posts (metadata)
    └── *.md            # Your markdown posts
```

## Tips

1. **Write clear excerpts**: They appear in the blog list and help readers decide what to read
2. **Use descriptive slugs**: They become part of the URL
3. **Choose relevant tags**: They help readers filter content
4. **Keep posts.json sorted**: Newest posts first for better performance
5. **Test locally**: Open `blog.html` in a browser before pushing

## Troubleshooting

**Posts not showing up?**
- Check that your markdown file is in the `posts/` directory
- Verify the filename matches exactly in `posts.json`
- Make sure `posts.json` is valid JSON (use a validator)

**Styling looks wrong?**
- Ensure `blog.css` and `post.css` are in the same directory as the HTML files
- Check browser console for 404 errors

**Search not working?**
- Make sure `blog.js` is loading (check browser console)
- Verify marked.js CDN is accessible

## License

Feel free to use and modify for your own blog!

---

**Happy blogging!** 🚀
