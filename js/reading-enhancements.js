/**
 * Professional Reading Experience Enhancements
 * Provides smooth reading features including progress tracking, dark mode, FAB navigation, etc.
 */

class ReadingEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupReadingProgress();
        this.setupFloatingButtons();
        this.setupReadingMeta();
        this.setupSmoothScroll();
        this.setupKeyboardShortcuts();
        this.setupTOCHighlight();
        this.setupCodeCopyButtons();
    }

    // ========================================
    // THEME MANAGEMENT
    // ========================================
    setupTheme() {
        // Get saved theme or use system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        this.setTheme(theme);
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a202c' : '#ffffff');
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        
        // Show feedback
        this.showToast(`${newTheme === 'dark' ? '🌙 Dark' : '☀️ Light'} mode activated`);
    }

    // ========================================
    // READING PROGRESS
    // ========================================
    setupReadingProgress() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress-bar';
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-label', 'Reading progress');
        progressBar.setAttribute('aria-valuenow', '0');
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
        document.body.prepend(progressBar);

        // Update progress on scroll
        const updateProgress = () => {
            const contentElement = document.querySelector('.markdown-content') || 
                                  document.querySelector('.content-display') ||
                                  document.body;
            
            const windowHeight = window.innerHeight;
            const documentHeight = contentElement.scrollHeight || document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
            const clampedPercentage = Math.min(Math.max(scrollPercentage, 0), 100);
            
            progressBar.style.transform = `scaleX(${clampedPercentage / 100})`;
            progressBar.setAttribute('aria-valuenow', Math.round(clampedPercentage));
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress, { passive: true });
        updateProgress();
    }

    // ========================================
    // FLOATING ACTION BUTTONS
    // ========================================
    setupFloatingButtons() {
        const fabContainer = document.createElement('div');
        fabContainer.className = 'fab-container hidden';
        fabContainer.innerHTML = `
            <button class="fab fab-secondary" id="themeFab" aria-label="Toggle theme">
                <span class="theme-icon theme-icon-moon"><i class="fas fa-moon"></i></span>
                <span class="theme-icon theme-icon-sun"><i class="fas fa-sun"></i></span>
                <span class="fab-tooltip">Toggle Theme</span>
            </button>
            <button class="fab fab-secondary" id="tocFab" aria-label="Table of contents">
                <i class="fas fa-list"></i>
                <span class="fab-tooltip">Table of Contents</span>
            </button>
            <button class="fab fab-secondary" id="searchFab" aria-label="Search">
                <i class="fas fa-search"></i>
                <span class="fab-tooltip">Search (Ctrl+K)</span>
            </button>
            <button class="fab" id="scrollTopFab" aria-label="Scroll to top">
                <i class="fas fa-arrow-up"></i>
                <span class="fab-tooltip">Back to Top</span>
            </button>
        `;
        document.body.appendChild(fabContainer);

        // Show/hide FAB based on scroll position
        let lastScrollTop = 0;
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300) {
                fabContainer.classList.remove('hidden');
            } else {
                fabContainer.classList.add('hidden');
            }
            
            lastScrollTop = scrollTop;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Theme toggle FAB
        document.getElementById('themeFab').addEventListener('click', () => {
            this.toggleTheme();
        });

        // TOC toggle FAB
        document.getElementById('tocFab').addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('show');
                sidebar.classList.toggle('collapsed');
            }
            // If there's a toggle function, call it
            if (typeof toggleTOC === 'function') {
                toggleTOC();
            }
        });

        // Search FAB
        document.getElementById('searchFab').addEventListener('click', () => {
            const searchInput = document.getElementById('searchInput') || 
                               document.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
                searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        // Scroll to top FAB
        document.getElementById('scrollTopFab').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Show visual feedback
            this.showToast('📄 Scrolled to top');
        });
    }

    // ========================================
    // READING META (Time & Word Count)
    // ========================================
    setupReadingMeta() {
        const content = document.querySelector('.markdown-content') || 
                       document.querySelector('#markdown-content') ||
                       document.querySelector('.content-display');
        
        if (!content) return;

        // Calculate reading time and word count
        const text = content.textContent || content.innerText;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

        // Create meta info element
        const metaElement = document.createElement('div');
        metaElement.className = 'reading-meta';
        metaElement.innerHTML = `
            <div class="reading-time">
                <i class="fas fa-clock"></i>
                <span>${readingTime} min read</span>
            </div>
            <div class="word-count">
                <i class="fas fa-file-alt"></i>
                <span>${wordCount.toLocaleString()} words</span>
            </div>
        `;

        // Insert before content
        content.parentElement.insertBefore(metaElement, content);
    }

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    setupSmoothScroll() {
        // Handle all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, href);
                    
                    // Set focus for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        });
    }

    // ========================================
    // KEYBOARD SHORTCUTS
    // ========================================
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K: Search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('searchFab')?.click();
            }
            
            // Ctrl/Cmd + D: Toggle theme
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                this.toggleTheme();
            }
            
            // Ctrl/Cmd + B: Toggle sidebar/TOC
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                document.getElementById('tocFab')?.click();
            }
            
            // Home key: Scroll to top
            if (e.key === 'Home' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            // End key: Scroll to bottom
            if (e.key === 'End' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
                window.scrollTo({ 
                    top: document.documentElement.scrollHeight, 
                    behavior: 'smooth' 
                });
            }
        });
    }

    // ========================================
    // TOC ACTIVE HIGHLIGHT
    // ========================================
    setupTOCHighlight() {
        const headings = document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3, #markdown-content h1, #markdown-content h2, #markdown-content h3');
        const tocItems = document.querySelectorAll('.toc-item');
        
        if (headings.length === 0 || tocItems.length === 0) return;

        const observerOptions = {
            rootMargin: '-80px 0px -80% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    if (!id) return;
                    
                    // Remove active class from all TOC items
                    tocItems.forEach(item => item.classList.remove('active'));
                    
                    // Add active class to corresponding TOC item
                    const activeTocItem = document.querySelector(`.toc-item[data-target="${id}"]`);
                    if (activeTocItem) {
                        activeTocItem.classList.add('active');
                        // Scroll TOC item into view
                        activeTocItem.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }
                }
            });
        }, observerOptions);

        headings.forEach(heading => {
            if (heading.getAttribute('id')) {
                observer.observe(heading);
            }
        });
    }

    // ========================================
    // CODE COPY BUTTONS
    // ========================================
    setupCodeCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach((codeBlock, index) => {
            const pre = codeBlock.parentElement;
            
            // Wrap in container if not already wrapped
            if (!pre.parentElement.classList.contains('code-block-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'code-block-wrapper';
                pre.parentElement.insertBefore(wrapper, pre);
                wrapper.appendChild(pre);
            }
            
            const wrapper = pre.parentElement;
            
            // Create copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'code-copy-btn';
            copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
            copyButton.setAttribute('aria-label', 'Copy code to clipboard');
            copyButton.setAttribute('data-code-index', index);
            
            copyButton.addEventListener('click', async () => {
                const code = codeBlock.textContent;
                
                try {
                    await navigator.clipboard.writeText(code);
                    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    copyButton.style.background = '#10b981';
                    copyButton.style.color = 'white';
                    copyButton.style.borderColor = '#10b981';
                    
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
                        copyButton.style.background = '';
                        copyButton.style.color = '';
                        copyButton.style.borderColor = '';
                    }, 2000);
                    
                    this.showToast('✅ Code copied to clipboard!');
                } catch (err) {
                    console.error('Failed to copy code:', err);
                    copyButton.innerHTML = '<i class="fas fa-times"></i> Failed';
                    this.showToast('❌ Failed to copy code', 'error');
                }
            });
            
            wrapper.appendChild(copyButton);
        });
    }

    // ========================================
    // TOAST NOTIFICATIONS
    // ========================================
    showToast(message, type = 'info') {
        // Remove existing toasts
        document.querySelectorAll('.toast-notification').forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 32px;
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            border: 1px solid var(--border-color);
            animation: slideInRight 300ms ease, slideOutRight 300ms ease 2.7s;
        `;
        
        if (type === 'error') {
            toast.style.background = '#fee2e2';
            toast.style.color = '#991b1b';
            toast.style.borderColor = '#fca5a5';
        } else if (type === 'success') {
            toast.style.background = '#d1fae5';
            toast.style.color = '#065f46';
            toast.style.borderColor = '#6ee7b7';
        }
        
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // ========================================
    // UTILITY: DEBOUNCE
    // ========================================
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// ========================================
// AUTO-INITIALIZE
// ========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.readingEnhancements = new ReadingEnhancements();
    });
} else {
    window.readingEnhancements = new ReadingEnhancements();
}

// Add toast animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
