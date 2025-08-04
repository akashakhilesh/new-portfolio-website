// Portfolio JavaScript - Modern Animated Portfolio with Contact Form
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createParticleSystem();
        this.initIntersectionObserver();
        this.initTypingAnimation();
        this.initProjectFilters();
        this.initCounterAnimations();
        this.hideLoadingScreen();
        this.initSmoothScrolling();
        this.initThemeToggle();
        this.initMobileMenu();
        this.initContactForm();
        this.initSkillAnimations();
        this.initHeaderScrollEffect();
    }

    setupEventListeners() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('load', this.handleLoad.bind(this));
    }

    // Loading Screen
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 2000);
    }

    // Header Scroll Effect
    initHeaderScrollEffect() {
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Fixed Theme Toggle
    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        // Check for saved theme or default to light
        const savedTheme = localStorage.getItem('portfolio-theme');
        const currentTheme = savedTheme || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Set initial icon
        if (themeIcon) {
            themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        }

        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            
            // Update icon
            if (themeIcon) {
                themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            }
            
            // Add visual feedback
            themeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        });
    }

    // Mobile Menu
    initMobileMenu() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const nav = document.getElementById('nav');
        
        if (!mobileToggle || !nav) return;
        
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close mobile menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // Particle System
    createParticleSystem() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Typing Animation
    initTypingAnimation() {
        const typingText = document.getElementById('typing-text');
        const subtitleTyping = document.getElementById('subtitle-typing');
        
        if (typingText) {
            this.typeWriter(typingText, 'Akash K A', 100);
        }
        
        if (subtitleTyping) {
            setTimeout(() => {
                this.typeWriter(subtitleTyping, 'Developer & Analyst', 80);
            }, 1500);
        }
    }

    typeWriter(element, text, speed) {
        element.textContent = '';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Fixed Smooth Scrolling Navigation
    initSmoothScrolling() {
        // Handle all anchor links, including buttons
        const allLinks = document.querySelectorAll('a[href^="#"], button[data-scroll-to]');
        
        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get target from href or data-scroll-to attribute
                let targetId = link.getAttribute('href') || link.getAttribute('data-scroll-to');
                if (!targetId) return;
                
                // Remove # if present
                targetId = targetId.replace('#', '');
                
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    const navLinks = document.querySelectorAll('.nav-link');
                    navLinks.forEach(l => l.classList.remove('active'));
                    
                    // Find and activate corresponding nav link
                    const correspondingNavLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
                    if (correspondingNavLink) {
                        correspondingNavLink.classList.add('active');
                    }
                }
            });
        });

        // Add scroll-to attribute to "View My Work" button
        const viewWorkBtn = document.querySelector('a[href="#projects"]');
        if (viewWorkBtn) {
            viewWorkBtn.setAttribute('data-scroll-to', 'projects');
        }
    }

    // Intersection Observer for scroll animations
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Trigger specific animations based on element type
                    if (entry.target.classList.contains('skill-category')) {
                        this.animateSkillBars(entry.target);
                    }
                    
                    if (entry.target.classList.contains('stat-item')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        const elementsToObserve = [
            '.animate-on-scroll',
            '.project-card',
            '.skill-category',
            '.stat-item',
            '.timeline-item',
            '.reveal-text'
        ];

        elementsToObserve.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                observer.observe(el);
            });
        });
    }

    // Project Filters
    initProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects with animation
                projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    
                    setTimeout(() => {
                        if (filter === 'all' || category === filter) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, 50);
                        } else {
                            card.classList.remove('animate');
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }, index * 100);
                });
            });
        });
    }

    // Counter Animations
    initCounterAnimations() {
        this.counterAnimated = new Set();
    }

    animateCounter(element) {
        const counter = element.querySelector('.counter');
        if (!counter || this.counterAnimated.has(counter)) return;
        
        this.counterAnimated.add(counter);
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Skill Bar Animations
    initSkillAnimations() {
        this.skillsAnimated = new Set();
    }

    animateSkillBars(categoryElement) {
        if (this.skillsAnimated.has(categoryElement)) return;
        
        this.skillsAnimated.add(categoryElement);
        const skillItems = categoryElement.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                const level = item.getAttribute('data-level');
                const progressBar = item.querySelector('.skill-progress');
                
                if (progressBar) {
                    progressBar.style.width = level + '%';
                }
            }, index * 200);
        });
    }

    // Enhanced Contact Form with proper validation and feedback
    initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        const inputs = form.querySelectorAll('.form-control');

        // Floating labels
        inputs.forEach(input => {
            // Set initial state
            this.updateFloatingLabel(input);
            
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                this.updateFloatingLabel(input);
            });

            input.addEventListener('input', () => {
                this.updateFloatingLabel(input);
                this.validateField(input);
            });
        });

        // Form submission with proper validation and feedback
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm(form)) {
                this.handleFormSubmission(form);
            } else {
                this.showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    }

    updateFloatingLabel(input) {
        const hasValue = input.value.trim() !== '';
        const isFocused = document.activeElement === input;
        
        if (hasValue || isFocused) {
            input.parentElement.classList.add('focused');
        } else {
            input.parentElement.classList.remove('focused');
        }
    }

    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        
        // Remove existing error styling
        input.classList.remove('error');
        
        // Validate based on input type
        switch (input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                break;
            case 'text':
            case 'textarea':
                isValid = value.length >= 2;
                break;
            default:
                isValid = value.length > 0;
        }
        
        if (!isValid && value.length > 0) {
            input.classList.add('error');
        }
        
        return isValid;
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('.form-control[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
                input.classList.add('error');
            }
        });
        
        return isValid;
    }

    async handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        const formData = new FormData(form);
        
        try {
            // Show loading state
            this.setSubmitButtonState(submitBtn, 'loading', 'Sending...');
            
            // Simulate API call for demo purposes
            // In production, replace this with actual Web3Forms or backend API call
            await this.simulateFormSubmission(formData);
            
            // Success state
            this.setSubmitButtonState(submitBtn, 'success', 'Message Sent!');
            
            // Show success notification
            this.showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            
            // Reset form after delay
            setTimeout(() => {
                this.resetForm(form, submitBtn, originalText);
            }, 3000);

        } catch (error) {
            console.error('Form submission error:', error);
            
            // Error state
            this.setSubmitButtonState(submitBtn, 'error', 'Failed to Send');
            
            // Show error notification
            this.showNotification('Sorry, there was an error sending your message. Please try again or contact me directly at akashakhilesh087@gmail.com', 'error');
            
            // Reset button after delay
            setTimeout(() => {
                this.setSubmitButtonState(submitBtn, 'normal', originalText);
                submitBtn.disabled = false;
            }, 3000);
        }
    }

    setSubmitButtonState(button, state, text) {
        button.textContent = text;
        button.classList.remove('btn-loading', 'btn-success', 'btn-error');
        
        switch (state) {
            case 'loading':
                button.disabled = true;
                button.classList.add('btn-loading');
                button.style.background = 'var(--color-gray-medium)';
                break;
            case 'success':
                button.disabled = true;
                button.classList.add('btn-success');
                button.style.background = 'var(--color-success)';
                break;
            case 'error':
                button.disabled = true;
                button.classList.add('btn-error');
                button.style.background = 'var(--color-error)';
                break;
            case 'normal':
                button.disabled = false;
                button.style.background = '';
                break;
        }
    }

    resetForm(form, submitBtn, originalText) {
        form.reset();
        this.setSubmitButtonState(submitBtn, 'normal', originalText);
        
        // Remove focused class from form groups
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('focused');
        });
        
        // Remove error classes
        form.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('error');
        });
    }

    // Simulate form submission for demo (replace with actual API call)
    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate 95% success rate for demo
                if (Math.random() > 0.05) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 1500);
        });
    }

    // Notification system
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </div>
                <div class="notification-message">${message}</div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
            margin-bottom: 10px;
        `;

        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
        `;

        const icon = notification.querySelector('.notification-icon');
        icon.style.cssText = `
            font-size: 20px;
            flex-shrink: 0;
        `;

        const messageEl = notification.querySelector('.notification-message');
        messageEl.style.cssText = `
            flex: 1;
            color: var(--color-text);
            font-size: 14px;
            line-height: 1.4;
        `;

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: var(--color-text-secondary);
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s;
        `;

        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.backgroundColor = 'var(--color-secondary)';
        });

        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.backgroundColor = 'transparent';
        });

        // Add animation styles
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .form-control.error {
                    border-color: var(--color-error) !important;
                    box-shadow: 0 0 0 3px rgba(255, 84, 89, 0.1) !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Add to DOM
        document.body.appendChild(notification);

        // Auto remove after 6 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 6000);
    }

    // 3D Hover Effects
    init3DHoverEffects() {
        const cards = document.querySelectorAll('.project-card, .skill-category, .timeline-content');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    // Scroll handling
    handleScroll() {
        this.updateActiveNavLink();
        this.parallaxEffect();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    parallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Resize handling
    handleResize() {
        // Recalculate particle positions if needed
        this.updateParticleSystem();
    }

    updateParticleSystem() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.left = Math.random() * 100 + '%';
        });
    }

    // Load handling
    handleLoad() {
        // Initialize 3D effects after everything is loaded
        setTimeout(() => {
            this.init3DHoverEffects();
        }, 100);
    }

    // Project expand functionality
    initProjectExpand() {
        const expandButtons = document.querySelectorAll('.project-expand');
        
        expandButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const card = button.closest('.project-card');
                this.toggleProjectDetails(card);
            });
        });
    }

    toggleProjectDetails(card) {
        const isExpanded = card.classList.contains('expanded');
        
        if (isExpanded) {
            card.classList.remove('expanded');
            card.style.height = '';
        } else {
            card.classList.add('expanded');
            // Add additional project details here if needed
        }
    }

    // Advanced scroll reveal animations
    initAdvancedScrollAnimations() {
        const timeline = new Map();
        
        // Stagger animations for project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animationDelay = `${index * 0.1}s`;
            }, 100);
        });
    }

    // Utility Functions
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    
    // Add some additional interactive features
    setTimeout(() => {
        portfolio.initAdvancedScrollAnimations();
        portfolio.initProjectExpand();
    }, 1000);
});

// Add some easter eggs for better UX
document.addEventListener('keydown', (e) => {
    // Fun interaction for developers
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 2000);
    }
});

// Performance monitoring
if (typeof PerformanceObserver !== 'undefined') {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'measure') {
                console.log(`${entry.name}: ${entry.duration}ms`);
            }
        }
    });
    perfObserver.observe({ entryTypes: ['measure'] });
}

// Service Worker registration for PWA features (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log('Portfolio loaded successfully! 🚀');
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Portfolio };
}