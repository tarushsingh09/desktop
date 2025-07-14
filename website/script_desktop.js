// ===============================
// SECTION: DOM Content Loaded Event
// ===============================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality when DOM is ready
    initializeHamburgerMenu();
    initializeDropdownMenus();
    initializeScrollToTop();
    initializeSmoothScrolling();
    initializeFooterYear();
    initializeAnimations();
    initializeNewsletterForm();
});

// ===============================
// SECTION: Hamburger Menu Toggle
// ===============================
function initializeHamburgerMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuContainer = document.querySelector('.menu-container');
    const hamburger = document.querySelector('.hamburger');
    
    if (!menuToggle || !menuContainer || !hamburger) return;
    
    // Toggle hamburger menu on click
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        menuToggle.checked = !menuToggle.checked;
        
        // Add animation class
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (menuToggle.checked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuContainer.contains(e.target) && !hamburger.contains(e.target)) {
            menuToggle.checked = false;
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuToggle.checked) {
            menuToggle.checked = false;
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on menu items (mobile)
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.checked = false;
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// ===============================
// SECTION: Dropdown Menu Handling
// ===============================
function initializeDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const checkbox = dropdown.querySelector('.dropdown-toggle-checkbox');
        
        if (!toggle || !menu || !checkbox) return;
        
        // Handle desktop hover behavior
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', function() {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            });
        }
        
        // Handle mobile click behavior
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                checkbox.checked = !checkbox.checked;
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherCheckbox = otherDropdown.querySelector('.dropdown-toggle-checkbox');
                        if (otherCheckbox) {
                            otherCheckbox.checked = false;
                        }
                    }
                });
            }
        });
    });
    
    // Handle window resize to reset dropdown behavior
    window.addEventListener('resize', function() {
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            const checkbox = dropdown.querySelector('.dropdown-toggle-checkbox');
            
            if (window.innerWidth > 768) {
                // Reset mobile states for desktop
                if (checkbox) checkbox.checked = false;
                if (menu) {
                    menu.style.opacity = '';
                    menu.style.visibility = '';
                    menu.style.transform = '';
                }
            }
        });
    });
}

// ===============================
// SECTION: Scroll-to-Top Button Logic
// ===============================
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    // Show/hide button based on scroll position
    function toggleScrollButton() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }
    
    // Smooth scroll to top functionality
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Add event listeners
    window.addEventListener('scroll', toggleScrollButton);
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
    // Keyboard accessibility
    scrollToTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
}

// ===============================
// SECTION: Smooth Scroll Navigation
// ===============================
function initializeSmoothScrolling() {
    // Handle smooth scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight + 
                                   document.querySelector('.navbar').offsetHeight;
                
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

// ===============================
// SECTION: Dynamic Footer Year Update
// ===============================
function initializeFooterYear() {
    const currentYearElement = document.getElementById('currentYear');
    
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
}

// ===============================
// SECTION: Animation on Scroll
// ===============================
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.notice-card, .leader-card, .footer-column');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===============================
// SECTION: Newsletter Form Handling
// ===============================
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('.newsletter-input');
        const submitBtn = this.querySelector('.newsletter-btn');
        
        if (!emailInput || !submitBtn) return;
        
        const email = emailInput.value.trim();
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showNotification('Please enter your email address.', 'error');
            return;
        }
        
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="spinner"></div>';
        submitBtn.disabled = true;
        
        // Simulate newsletter subscription (replace with actual API call)
        setTimeout(() => {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===============================
// SECTION: Notification System
// ===============================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', function() {
        closeNotification(notification);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===============================
// SECTION: Scroll Progress Indicator
// ===============================
function initializeScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-orange), var(--secondary-orange));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = scrollPercentage + '%';
    });
}

// ===============================
// SECTION: Lazy Loading for Images
// ===============================
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// ===============================
// SECTION: Performance Optimization
// ===============================
// Debounce function for scroll events
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===============================
// SECTION: Accessibility Enhancements
// ===============================
function initializeAccessibility() {
    // Add focus visible polyfill for older browsers
    const focusVisibleElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]'
    );
    
    focusVisibleElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                this.classList.add('focus-visible');
            }
        });
        
        element.addEventListener('mousedown', function() {
            this.classList.remove('focus-visible');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });
    
    // Skip to main content functionality
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.querySelector('main') || document.querySelector('.main-content');
    
    if (skipLink && mainContent) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Enhanced keyboard navigation for dropdowns
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('keydown', function(e) {
            const dropdown = this.closest('.dropdown');
            const menu = dropdown.querySelector('.dropdown-menu');
            const menuItems = menu.querySelectorAll('a, button');
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (menuItems.length > 0) {
                        const checkbox = dropdown.querySelector('.dropdown-toggle-checkbox');
                        if (checkbox) checkbox.checked = true;
                        menuItems[0].focus();
                    }
                    break;
                case 'Escape':
                    const checkbox = dropdown.querySelector('.dropdown-toggle-checkbox');
                    if (checkbox) checkbox.checked = false;
                    this.focus();
                    break;
            }
        });
    });
    
