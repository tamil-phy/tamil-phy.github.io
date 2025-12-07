# Tamil Arasan Bakthavatchalam - Personal Portfolio

[![Website](https://img.shields.io/website?url=https%3A%2F%2Ftamil-phy.github.io)](https://tamil-phy.github.io)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Personal portfolio website showcasing my work in Physics, Machine Learning, and AI research.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Blog System**: Write posts in Markdown with filtering and search
- **Book Reader**: Dual-mode PDF/Markdown book reader with bookmarks
- **Notes Section**: Technical notes with categorization
- **Papers**: Research publications and preprints
- **Multilingual**: Support for English and Tamil content

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, Bootstrap 5, HTML5, CSS3
- **Libraries**: 
  - PDF.js for PDF rendering
  - Marked.js for Markdown parsing
  - Highlight.js for code syntax highlighting
  - Font Awesome for icons
- **Fonts**: Google Fonts (Poppins, Playfair Display, Hind Madurai)

## 📦 Project Structure

```
tamil-phy.github.io/
├── index.html              # Homepage
├── blog.html              # Blog listing page
├── blog-post.html         # Blog post viewer
├── books.html             # Books listing
├── book-reader.html       # Book reading interface
├── notes.html             # Notes listing
├── note-post.html         # Note viewer
├── papers.html            # Publications
├── css/
│   ├── common.css         # Shared styles
│   ├── book-reader.css    # Book reader styles
│   └── styles.css         # Additional styles
├── js/
│   ├── book-reader.js     # Book reader functionality
│   └── scripts.js         # Utility scripts
├── posts/                 # Markdown blog posts
├── notes/                 # Markdown notes
├── books/                 # Book content (PDF/Markdown)
└── images/                # Image assets
```

## 🚀 Getting Started

### Prerequisites

- Python 3.x (for local development server)
- Modern web browser

### Local Development

```bash
# Clone the repository
git clone https://github.com/tamil-phy/tamil-phy.github.io.git
cd tamil-phy.github.io

# Start local server
python3 -m http.server 8080

# Open in browser
# Navigate to http://localhost:8080
```

### Using npm scripts

```bash
# Install dev dependencies
npm install

# Start dev server
npm run dev
```

## 📝 Adding Content

### Blog Posts

1. Create a new Markdown file in `/posts/` (e.g., `post29.md`)
2. Add metadata and content
3. Update blog listing in `blog.html`

### Notes

1. Create Markdown file in `/notes/`
2. Update notes listing in `notes.html`

### Books

1. Add PDF/Markdown in `/books/`
2. Update book metadata in `books.html`

## 🎨 Customization

Edit CSS variables in `/css/common.css`:

```css
:root {
    --primary-color: #3a86ff;
    --secondary-color: #8338ec;
    --accent-color: #ff006e;
}
```

## 🤝 Contributing

While this is a personal portfolio, suggestions and bug reports are welcome! Please open an issue or submit a pull request.

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

## 📧 Contact

- **Email**: tamilarasanbakthavatchalam@gmail.com
- **LinkedIn**: [tamil-arasan-ph-d](https://www.linkedin.com/in/tamil-arasan-ph-d/)
- **GitHub**: [@tamil-phy](https://github.com/tamil-phy)
- **X (Twitter)**: [@tamiltheorist](https://x.com/tamiltheorist)

---

Built with ❤️ by Tamil Arasan Bakthavatchalam