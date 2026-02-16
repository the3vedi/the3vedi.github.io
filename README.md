
# Minimal Dark Mode Blog

A brutally minimal, terminal-inspired blog with dark mode aesthetic and tech-focused typography.

## Design Philosophy

- **Pure Black Background** (#000000)
- **Monospace Font** (JetBrains Mono)
- **Minimal UI** - No fancy buttons, cards, or decorations
- **Content-First** - Maximum focus on writing
- **Terminal Aesthetic** - Green accent color (#00ff00)

## Features

✨ **Ultra-Minimal**
- Chronological post list grouped by month-year
- Click any post title to read
- Small "back" button to return to list
- No search, no tags, no pagination - just posts

🎨 **Dark Mode Terminal Style**
- Pure black background
- White text with dimmed dates
- Green accent color for links/hovers
- JetBrains Mono (famous tech font)

📝 **Markdown-Based**
- Write posts in markdown
- Automatic conversion to HTML
- Code syntax support
- Clean typography

## Setup

1. **Copy all files to your repo**
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

2. **That's it!** Visit `your-site.github.io/blog.html`

## Adding New Posts

### Step 1: Write your markdown file

Create a new `.md` file in the `posts/` directory:

```markdown
# Your Post Title

Your content here...
```

### Step 2: Add to posts.json

Add an entry to `posts/posts.json`:

```json
{
  "slug": "your-post-slug",
  "title": "Your Post Title",
  "date": "2024-02-16",
  "excerpt": "Not displayed but required",
  "tags": [],
  "file": "your-markdown-file.md"
}
```

**Note:** The `excerpt` and `tags` fields are required in the JSON but not displayed in this minimal design.

### Step 3: Commit and push

```bash
git add posts/your-markdown-file.md posts/posts.json
git commit -m "Add new post"
git push
```

## Customization

### Change Colors

Edit CSS variables in both `blog.css` and `post.css`:

```css
:root {
    --bg: #000000;        /* Background */
    --text: #ffffff;      /* Main text */
    --text-dim: #666666;  /* Dates/secondary text */
    --accent: #00ff00;    /* Links/hovers */
}
```

### Change Font

Update both HTML files and CSS:

**HTML:** Change the Google Fonts link
**CSS:** Update `--font` variable

Popular tech fonts:
- JetBrains Mono (current)
- Fira Code
- IBM Plex Mono
- Source Code Pro

## File Structure

```
blog/
├── blog.html          # Post list page
├── blog.css           # List page styles
├── blog.js            # Loads and groups posts
├── post.html          # Individual post page
├── post.css           # Post page styles
├── post.js            # Loads markdown content
└── posts/
    ├── posts.json     # Post metadata
    └── *.md           # Your markdown posts
```

## Design Details

**Blog List Page:**
- Centered vertically and horizontally
- Posts grouped by "Month Year" headers
- Each post shows: day number + title
- Hover turns title green

**Post Page:**
- Small "← back" button fixed top-left
- Content centered, max-width 700px
- Clean markdown rendering
- Green accent for links

**No clutter:**
- No header navigation
- No footer
- No search
- No tags
- No pagination
- Just content

## Typography

JetBrains Mono chosen because:
- Designed specifically for coding/technical content
- Excellent readability on screens
- Wide adoption in developer community
- Free and open source
- 8 weights available

## Philosophy

This blog embraces brutalist web design principles:
- Function over form
- Content is king
- No unnecessary decoration
- Fast loading
- Accessible
- Timeless

Perfect for technical writing, personal notes, and minimalist thinkers.

---

**Keep it simple.** 🖤