// ===============================
// Arrow key navigation within dropdown menus
// ===============================
const dropdownMenus = document.querySelectorAll('.dropdown-menu');

dropdownMenus.forEach(menu => {
  const menuItems = menu.querySelectorAll('a, button');

  menuItems.forEach((item, index) => {
    item.addEventListener('keydown', function(e) {
      const currentIndex = Array.from(menuItems).indexOf(this);
      const dropdown = this.closest('.dropdown');
      const toggle = dropdown?.querySelector('.dropdown-toggle');
      const checkbox = dropdown?.querySelector('.dropdown-toggle-checkbox');

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % menuItems.length;
          menuItems[nextIndex].focus();
          break;

        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = currentIndex === 0 ? menuItems.length - 1 : currentIndex - 1;
          menuItems[prevIndex].focus();
          break;

        case 'Escape':
          e.preventDefault();
          if (checkbox) checkbox.checked = false;
          if (toggle) toggle.focus();
          break;

        case 'Tab':
          if (checkbox) checkbox.checked = false;
          break;
      }
    });
  });
});

}

// ===============================
// SECTION: High Contrast Mode Toggle
// ===============================
function initializeHighContrastMode() {
    // Create high contrast toggle button
    const contrastToggle = document.createElement('button');
    contrastToggle.className = 'high-contrast-toggle';
    contrastToggle.innerHTML = '<i class="fas fa-adjust"></i>';
    contrastToggle.setAttribute('aria-label', 'Toggle high contrast mode');
    contrastToggle.setAttribute('title', 'Toggle high contrast mode');
    
    // Add styles for the toggle button
    contrastToggle.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-orange);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        z-index: 9998;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;
    
    // Check for saved preference
    const savedMode = localStorage.getItem('highContrastMode');
    if (savedMode === 'true') {
        document.body.classList.add('high-contrast');
        contrastToggle.classList.add('active');
    }
    
    // Toggle functionality
    contrastToggle.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
        const isActive = document.body.classList.contains('high-contrast');
        
        // Save preference
        localStorage.setItem('highContrastMode', isActive);
        
        // Update button state
        this.classList.toggle('active', isActive);
        
        // Show notification
        showNotification(
            isActive ? 'High contrast mode enabled' : 'High contrast mode disabled',
            'info'
        );
    });
    
    // Add to document
    document.body.appendChild(contrastToggle);
}

// ===============================
// SECTION: Theme Toggle (Dark/Light Mode)
// ===============================
function initializeThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.setAttribute('title', 'Toggle dark mode');
    
    // Add styles for the toggle button
    themeToggle.style.cssText = `
        position: fixed;
        top: 80px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-orange);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        z-index: 9998;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        // Update icon
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Show notification
        showNotification(
            isDark ? 'Dark mode enabled' : 'Light mode enabled',
            'info'
        );
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('dark-theme', e.matches);
            themeToggle.innerHTML = e.matches ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    });
    
    // Add to document
    document.body.appendChild(themeToggle);
}

// ===============================
// SECTION: Enhanced Form Validation
// ===============================
function initializeFormValidation() {
    // Get all forms on the page
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add validation on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Add validation on input for better UX
            input.addEventListener('input', function() {
                if (this.classList.contains('invalid')) {
                    validateField(this);
                }
            });
        });
        
        // Enhanced form submission
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                const firstInvalid = form.querySelector('.invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
}

// Field validation helper function
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let message = '';
    
    // Remove existing error styling
    field.classList.remove('invalid');
    removeFieldError(field);
    
    // Required field validation
    if (required && !value) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    else if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
    }
    
    // URL validation
    else if (type === 'url' && value) {
        try {
            new URL(value);
        } catch {
            isValid = false;
            message = 'Please enter a valid URL';
        }
    }
    
    // Password validation
    else if (type === 'password' && value) {
        if (value.length < 8) {
            isValid = false;
            message = 'Password must be at least 8 characters long';
        }
    }
    
    // Show error if invalid
    if (!isValid) {
        field.classList.add('invalid');
        showFieldError(field, message);
    }
    
    return isValid;
}

// Show field error message
function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.875em;
        margin-top: 0.25rem;
        display: block;
    `;
    
    field.parentNode.appendChild(errorElement);
    field.setAttribute('aria-describedby', 'field-error-' + Date.now());
}

// Remove field error message
function removeFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.removeAttribute('aria-describedby');
}

