console.log('book-reader.js file loaded');

class BookReader {
    constructor() {
        console.log('BookReader constructor called');
        this.books = [];
        this.currentBook = null;
        this.searchIndex = new Map();
        this.isHorizontalLayout = false;
        this.pages = [];
        this.currentPageIndex = 0;
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
        console.log('Running setupEventListeners...');
        // Sidebar toggle
        const toggleButton = document.getElementById('toggleSidebar');
        console.log('Toggle button found:', toggleButton);
        if (toggleButton) {
            console.log('Adding click listener to toggle button');
            toggleButton.addEventListener('click', (e) => {
                console.log('Toggle button clicked!');
                e.preventDefault();
                e.stopPropagation();
                this.toggleSidebar();
            });
        } else {
            console.error('Toggle button not found!');
        }

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

        const printBtn = document.getElementById('printBook');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }



        // Layout toggle
        const layoutToggleBtn = document.getElementById('layoutToggle');
        if (layoutToggleBtn) {
            layoutToggleBtn.addEventListener('click', () => {
                this.toggleLayout();
            });
        }

        // Fullscreen toggle
        const fullscreenBtn = document.getElementById('fullscreen');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }

        // Horizontal navigation
        const prevPageBtn = document.getElementById('prevPageBtn');
        const nextPageBtn = document.getElementById('nextPageBtn');
        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', () => {
                this.previousPage();
            });
        }
        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', () => {
                this.nextPage();
            });
        }


        // Keyboard navigation for horizontal layout
        document.addEventListener('keydown', (e) => {
            if (this.isHorizontalLayout) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.previousPage();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextPage();
                }
            }
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
                pdfPath: 'books/numpy.pdf',
                epubPath: 'books/numpy.epub',
                coverImage: 'images/numpy-cover.jpeg',
                language: 'ta'
            },
            {
                id: 'python_in_tamil',
                title: 'அகர முதலே Python',
                markdownPath: 'books/python_in_tamil.md',
                pdfPath: 'books/python_in_tamil.pdf',
                epubPath: 'books/python_in_tamil.epub',
                coverImage: 'images/numpy-cover.jpeg',
                language: 'ta'
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

        // Update download links for the current book
        this.updateDownloadLinks();

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
            const cacheBuster = '?v=' + Date.now();
            const response = await fetch(book.markdownPath + cacheBuster);
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

            // Initialize engagement features after book is loaded
            this.initEngagementFeatures();

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
            
            // Create a wrapper for the book content
            const bookContentWrapper = document.createElement('div');
            bookContentWrapper.className = 'book-content-wrapper';
            bookContentWrapper.innerHTML = html;
            
            // Clear existing content but preserve the comments section structure
            const existingComments = markdownContent.querySelector('#commentsSection');
            markdownContent.innerHTML = '';
            
            // Add the book content
            markdownContent.appendChild(bookContentWrapper);
            
            // Add comments section after the content
            const commentsSection = document.createElement('div');
            commentsSection.className = 'comments-section mt-5';
            commentsSection.id = 'commentsSection';
            commentsSection.innerHTML = `
                <hr class="my-4">
                <div class="container-fluid px-0">
                    <h4 class="mb-3">Comments</h4>
                    <div id="disqus_thread"></div>
                </div>
            `;
            markdownContent.appendChild(commentsSection);
            
            console.log('Content and comments section inserted into DOM');
            
            // Hide welcome message if it exists
            const welcomeMessage = markdownContent.querySelector('.welcome-message');
            if (welcomeMessage) {
                welcomeMessage.style.display = 'none';
            }
            
            // Apply syntax highlighting to the book content wrapper
            bookContentWrapper.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
            
            // Add IDs to headings for TOC navigation
            bookContentWrapper.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading, index) => {
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
            // Handle relative paths that start with ../
            if (src.startsWith('../')) {
                const absolutePath = src.replace('../', '/');
                return `![${alt}](${absolutePath})`;
            }
            // Handle other relative paths
            const absolutePath = src.startsWith('/') ? src : `/${src}`;
            return `![${alt}](${absolutePath})`;
        });
    }

    generateTOC(content) {
        console.log('generateTOC called with content length:', content.length);
        const tocContainer = document.getElementById('tocContainer');
        console.log('TOC container element:', tocContainer);
        
        if (!tocContainer) {
            console.log('TOC container not found');
            return;
        }
        
        // Wait for DOM to be ready, then generate TOC from actual rendered headings
        setTimeout(() => {
            const markdownContent = document.getElementById('markdownContent');
            if (!markdownContent) {
                console.log('markdownContent not found');
                return;
            }
            
            const headings = markdownContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
            console.log('Headings found in DOM:', headings.length);
            
            if (headings.length === 0) {
                tocContainer.innerHTML = '<p class="text-muted small">No headings found</p>';
                return;
            }

            let tocHTML = '';
            headings.forEach((heading, index) => {
                // Ensure heading has an ID
                if (!heading.id) {
                    heading.id = `heading-${index}`;
                }
                
                const level = parseInt(heading.tagName.charAt(1));
                const text = heading.textContent.trim();
                
                tocHTML += `
                    <div class="toc-item level-${level}" data-target="${heading.id}" style="cursor: pointer; padding: 8px 12px; margin-left: ${(level-1)*15}px; border-radius: 4px; transition: background-color 0.3s;">
                        ${text}
                    </div>
                `;
            });

            console.log('Generated TOC HTML:', tocHTML.substring(0, 200) + '...');
            tocContainer.innerHTML = tocHTML;

            // Add click handlers for TOC items
            console.log('Adding TOC click handlers for', tocContainer.querySelectorAll('.toc-item').length, 'items');
            tocContainer.querySelectorAll('.toc-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('TOC item clicked:', item.textContent.trim());
                    const targetId = item.dataset.target;
                    console.log('Target ID:', targetId);
                    
                    if (this.isHorizontalLayout) {
                        // Find the page containing this heading
                        this.navigateToHeadingInHorizontalMode(targetId);
                    } else {
                        // Vertical layout - scroll to element
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            console.log('Target element found, scrolling...');
                            targetElement.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'start',
                                inline: 'nearest'
                            });
                            
                            // Close sidebar on mobile after navigation
                            if (window.innerWidth <= 1024) {
                                setTimeout(() => {
                                    this.closeSidebar();
                                }, 500);
                            }
                        } else {
                            console.log('Target element not found:', targetId);
                        }
                    }
                });
            });
            
            console.log('TOC generation completed with', headings.length, 'items');
        }, 200);
    }

    buildSearchIndex(content) {
        this.searchIndex = new Map();
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
        
        // Check if sidebar is currently hidden
        if (sidebar.style.display === 'none') {
            // Show sidebar - remove inline style to use CSS defaults
            sidebar.style.display = '';
            sidebar.style.transform = '';
            sidebar.style.marginLeft = '';
        } else {
            // Hide sidebar completely
            sidebar.style.display = 'none';
        }
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        // Always hide sidebar completely regardless of screen size
        sidebar.style.display = 'none';
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

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    handleURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const bookParam = urlParams.get('book');
        
        console.log('URL book parameter:', bookParam);
        
        if (bookParam) {
            // Find the book in our books array
            const book = this.books.find(b => b.id === bookParam);
            if (book) {
                console.log('Found book:', book.title);
                // Update the selector to show the selected book
                const bookSelector = document.getElementById('bookSelector');
                if (bookSelector) {
                    bookSelector.value = bookParam;
                }
                // Automatically load the book
                this.loadBook(bookParam);
            } else {
                console.error('Book not found:', bookParam);
                // Show available books for debugging
                console.log('Available books:', this.books.map(b => b.id));
            }
        } else {
            console.log('No book parameter in URL');
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
        // Get content based on current layout mode
        let contentToPrint = '';
        
        if (this.isHorizontalLayout && this.pages && this.pages.length > 0) {
            // In horizontal mode, combine all pages
            contentToPrint = this.pages.join('');
        } else {
            // In vertical mode, use markdown content
            const markdownElement = document.getElementById('markdownContent');
            contentToPrint = markdownElement ? markdownElement.innerHTML : '';
        }
        
        if (!contentToPrint.trim()) {
            alert('No content available to print');
            return;
        }
        
        const printWindow = window.open('', '_blank');
        const bookTitle = this.currentBook ? this.currentBook.title : 'Book';
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>${bookTitle} - Print</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300;400;500;600;700&display=swap');
                    
                    body { 
                        font-family: 'Hind Madurai', 'Times New Roman', serif; 
                        line-height: 1.8; 
                        margin: 0; 
                        padding: 2cm;
                        font-size: 12pt;
                        color: #333;
                    }
                    
                    h1, h2, h3, h4, h5, h6 { 
                        font-family: 'Hind Madurai', 'Georgia', serif; 
                        page-break-after: avoid;
                        color: #2c3e50;
                        margin-top: 1.5em;
                        margin-bottom: 0.5em;
                    }
                    
                    h1 { 
                        font-size: 24pt; 
                        border-bottom: 2px solid #2c3e50; 
                        padding-bottom: 0.3em;
                        page-break-before: always;
                    }
                    
                    h2 { font-size: 20pt; }
                    h3 { font-size: 16pt; }
                    h4 { font-size: 14pt; }
                    
                    p { 
                        margin-bottom: 1em; 
                        text-align: justify;
                        orphans: 2;
                        widows: 2;
                    }
                    
                    pre { 
                        background: #f8f9fa; 
                        padding: 15px; 
                        border: 1px solid #e9ecef;
                        border-radius: 4px;
                        font-size: 10pt;
                        overflow-x: auto;
                        page-break-inside: avoid;
                    }
                    
                    code {
                        background: #f8f9fa;
                        padding: 2px 4px;
                        border-radius: 3px;
                        font-size: 10pt;
                    }
                    
                    blockquote { 
                        border-left: 4px solid #2c3e50; 
                        margin: 1em 0; 
                        padding-left: 20px;
                        font-style: italic;
                        background: #f8f9fa;
                        padding: 15px 20px;
                    }
                    
                    table { 
                        border-collapse: collapse; 
                        width: 100%; 
                        margin: 1em 0;
                        page-break-inside: avoid;
                    }
                    
                    th, td { 
                        border: 1px solid #ddd; 
                        padding: 8px; 
                        text-align: left; 
                    }
                    
                    th { 
                        background-color: #f2f2f2; 
                        font-weight: 600;
                    }
                    
                    img { 
                        max-width: 100%; 
                        height: auto; 
                        display: block;
                        margin: 1em auto;
                        page-break-inside: avoid;
                    }
                    
                    ul, ol {
                        margin: 1em 0;
                        padding-left: 2em;
                    }
                    
                    li {
                        margin-bottom: 0.5em;
                    }
                    
                    @page { 
                        margin: 2cm; 
                        @bottom-right {
                            content: "Page " counter(page);
                        }
                    }
                    
                    @media print {
                        body { font-size: 11pt; }
                        h1 { font-size: 22pt; }
                        h2 { font-size: 18pt; }
                        h3 { font-size: 15pt; }
                        h4 { font-size: 13pt; }
                    }
                </style>
            </head>
            <body>
                <div style="text-align: center; margin-bottom: 2em; border-bottom: 1px solid #ddd; padding-bottom: 1em;">
                    <h1 style="margin: 0; border: none; page-break-before: auto;">${bookTitle}</h1>
                    <p style="margin: 0.5em 0 0 0; font-style: italic; color: #666;">
                        ${this.currentBook && this.currentBook.author ? this.currentBook.author : 'Tamil Arasan'}
                    </p>
                </div>
                ${contentToPrint}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Wait for content to load before printing
        setTimeout(() => {
            printWindow.print();
            // Don't auto-close to allow user to save as PDF if needed
        }, 1000);
    }

    loadUserPreferences() {
        // No dark mode preferences to load - keeping consistent with other pages
    }

    toggleLayout() {
        this.isHorizontalLayout = !this.isHorizontalLayout;
        const markdownContent = document.getElementById('markdownContent');
        const horizontalContent = document.getElementById('horizontalContent');
        const body = document.body;

        if (this.isHorizontalLayout) {
            // Switch to horizontal layout
            markdownContent.style.display = 'none';
            horizontalContent.style.display = 'flex';
            body.classList.add('layout-horizontal');
            
            // Convert content to pages if we have content
            if (this.currentBook) {
                this.convertToPages();
            }
        } else {
            // Switch to vertical layout
            markdownContent.style.display = 'block';
            horizontalContent.style.display = 'none';
            body.classList.remove('layout-horizontal');
        }
    }

    convertToPages() {
        const markdownContent = document.getElementById('markdownContent');
        const content = markdownContent.innerHTML;
        
        // Create a mapping of headings to page indices for TOC navigation
        this.headingToPageMap = new Map();
        
        // Split content by H4 headings to create more pages (like chapters/sections)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        
        const headings = tempDiv.querySelectorAll('h1, h2, h3, h4');
        this.pages = [];
        
        if (headings.length === 0) {
            // If no headings, treat entire content as one page
            this.pages.push(content);
        } else {
            // Group content by H4 sections (more granular pages)
            let currentPageContent = '';
            let pageIndex = 0;
            
            // Get all child nodes to process sequentially
            const allNodes = Array.from(tempDiv.childNodes);
            
            for (let i = 0; i < allNodes.length; i++) {
                const node = allNodes[i];
                
                if (node.nodeType === Node.ELEMENT_NODE && 
                    ['H1', 'H2', 'H3', 'H4'].includes(node.tagName)) {
                    
                    // Save previous page if it has content
                    if (currentPageContent.trim()) {
                        this.pages.push(currentPageContent);
                        pageIndex++;
                    }
                    
                    // Map this heading to the new page
                    if (node.id) {
                        this.headingToPageMap.set(node.id, pageIndex);
                    }
                    
                    // Start new page with this heading
                    currentPageContent = node.outerHTML;
                    
                    // Add subsequent content until next heading
                    for (let j = i + 1; j < allNodes.length; j++) {
                        const nextNode = allNodes[j];
                        
                        // Stop if we hit another heading at same or higher level
                        if (nextNode.nodeType === Node.ELEMENT_NODE && 
                            ['H1', 'H2', 'H3', 'H4'].includes(nextNode.tagName)) {
                            break;
                        }
                        
                        // Add content to current page
                        if (nextNode.nodeType === Node.ELEMENT_NODE) {
                            // Map subsection headings to current page
                            if (['H5', 'H6'].includes(nextNode.tagName) && nextNode.id) {
                                this.headingToPageMap.set(nextNode.id, pageIndex);
                            }
                            currentPageContent += nextNode.outerHTML;
                        } else if (nextNode.nodeType === Node.TEXT_NODE && nextNode.textContent.trim()) {
                            currentPageContent += nextNode.textContent;
                        }
                        
                        // Update main loop index
                        i = j;
                    }
                } else if (currentPageContent === '') {
                    // Content before first heading
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Map any headings in initial content
                        if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(node.tagName) && node.id) {
                            this.headingToPageMap.set(node.id, pageIndex);
                        }
                        currentPageContent += node.outerHTML;
                    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                        currentPageContent += node.textContent;
                    }
                }
            }
            
            // Add the last page
            if (currentPageContent.trim()) {
                this.pages.push(currentPageContent);
            }
        }
        
        console.log('Pages created:', this.pages.length);
        console.log('Heading to page mapping:', this.headingToPageMap);
        
        this.currentPageIndex = 0;
        this.displayCurrentPage();
    }

    displayCurrentPage() {
        const currentPage = document.getElementById('currentPage');
        const pageIndicator = document.getElementById('pageIndicator');
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        
        if (this.pages.length > 0) {
            currentPage.innerHTML = this.pages[this.currentPageIndex];
            pageIndicator.textContent = `Page ${this.currentPageIndex + 1} of ${this.pages.length}`;
            
            // Update button states
            prevBtn.disabled = this.currentPageIndex === 0;
            nextBtn.disabled = this.currentPageIndex === this.pages.length - 1;
        }
    }

    previousPage() {
        if (this.currentPageIndex > 0) {
            this.currentPageIndex--;
            this.displayCurrentPage();
        }
    }

    nextPage() {
        if (this.currentPageIndex < this.pages.length - 1) {
            this.currentPageIndex++;
            this.displayCurrentPage();
        }
    }

    navigateToHeadingInHorizontalMode(targetId) {
        console.log('Navigating to heading in horizontal mode:', targetId);
        
        // Use the pre-built mapping for faster lookup
        if (this.headingToPageMap && this.headingToPageMap.has(targetId)) {
            const pageIndex = this.headingToPageMap.get(targetId);
            console.log('Found heading on page:', pageIndex);
            
            this.currentPageIndex = pageIndex;
            this.displayCurrentPage();
            
            // After page is displayed, scroll to the heading within the page
            setTimeout(() => {
                const actualElement = document.getElementById(targetId);
                if (actualElement) {
                    actualElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    console.log('Element not found in DOM after page display:', targetId);
                }
            }, 200);
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 1024) {
                setTimeout(() => {
                    this.closeSidebar();
                }, 500);
            }
            
            return;
        }
        
        console.log('Heading not found in page mapping:', targetId);
        console.log('Available headings:', Array.from(this.headingToPageMap.keys()));
    }

    initEngagementFeatures() {
        console.log('Initializing engagement features...');
        
        // Show engagement section first
        this.showEngagementSection();
        
        // Initialize social sharing (functions are already defined globally)
        console.log('Social sharing initialized');
        
        // Disqus is already embedded in HTML, no need to reinitialize
        console.log('Disqus comments ready');
    }

    updateReadingTime() {
        const timeSpent = Math.floor((Date.now() - this.startTime) / 60000); // in minutes
        const timeElement = document.getElementById('timeSpent');
        if (timeElement) {
            timeElement.textContent = `${timeSpent}m`;
        }
    }

    initStarRating() {
        const stars = document.querySelectorAll('.star-rating .star');
        const feedbackElement = document.getElementById('ratingFeedback');
        
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                this.setRating(rating);
                
                // Update feedback
                const messages = {
                    1: "Thanks for your feedback! We'll work to improve.",
                    2: "We appreciate your input and will make improvements.",
                    3: "Thank you! Your feedback helps us grow.",
                    4: "Great! We're glad you found this helpful.",
                    5: "Excellent! Thank you for the wonderful rating!"
                };
                
                if (feedbackElement) {
                    feedbackElement.textContent = messages[rating];
                }
                
                // Store rating in localStorage
                const currentBook = this.getCurrentBookId();
                if (currentBook) {
                    localStorage.setItem(`book_rating_${currentBook}`, rating);
                }
            });
            
            star.addEventListener('mouseover', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                this.highlightStars(rating);
            });
        });
        
        // Load saved rating
        const currentBook = this.getCurrentBookId();
        if (currentBook) {
            const savedRating = localStorage.getItem(`book_rating_${currentBook}`);
            if (savedRating) {
                this.setRating(parseInt(savedRating));
            }
        }
    }

    setRating(rating) {
        const stars = document.querySelectorAll('.star-rating .star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    highlightStars(rating) {
        const stars = document.querySelectorAll('.star-rating .star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#ffc107';
            } else {
                star.style.color = '#ddd';
            }
        });
    }

    initSocialSharing() {
        // Social sharing functions are defined globally at the end of the file
    }

    initDisqusComments() {
        const currentBook = this.getCurrentBookId();
        if (!currentBook) return;
        
        // Configure Disqus
        window.disqus_config = function () {
            this.page.url = window.location.href;
            this.page.identifier = `book_${currentBook}`;
            this.page.title = document.querySelector('#bookSelector option:checked')?.textContent || 'Book Reader';
        };
        
        // Load Disqus
        if (!document.getElementById('disqus-script')) {
            const script = document.createElement('script');
            script.id = 'disqus-script';
            script.src = 'https://tamil-phy-github-io.disqus.com/embed.js';
            script.setAttribute('data-timestamp', +new Date());
            (document.head || document.body).appendChild(script);
        } else {
            // Reset Disqus for new book
            if (window.DISQUS) {
                window.DISQUS.reset({
                    reload: true,
                    config: window.disqus_config
                });
            }
        }
    }

    getCurrentBookId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('book') || document.getElementById('bookSelector')?.value;
    }

    showEngagementSection() {
        console.log('Attempting to show comments section...');
        // Comments section is now created dynamically in renderMarkdown, so just load Disqus
        setTimeout(() => {
            const commentsSection = document.getElementById('commentsSection');
            console.log('Comments section element:', commentsSection);
            if (commentsSection) {
                console.log('Comments section found, loading Disqus...');
                // Load Disqus comments
                if (typeof loadDisqusComments === 'function') {
                    loadDisqusComments();
                } else {
                    console.log('loadDisqusComments function not found, loading directly...');
                    this.loadDisqusDirectly();
                }
            } else {
                console.error('Comments section element not found!');
            }
        }, 100); // Small delay to ensure DOM is updated
    }
    
    loadDisqusDirectly() {
        console.log('Loading Disqus directly...');
        if (window.DISQUS) {
            console.log('Resetting existing Disqus...');
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.url = window.location.href;
                    this.page.identifier = new URLSearchParams(window.location.search).get('book') || window.location.pathname;
                    this.page.title = document.querySelector('#bookSelector option:checked')?.textContent || 'Book Reader';
                }
            });
        } else {
            console.log('Loading Disqus for the first time...');
            (function() {
                var d = document, s = d.createElement('script');
                s.src = 'https://tamil-phy-github-io.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            })();
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
        
        if (scrollHeight > 0) {
            const progress = Math.round((scrollTop / scrollHeight) * 100);
            
            // Update progress bar
            const progressBar = document.querySelector('.reading-progress');
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            
            // Update engagement section progress
            const progressElement = document.getElementById('readingProgress');
            if (progressElement) {
                progressElement.textContent = `${progress}%`;
            }
        }
    }

    downloadBook(format) {
        if (!this.currentBook) {
            console.warn('No book currently loaded');
            return;
        }

        let downloadUrl;
        let filename;

        if (format === 'pdf') {
            downloadUrl = this.currentBook.pdfPath;
            filename = `${this.currentBook.title}.pdf`;
        } else if (format === 'epub') {
            downloadUrl = this.currentBook.epubPath;
            filename = `${this.currentBook.title}.epub`;
        } else {
            console.error('Invalid format:', format);
            return;
        }

        // Update download links
        const downloadPdfBtn = document.getElementById('downloadPdf');
        const downloadEpubBtn = document.getElementById('downloadEpub');

        if (downloadPdfBtn && format === 'pdf') {
            downloadPdfBtn.href = downloadUrl;
            downloadPdfBtn.download = filename;
        }
        
        if (downloadEpubBtn && format === 'epub') {
            downloadEpubBtn.href = downloadUrl;
            downloadEpubBtn.download = filename;
        }

        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Force download by opening in new window for localhost
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // For localhost, open in new window to bypass Chrome's security restrictions
            window.open(downloadUrl, '_blank');
            document.body.removeChild(link);
        } else {
            // Check if file exists before downloading for production
            fetch(downloadUrl, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        link.click();
                    } else {
                        this.showNotification(`${format.toUpperCase()} file not available for download`, 'warning');
                    }
                })
                .catch(error => {
                    console.error('Error checking file:', error);
                    // Try direct download anyway
                    link.click();
                })
                .finally(() => {
                    document.body.removeChild(link);
                });
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'success'} position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 250px;';
        
        const icon = type === 'error' ? 'fas fa-exclamation-triangle' : 
                    type === 'warning' ? 'fas fa-exclamation-circle' : 
                    'fas fa-check';
        
        notification.innerHTML = `<i class="${icon} me-2"></i>${message}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
    }

    updateDownloadLinks() {
        if (!this.currentBook) return;

        const downloadPdfBtn = document.getElementById('downloadPdf');
        const downloadEpubBtn = document.getElementById('downloadEpub');

        if (downloadPdfBtn) {
            downloadPdfBtn.href = this.currentBook.pdfPath;
            downloadPdfBtn.download = `${this.currentBook.title}.pdf`;
        }
        
        if (downloadEpubBtn) {
            downloadEpubBtn.href = this.currentBook.epubPath;
            downloadEpubBtn.download = `${this.currentBook.title}.epub`;
        }
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

// Social sharing functions
function shareOnX() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.querySelector('#bookSelector option:checked')?.textContent || 'Check out this book');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function scrollToComments() {
    const commentsSection = document.getElementById('disqus_thread');
    if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add a subtle highlight effect to draw attention
        const engagementSection = document.getElementById('engagementSection');
        if (engagementSection) {
            engagementSection.style.transition = 'background-color 0.3s ease';
            engagementSection.style.backgroundColor = 'rgba(58, 134, 255, 0.05)';
            
            setTimeout(() => {
                engagementSection.style.backgroundColor = '';
            }, 2000);
        }
        
        // Trigger Disqus reset if available
        if (typeof DISQUS !== 'undefined') {
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.url = window.location.href;
                    this.page.identifier = new URLSearchParams(window.location.search).get('book') || window.location.pathname;
                    this.page.title = document.querySelector('#bookSelector option:checked')?.textContent || 'Book Reader';
                }
            });
        }
    }
}

function copyBookLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'alert alert-success position-fixed';
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 250px;';
        notification.innerHTML = '<i class="fas fa-check me-2"></i>Link copied to clipboard!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const notification = document.createElement('div');
        notification.className = 'alert alert-success position-fixed';
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 250px;';
        notification.innerHTML = '<i class="fas fa-check me-2"></i>Link copied to clipboard!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
}
