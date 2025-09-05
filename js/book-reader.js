class BookReader {
    constructor() {
        console.log('BookReader constructor called');
        this.currentBook = null;
        this.currentView = 'markdown';
        this.currentZoom = 100;
        this.bookmarks = this.loadBookmarks();
        this.searchIndex = new Map();
        this.books = [];
        
        console.log('Calling init...');
        this.init();
    }

    init() {
        console.log('Init method called');
        try {
            console.log('Setting up event listeners...');
            this.setupEventListeners();
            console.log('Loading book list...');
            this.loadBookList();
            console.log('Setting up keyboard shortcuts...');
            this.setupKeyboardShortcuts();
            console.log('Setting up accessibility...');
            this.setupAccessibility();
            console.log('Loading user preferences...');
            this.loadUserPreferences();
            console.log('Handling URL parameters...');
            this.handleURLParameters();
            console.log('Init completed successfully');
        } catch (error) {
            console.error('Error in init:', error);
        }
    }

    setupEventListeners() {
        // Sidebar toggle
        document.getElementById('toggleSidebar').addEventListener('click', () => {
            this.toggleSidebar();
        });

        const closeSidebarBtn = document.getElementById('closeSidebar');
        if (closeSidebarBtn) {
            closeSidebarBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeSidebar();
            });
        }

        // Book selection
        document.getElementById('bookSelector').addEventListener('change', (e) => {
            console.log('Book selector changed to:', e.target.value);
            this.loadBook(e.target.value);
        });

        // Search functionality
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.performSearch();
        });

        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Zoom controls (optional - only if they exist)
        const zoomIn = document.getElementById('zoomIn');
        if (zoomIn) {
            zoomIn.addEventListener('click', () => {
                this.adjustZoom(25);
            });
        }

        const zoomOut = document.getElementById('zoomOut');
        if (zoomOut) {
            zoomOut.addEventListener('click', () => {
                this.adjustZoom(-25);
            });
        }

        const resetZoom = document.getElementById('resetZoom');
        if (resetZoom) {
            resetZoom.addEventListener('click', () => {
                this.resetZoom();
            });
        }

        // Print functionality
        document.getElementById('printBook').addEventListener('click', () => {
            this.printBook();
        });

        // Fullscreen toggle
        document.getElementById('fullscreen').addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // Bookmark functionality
        document.getElementById('addBookmark').addEventListener('click', () => {
            this.addBookmark();
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts when not typing in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            switch (e.key.toLowerCase()) {
                case 's':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        document.getElementById('searchInput').focus();
                    }
                    break;
                case 'f':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.toggleFullscreen();
                    }
                    break;
                case 'p':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.printBook();
                    }
                    break;
                case 'b':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.addBookmark();
                    }
                    break;
                case 'Escape':
                    this.closeSidebar();
                    break;
                case '+':
                case '=':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.adjustZoom(25);
                    }
                    break;
                case '-':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.adjustZoom(-25);
                    }
                    break;
                case '0':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.resetZoom();
                    }
                    break;
            }
        });
    }

    setupAccessibility() {
        const sidebar = document.getElementById('sidebar');
        const focusableElements = sidebar.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            sidebar.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }
    }

    loadBookList() {
        console.log('Loading book list...');
        
        this.books = [
            {
                id: 'numpy',
                title: 'NumPy Guide',
                markdownPath: 'books/numpy.md',
                language: 'en'
            }
        ];

        console.log('Books array set to:', this.books);

        const selector = document.getElementById('bookSelector');
        if (!selector) {
            console.error('Book selector element not found');
            return;
        }
        
        // Clear existing options except the first "Choose a book..." option
        while (selector.children.length > 1) {
            selector.removeChild(selector.lastChild);
        }
        
        this.books.forEach(book => {
            const option = document.createElement('option');
            option.value = book.id;
            option.textContent = book.title;
            selector.appendChild(option);
        });

        console.log('Book list loaded successfully, books:', this.books.length);
    }

    async loadBook(bookId) {
        console.log('Loading book:', bookId);
        if (!bookId) {
            console.log('No bookId provided');
            return;
        }

        const book = this.books.find(b => b.id === bookId);
        if (!book) {
            console.error('Book not found:', bookId, 'Available books:', this.books);
            return;
        }

        console.log('Found book:', book);
        this.currentBook = book;
        const titleElement = document.getElementById('currentBookTitle');
        if (titleElement) {
            titleElement.textContent = book.title;
        }

        // Show loading state
        this.showLoading();

        // Test with simple content first
        const testContent = `# Test Content
        
This is a test to see if markdown rendering works.

## Section 1
Some text here.

\`\`\`javascript
console.log('Hello World');
\`\`\`

- Item 1
- Item 2
- Item 3`;

        try {
            console.log('Testing with simple content first...');
            this.renderMarkdown(testContent);
            
            // Now try loading the actual file
            console.log('Fetching:', book.markdownPath);
            const response = await fetch(book.markdownPath);
            console.log('Response status:', response.status, response.ok);
            
            if (!response.ok) {
                console.error('Fetch failed, using test content');
                this.hideLoading();
                return;
            }
            
            const markdownContent = await response.text();
            console.log('Loaded content length:', markdownContent.length);
            
            this.renderMarkdown(markdownContent);
            this.generateTOC(markdownContent);
            this.buildSearchIndex(markdownContent);

            this.hideLoading();
            console.log('Book loaded successfully');
        } catch (error) {
            console.error('Error loading book:', error);
            this.showError('Failed to load book: ' + error.message);
            this.hideLoading();
        }
    }

    renderMarkdown(content) {
        console.log('Rendering markdown content:', content.substring(0, 100) + '...');
        
        try {
            // Fix image paths in content
            content = this.fixImagePaths(content);
            
            // Check if marked and hljs are available
            if (typeof marked === 'undefined') {
                throw new Error('marked.js library not loaded');
            }
            if (typeof hljs === 'undefined') {
                throw new Error('highlight.js library not loaded');
            }
            
            // Configure marked options
            marked.setOptions({
                highlight: function(code, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        return hljs.highlight(code, { language: lang }).value;
                    }
                    return hljs.highlightAuto(code).value;
                },
                breaks: true,
                gfm: true
            });

            // Render markdown to HTML
            const html = marked.parse(content);
            console.log('Generated HTML length:', html.length);
            
            // Display the content
            const markdownContent = document.getElementById('markdownContent');
            if (!markdownContent) {
                throw new Error('markdownContent element not found');
            }
            
            markdownContent.innerHTML = html;
            console.log('Content inserted into DOM');
            
            // Hide welcome message
            const welcomeMessage = markdownContent.querySelector('.welcome-message');
            if (welcomeMessage) {
                welcomeMessage.style.display = 'none';
            }
            
            // Apply syntax highlighting
            markdownContent.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
            
            // Add IDs to headings for TOC navigation
            markdownContent.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading, index) => {
                heading.id = `heading-${index}`;
            });
            
            // Add scroll listener for progress bar
            markdownContent.addEventListener('scroll', () => {
                console.log('Scroll event triggered');
                this.updateReadingProgress();
            });
            
            // Also add scroll listener to the parent container in case markdown content doesn't scroll
            const contentDisplay = document.getElementById('contentDisplay');
            if (contentDisplay) {
                contentDisplay.addEventListener('scroll', () => {
                    console.log('Content display scroll event triggered');
                    this.updateReadingProgressForContainer();
                });
            }
            
            // Update reading progress
            this.updateReadingProgress();
            
            console.log('Markdown rendering completed successfully');
        } catch (error) {
            console.error('Error in renderMarkdown:', error);
            this.showError('Failed to render markdown content: ' + error.message);
        }
    }

    fixImagePaths(content) {
        // Replace relative image paths with absolute paths
        return content.replace(/!\[([^\]]*)\]\((?!http)([^)]+)\)/g, (match, alt, src) => {
            const absolutePath = src.startsWith('/') ? src : `/${src}`;
            return `![${alt}](${absolutePath})`;
        });
    }

    generateTOC(content) {
        const tocContainer = document.getElementById('tocContainer');
        if (!tocContainer) {
            console.log('TOC container not found');
            return;
        }
        
        const headings = content.match(/^#{1,6}\s+.+$/gm);
        
        if (!headings || headings.length === 0) {
            tocContainer.innerHTML = '<p class="text-muted small">No headings found</p>';
            return;
        }

        let tocHTML = '';
        headings.forEach((heading, index) => {
            const level = heading.match(/^#+/)[0].length;
            const text = heading.replace(/^#+\s+/, '');
            const id = `heading-${index}`;
            
            tocHTML += `
                <div class="toc-item toc-level-${level}" data-target="${id}" style="cursor: pointer; padding: 5px; margin-left: ${(level-1)*15}px;">
                    ${text}
                </div>
            `;
        });

        tocContainer.innerHTML = tocHTML;

        // Add click handlers for TOC items
        tocContainer.querySelectorAll('.toc-item').forEach(item => {
            item.addEventListener('click', () => {
                const targetId = item.dataset.target;
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    console.log('Target element not found:', targetId);
                }
            });
        });
    }

    buildSearchIndex(content) {
        this.searchIndex.clear();
        const lines = content.split('\n');
        
        lines.forEach((line, index) => {
            if (line.trim()) {
                const words = line.toLowerCase().split(/\s+/);
                words.forEach(word => {
                    word = word.replace(/[^\w]/g, '');
                    if (word.length > 2) {
                        if (!this.searchIndex.has(word)) {
                            this.searchIndex.set(word, []);
                        }
                        this.searchIndex.get(word).push({
                            line: index + 1,
                            content: line.trim(),
                            context: lines.slice(Math.max(0, index - 1), index + 2).join(' ')
                        });
                    }
                });
            }
        });
    }

    performSearch() {
        const searchInput = document.getElementById('searchInput');
        const resultsContainer = document.getElementById('searchResults');
        
        if (!searchInput) {
            console.log('Search input not found');
            return;
        }
        
        const query = searchInput.value.trim();
        
        if (!query) {
            this.clearSearchHighlights();
            if (resultsContainer) {
                resultsContainer.style.display = 'none';
                resultsContainer.innerHTML = '';
            }
            return;
        }

        // Clear previous highlights
        this.clearSearchHighlights();
        
        // Highlight matches in document
        const matchCount = this.highlightSearchInDocument(query);
        
        // Show simple result count instead of cluttered list
        if (resultsContainer) {
            if (matchCount > 0) {
                resultsContainer.innerHTML = `
                    <div class="search-summary">
                        <div class="search-count">${matchCount} matches found</div>
                        <div class="search-navigation">
                            <button class="btn btn-sm btn-outline-primary" onclick="bookReader.navigateSearchResults('prev')">
                                <i class="fas fa-chevron-up"></i> Previous
                            </button>
                            <button class="btn btn-sm btn-outline-primary" onclick="bookReader.navigateSearchResults('next')">
                                <i class="fas fa-chevron-down"></i> Next
                            </button>
                        </div>
                    </div>
                `;
                this.currentSearchIndex = 0;
                this.scrollToSearchResult(0);
            } else {
                resultsContainer.innerHTML = '<div class="search-summary">No matches found</div>';
            }
            resultsContainer.style.display = 'block';
        }
    }

    highlightSearchInDocument(query) {
        const markdownContent = document.getElementById('markdownContent');
        if (!markdownContent) return 0;

        const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
        let matchCount = 0;
        
        // Create a TreeWalker to traverse text nodes
        const walker = document.createTreeWalker(
            markdownContent,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        // Process each text node
        textNodes.forEach(textNode => {
            const originalText = textNode.textContent;
            let highlightedText = originalText;
            let hasMatch = false;

            searchTerms.forEach(term => {
                const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
                if (regex.test(originalText)) {
                    hasMatch = true;
                    highlightedText = highlightedText.replace(regex, '<mark class="search-highlight" data-search-index="' + matchCount + '">$1</mark>');
                    matchCount++;
                }
            });

            if (hasMatch) {
                const span = document.createElement('span');
                span.innerHTML = highlightedText;
                textNode.parentNode.replaceChild(span, textNode);
            }
        });

        return matchCount;
    }

    clearSearchHighlights() {
        const markdownContent = document.getElementById('markdownContent');
        if (!markdownContent) return;

        // Remove all search highlights
        const highlights = markdownContent.querySelectorAll('mark.search-highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize(); // Merge adjacent text nodes
        });

        // Remove any span wrappers that were created
        const spans = markdownContent.querySelectorAll('span');
        spans.forEach(span => {
            if (span.children.length === 0 && span.textContent) {
                const parent = span.parentNode;
                parent.replaceChild(document.createTextNode(span.textContent), span);
                parent.normalize();
            }
        });
    }

    navigateSearchResults(direction) {
        const highlights = document.querySelectorAll('mark.search-highlight');
        if (highlights.length === 0) return;

        if (direction === 'next') {
            this.currentSearchIndex = (this.currentSearchIndex + 1) % highlights.length;
        } else {
            this.currentSearchIndex = this.currentSearchIndex === 0 ? highlights.length - 1 : this.currentSearchIndex - 1;
        }

        this.scrollToSearchResult(this.currentSearchIndex);
    }

    scrollToSearchResult(index) {
        const highlights = document.querySelectorAll('mark.search-highlight');
        if (highlights.length === 0 || index >= highlights.length) return;

        // Remove previous active highlight
        highlights.forEach(h => h.classList.remove('search-highlight-active'));
        
        // Add active class to current highlight
        const currentHighlight = highlights[index];
        currentHighlight.classList.add('search-highlight-active');
        
        // Scroll to the highlight
        currentHighlight.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
        });
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    addBookmark() {
        if (!this.currentBook) return;

        const contentDisplay = document.getElementById('contentDisplay');
        const scrollPosition = contentDisplay.scrollTop;
        
        const bookmark = {
            id: Date.now(),
            bookId: this.currentBook.id,
            title: `Bookmark ${this.bookmarks.length + 1}`,
            position: scrollPosition,
            timestamp: new Date().toISOString()
        };

        this.bookmarks.push(bookmark);
        this.saveBookmarks();
        this.updateBookmarksList();
        this.showNotification('Bookmark added successfully');
    }

    updateBookmarksList() {
        const bookmarksList = document.getElementById('bookmarksList');
        if (!bookmarksList) return;

        if (this.bookmarks.length === 0) {
            bookmarksList.innerHTML = '<p class="text-muted small">No bookmarks yet</p>';
            return;
        }

        bookmarksList.innerHTML = this.bookmarks.map(bookmark => `
            <div class="bookmark-item" data-id="${bookmark.id}">
                <span class="bookmark-title">${bookmark.title}</span>
                <button class="btn btn-sm btn-outline-danger" onclick="bookReader.removeBookmark(${bookmark.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    removeBookmark(bookmarkId) {
        this.bookmarks = this.bookmarks.filter(b => b.id !== bookmarkId);
        this.saveBookmarks();
        this.updateBookmarksList();
        this.showNotification('Bookmark removed');
    }

    loadBookmarks() {
        const saved = localStorage.getItem('bookReader_bookmarks');
        return saved ? JSON.parse(saved) : [];
    }

    saveBookmarks() {
        localStorage.setItem('bookReader_bookmarks', JSON.stringify(this.bookmarks));
    }

    adjustZoom(delta) {
        this.currentZoom = Math.max(50, Math.min(200, this.currentZoom + delta));
        const contentDisplay = document.getElementById('contentDisplay');
        contentDisplay.style.fontSize = `${this.currentZoom}%`;
        document.getElementById('zoomLevel').textContent = `${this.currentZoom}%`;
    }

    resetZoom() {
        this.currentZoom = 100;
        const contentDisplay = document.getElementById('contentDisplay');
        contentDisplay.style.fontSize = '100%';
        document.getElementById('zoomLevel').textContent = '100%';
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth <= 1024) {
            sidebar.classList.toggle('show');
        } else {
            sidebar.classList.toggle('collapsed');
        }
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('show');
        } else {
            sidebar.classList.add('collapsed');
        }
    }

    toggleFullscreen() {
        const container = document.querySelector('.book-reader-container').parentElement;
        
        if (!document.fullscreenElement) {
            container.requestFullscreen().then(() => {
                container.classList.add('fullscreen-mode');
                document.getElementById('fullscreen').innerHTML = '<i class="fas fa-compress"></i>';
            });
        } else {
            document.exitFullscreen().then(() => {
                container.classList.remove('fullscreen-mode');
                document.getElementById('fullscreen').innerHTML = '<i class="fas fa-expand"></i>';
            });
        }
    }

    showLoading() {
        const markdownContent = document.getElementById('markdownContent');
        markdownContent.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Loading book...</p>
            </div>
        `;
    }

    hideLoading() {
        // Loading is hidden when content is rendered
    }

    showError(message) {
        const markdownContent = document.getElementById('markdownContent');
        markdownContent.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                <h4 class="text-muted">Error</h4>
                <p class="text-muted">${message}</p>
            </div>
        `;
    }

    showNotification(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `alert alert-${type} position-fixed`;
        toast.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Fade in
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);
        
        // Fade out and remove
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    handleURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const bookParam = urlParams.get('book');
        
        if (bookParam) {
            const bookSelector = document.getElementById('bookSelector');
            bookSelector.value = bookParam;
            this.loadBook(bookParam);
        }
    }

    updateReadingProgress() {
        const markdownContent = document.getElementById('markdownContent');
        if (!markdownContent) {
            console.log('markdownContent not found for progress bar');
            return;
        }
        
        const scrollTop = markdownContent.scrollTop;
        const scrollHeight = markdownContent.scrollHeight - markdownContent.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        
        console.log('Progress calculation:', { scrollTop, scrollHeight, progress });
        
        const progressBar = document.getElementById('readingProgress');
        if (progressBar) {
            progressBar.style.width = `${Math.min(progress, 100)}%`;
            console.log('Progress bar updated to:', `${Math.min(progress, 100)}%`);
        } else {
            console.log('Progress bar element not found');
        }
    }

    updateReadingProgressForContainer() {
        const contentDisplay = document.getElementById('contentDisplay');
        if (!contentDisplay) {
            console.log('contentDisplay not found for progress bar');
            return;
        }
        
        const scrollTop = contentDisplay.scrollTop;
        const scrollHeight = contentDisplay.scrollHeight - contentDisplay.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        
        console.log('Container progress calculation:', { scrollTop, scrollHeight, progress });
        
        const progressBar = document.getElementById('readingProgress');
        if (progressBar) {
            progressBar.style.width = `${Math.min(progress, 100)}%`;
            console.log('Progress bar updated to:', `${Math.min(progress, 100)}%`);
        } else {
            console.log('Progress bar element not found');
        }
    }

    printBook() {
        if (this.currentView === 'markdown') {
            const printWindow = window.open('', '_blank');
            const markdownContent = document.getElementById('markdownContent').innerHTML;
            
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${this.currentBook ? this.currentBook.title : 'Book'} - Print</title>
                    <style>
                        body { font-family: 'Times New Roman', serif; line-height: 1.6; margin: 2cm; }
                        h1, h2, h3, h4, h5, h6 { font-family: 'Georgia', serif; page-break-after: avoid; }
                        pre { background: #f5f5f5; padding: 10px; border: 1px solid #ddd; }
                        blockquote { border-left: 4px solid #ddd; margin-left: 0; padding-left: 20px; }
                        table { border-collapse: collapse; width: 100%; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        img { max-width: 100%; height: auto; }
                        @page { margin: 2cm; }
                    </style>
                </head>
                <body>
                    <h1>${this.currentBook ? this.currentBook.title : 'Book'}</h1>
                    ${markdownContent}
                </body>
                </html>
            `);
            
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        }
    }

    loadUserPreferences() {
        // No dark mode preferences to load - keeping consistent with other pages
    }
}

// Initialize the book reader when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing BookReader...');
    try {
        window.bookReader = new BookReader();
        console.log('BookReader initialized successfully');
    } catch (error) {
        console.error('Failed to initialize BookReader:', error);
    }
});

// Handle page visibility changes to pause/resume functionality
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause any ongoing operations
    } else {
        // Page is visible, resume operations
    }
});