// ===============================
// SECTION: Search Functionality
// ===============================
function initializeSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchInput = document.querySelector('.search-input');
    const searchClose = document.querySelector('.search-close');
    const searchResults = document.querySelector('.search-results');
    
    if (!searchToggle || !searchOverlay || !searchInput) return;
    
    // Toggle search overlay
    searchToggle.addEventListener('click', function(e) {
        e.preventDefault();
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    });
    
    // Close search overlay
    function closeSearch() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });
    
    // Close on overlay click
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });
    
    // Search functionality
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        clearTimeout(searchTimeout);
        
        if (query.length < 2) {
            if (searchResults) searchResults.innerHTML = '';
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    // Search form submission
    const searchForm = searchOverlay.querySelector('form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        });
    }
}

// Perform search function
function performSearch(query) {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults) return;
    
    // Show loading state
    searchResults.innerHTML = '<div class="search-loading">Searching...</div>';
    
    // Simulate search (replace with actual search implementation)
    setTimeout(() => {
        const mockResults = [
            { title: 'NSS Activities', url: '#activities', snippet: 'Join various NSS activities and contribute to society...' },
            { title: 'Volunteer Programs', url: '#programs', snippet: 'Participate in volunteer programs and make a difference...' },
            { title: 'Community Service', url: '#services', snippet: 'Engage in community service projects and initiatives...' }
        ];
        
        const filteredResults = mockResults.filter(result => 
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.snippet.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredResults.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">No results found for "' + query + '"</div>';
        } else {
            searchResults.innerHTML = filteredResults.map(result => `
                <div class="search-result">
                    <h3><a href="${result.url}">${result.title}</a></h3>
                    <p>${result.snippet}</p>
                </div>
            `).join('');
        }
    }, 500);
}

// ===============================
// SECTION: Print Functionality
// ===============================
function initializePrintFeature() {
    const printButtons = document.querySelectorAll('.print-btn');
    
    printButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add print-specific styles
            const printStyles = document.createElement('style');
            printStyles.textContent = `
                @media print {
                    .header, .navbar, .footer, .print-btn, .scroll-to-top, 
                    .theme-toggle, .high-contrast-toggle, .search-overlay,
                    .notification { display: none !important; }
                    
                    body { 
                        font-size: 12pt; 
                        line-height: 1.5; 
                        color: black; 
                        background: white; 
                    }
                    
                    .container { 
                        max-width: none; 
                        margin: 0; 
                        padding: 0; 
                    }
                    
                    .notice-card, .leader-card { 
                        break-inside: avoid; 
                        margin-bottom: 20px; 
                    }
                    
                    a { 
                        color: black; 
                        text-decoration: none; 
                    }
                    
                    a:after { 
                        content: " (" attr(href) ")"; 
                        font-size: 0.8em; 
                    }
                }
            `;
            
            document.head.appendChild(printStyles);
            
            // Print the page
            window.print();
            
            // Remove print styles after printing
            setTimeout(() => {
                document.head.removeChild(printStyles);
            }, 1000);
        });
    });
}

// ===============================
// SECTION: Back to Top Enhancement
// ===============================
function enhanceBackToTop() {
    const backToTopBtn = document.getElementById('scrollToTop');
    if (!backToTopBtn) return;
    
    // Add progress ring around the button
    const progressRing = document.createElement('div');
    progressRing.className = 'scroll-progress-ring';
    progressRing.innerHTML = `
        <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="26" fill="none" stroke="#e0e0e0" stroke-width="2"/>
            <circle cx="28" cy="28" r="26" fill="none" stroke="var(--primary-orange)" 
                    stroke-width="2" stroke-linecap="round" 
                    stroke-dasharray="163.36" stroke-dashoffset="163.36"
                    transform="rotate(-90 28 28)" class="progress-circle"/>
        </svg>
    `;
    
    progressRing.style.cssText = `
        position: absolute;
        top: -3px;
        left: -3px;
        width: 56px;
        height: 56px;
        pointer-events: none;
    `;
    
    backToTopBtn.appendChild(progressRing);
    
    // Update progress ring on scroll
    const progressCircle = progressRing.querySelector('.progress-circle');
    const circumference = 163.36;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / documentHeight) * 100;
        
        const offset = circumference - (scrollPercentage / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }, 16));
}

// ===============================
// SECTION: Initialize All Features
// ===============================
// Call additional initialization functions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all additional features
    initializeScrollProgress();
    initializeLazyLoading();
    initializeAccessibility();
    initializeHighContrastMode();
    initializeThemeToggle();
    initializeFormValidation();
    initializeSearch();
    initializePrintFeature();
    enhanceBackToTop();
});

// ===============================
// SECTION: Service Worker Registration
// ===============================
// Register service worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}



// ✅ This prevents dropdown clicks from collapsing the hamburger
document.querySelectorAll('.dropdown-menu a').forEach(link => {
  link.addEventListener('click', e => {
    e.stopPropagation(); // ⛔ Prevents closing hamburger menu
  });
});

