// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Performance optimization: Reduce motion for users who prefer it
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeScrollEffects();
    initializeFormHandling();
    initializeInteractions();
    initializeProjectModals();
    initializeCarousels();
    // Project showcase removed - using simple cards now
});

// Simplified Animations
function initializeAnimations() {
    if (prefersReducedMotion) {
        // Show all elements immediately for users who prefer reduced motion
        gsap.set(['.title-line', '.hero-subtitle', '.hero-actions', '.code-window'], {
            opacity: 1,
            transform: 'none'
        });
        return;
    }

    // Simple hero entrance animation
    gsap.fromTo(['.title-line', '.hero-subtitle', '.hero-actions'], {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    });

    gsap.fromTo('.code-window', {
        opacity: 0,
        scale: 0.95
    }, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out'
    });

    // Simple scroll-triggered animations
    gsap.utils.toArray('section:not(.hero)').forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Simple stats animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
        gsap.fromTo(stat, {
            opacity: 0,
            scale: 0.8
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Simple project cards animation
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            }
        });
    });

    // Simplified tech items animation
    gsap.utils.toArray('.tech-item').forEach(item => {
        gsap.fromTo(item, {
            opacity: 0,
            y: 15
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%'
            }
        });
    });

    // Simple skill items animation
    gsap.utils.toArray('.skill-item').forEach(item => {
        gsap.fromTo(item, {
            opacity: 0,
            y: 15
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%'
            }
        });
    });

    // Simple contact form animation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        gsap.fromTo(contactForm, {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: contactForm,
                start: 'top 90%'
            }
        });
    }

    // Show code content immediately
    showCodeContent();
}

// Simple code content display
function showCodeContent() {
    const codeContent = document.querySelector('.code-content code');
    if (codeContent) {
        gsap.fromTo(codeContent, {
            opacity: 0
        }, {
            opacity: 1,
            duration: 0.6,
            delay: 0.5
        });
    }
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                gsap.to(spans[0], { rotation: 45, y: 6, duration: 0.3 });
                gsap.to(spans[1], { opacity: 0, duration: 0.3 });
                gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.3 });
            } else {
                gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                gsap.to(spans[1], { opacity: 1, duration: 0.3 });
                gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                gsap.to(spans[1], { opacity: 1, duration: 0.3 });
                gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                gsap.to(window, {
                    scrollTo: targetPosition,
                    duration: 1,
                    ease: 'power2.inOut'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });

    // Navbar background on scroll
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top -50px',
        end: 'bottom bottom',
        onEnter: () => {
            gsap.to(navbar, {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                duration: 0.3
            });
        },
        onLeaveBack: () => {
            gsap.to(navbar, {
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                duration: 0.3
            });
        }
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    ScrollTrigger.batch(sections, {
        onEnter: (elements) => {
            const id = elements[0].getAttribute('id');
            updateActiveNavLink(id);
        },
        onLeave: (elements) => {
            // Handle when leaving sections
        },
        start: 'top 50%',
        end: 'bottom 50%'
    });
}

function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        if (href === activeId) {
            link.style.color = 'var(--color-primary)';
        } else {
            link.style.color = 'var(--color-text-secondary)';
        }
    });
}

// Scroll effects and parallax
function initializeScrollEffects() {
    if (prefersReducedMotion) return;

    // Hero background elements parallax
    gsap.utils.toArray('.bg-element').forEach((element, index) => {
        gsap.to(element, {
            y: -100 * (index + 1),
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // Phone mockup rotation on scroll
    gsap.utils.toArray('.phone-mockup').forEach((phone, index) => {
        ScrollTrigger.create({
            trigger: phone,
            start: 'top 80%',
            end: 'bottom 20%',
            onEnter: () => {
                gsap.to(phone, {
                    rotationY: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
        });
    });

    // Text reveal animations
    gsap.utils.toArray('.section-title, .section-subtitle').forEach(text => {
        gsap.fromTo(text,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: text,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Removed custom cursor for cleaner experience
}

function createCustomCursor() {
    if (window.innerWidth <= 768) return null; // No custom cursor on mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--color-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        opacity: 0;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
        });
    });
    
    document.addEventListener('mouseenter', () => {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
    });
    
    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, { opacity: 0, duration: 0.3 });
    });
    
    return cursor;
}

// Form handling and interactions
function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.btn-text');
        const buttonLoading = submitButton.querySelector('.btn-loading');
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            submitButton.classList.add('btn-loading');
            submitButton.disabled = true;
            
            try {
                // Submit form using fetch to handle response
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                showNotification('Failed to send message. Please try again or email me directly.', 'error');
            } finally {
                // Reset button state
                submitButton.classList.remove('btn-loading');
                submitButton.disabled = false;
            }
        });

        // Simple form validation feedback
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('invalid', () => {
                input.style.borderColor = 'var(--color-danger)';
            });
            
            input.addEventListener('input', () => {
                input.style.borderColor = '';
            });
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-accent)' : 'var(--color-danger)'};
        color: white;
        padding: var(--space-lg);
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        opacity: 0;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Simple show/hide
    notification.style.transform = 'translateX(0)';
    notification.style.opacity = '1';
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    });
}

// Simple interactions
function initializeInteractions() {
    // Basic button interactions handled by CSS

    // Tech item hover effects
    gsap.utils.toArray('.tech-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!prefersReducedMotion) {
                gsap.to(item, {
                    y: -5,
                    boxShadow: 'var(--shadow-lg)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (!prefersReducedMotion) {
                gsap.to(item, {
                    y: 0,
                    boxShadow: 'var(--shadow-sm)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });

    // Simple project card hover effects handled by CSS

    // Scroll to top functionality
    const scrollToTop = createScrollToTopButton();
    
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top -500px',
        end: 'bottom bottom',
        onEnter: () => {
            gsap.to(scrollToTop, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        },
        onLeaveBack: () => {
            gsap.to(scrollToTop, {
                opacity: 0,
                scale: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
        }
    });
}

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        scale: 0;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-lg);
    `;
    
    button.addEventListener('click', () => {
        gsap.to(window, {
            scrollTo: 0,
            duration: 1.5,
            ease: 'power2.inOut'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    document.body.appendChild(button);
    return button;
}

// Performance optimizations
// Throttle scroll events
let scrollTimeout;
function throttleScroll(callback, limit = 16) {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            callback();
            scrollTimeout = null;
        }, limit);
    }
}

// Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Cleanup function for better performance
window.addEventListener('beforeunload', () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf('*');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Graceful degradation - ensure basic functionality works
    if (e.error.message.includes('gsap') || e.error.message.includes('ScrollTrigger')) {
        document.body.classList.add('no-animations');
    }
});

// Project Showcase Interactive Functionality

// Project Modal Functionality - Disabled (buttons removed)
function initializeProjectModals() {
    // Modal functionality disabled since project buttons were removed
    return;
    
    /* Original modal code preserved but disabled
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalGallery = document.getElementById('modalGallery');
    const modalClose = document.getElementById('modalClose');
    const projectButtons = document.querySelectorAll('[data-project]');

    // Project data with images and descriptions
    const projectData = {
        ecocash: {
            title: 'EcoCash',
            description: 'Revolutionary fintech mobile application built with React Native and TypeScript, featuring secure digital payments, financial management tools, and seamless user experience for emerging markets.',
            images: [
                './assets/ecocash-home.PNG',
                './assets/ecocash-transactions.PNG',
                './assets/ecocash-qr.PNG',
                './assets/ecocash-billers.PNG',
                './assets/ecocash-login.PNG',
                './assets/ecocash-pin.PNG',
                './assets/ecocash-splash.PNG',
                './assets/ecocash-overlay.PNG'
            ]
        },
        kridas: {
            title: 'Kridas',
            description: 'Global sports networking platform connecting athletes, coaches, and sports enthusiasts through advanced social features, performance tracking, and professional networking tools.',
            images: [
                './assets/kridas-feed.png',
                './assets/kridas-profile.png',
                './assets/kridas-events.png',
                './assets/kridas-page.png',
                './assets/kridas-products.png',
                './assets/kridas-login.png'
            ]
        },
        zaapi: {
            title: 'Zaapi',
            description: 'Next-generation social commerce platform combining social media features with e-commerce capabilities, built with React Native and modern backend technologies.',
            images: [
                './assets/zaapi.jpeg',
                './assets/zaapi-profile.jpeg',
                './assets/zaapi-filters.jpeg',
                './assets/zaapi-qr.jpeg',
                './assets/zaapi-settings.jpeg',
                './assets/zaapi-splash.jpeg'
            ]
        },
        nammakutira: {
            title: 'Namma Kutira',
            description: 'Comprehensive pet care management platform connecting pet owners with veterinary professionals, featuring health tracking, appointment scheduling, and emergency care services.',
            images: [
                './assets/nammakutira-Dash.png',
                './assets/nammakutira-propdetails.png',
                './assets/nammakutira-cart.png',
                './assets/nammakutira-search.png',
                './assets/nammakutira-login.png',
                './assets/nammakutira-notifications.png',
                './assets/nammakutira-OTP.png',
                './assets/nammakutira-settings.png'
            ]
        },
        isnee: {
            title: 'ISNEE',
            description: 'Advanced motorsport timing and analytics platform built with React Native, providing real-time race data, driver performance metrics, and comprehensive racing statistics.',
            images: [
                './assets/isnee-dash.png',
                './assets/isnee-events.png',
                './assets/isnee-leaderboard.png',
                './assets/isnee-members.png',
                './assets/isnee-profile.png',
                './assets/isnee-reg-1.png',
                './assets/isnee-reg-2.png',
                './assets/isnee-login.png',
                './assets/isnee-filters.png',
                './assets/isnee-document.png'
            ]
        }
    };

    // Add click event listeners to project buttons
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectKey = button.getAttribute('data-project');
            const project = projectData[projectKey];
            
            if (project) {
                openModal(project);
            }
        });
    });

    // Close modal functionality
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function openModal(project) {
        // Set modal content
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        
        // Clear and populate gallery
        modalGallery.innerHTML = '';
        project.images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `${project.title} Screenshot`;
            img.loading = 'lazy';
            modalGallery.appendChild(img);
        });

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animation
        if (!prefersReducedMotion) {
            gsap.fromTo(modalGallery.children, {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.2,
                ease: 'power2.out'
            });
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    */
}

// Project Carousel Functionality
function initializeCarousels() {
    const carousels = document.querySelectorAll('.project-carousel');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const indicators = carousel.querySelectorAll('.indicator');
        
        let currentSlide = 0;
        let autoSlideInterval;
        
        // Initialize carousel
        function initCarousel() {
            showSlide(0);
            startAutoSlide();
        }
        
        // Show specific slide
        function showSlide(index) {
            // Hide all slides
            slides.forEach((slide, i) => {
                slide.classList.remove('active', 'prev');
                if (i < index) {
                    slide.classList.add('prev');
                }
            });
            
            // Show current slide
            if (slides[index]) {
                slides[index].classList.add('active');
                currentSlide = index;
                
                // Update indicators
                indicators.forEach((indicator, i) => {
                    indicator.classList.toggle('active', i === index);
                });
            }
        }
        
        // Next slide
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }
        
        // Previous slide
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }
        
        // Auto slide functionality
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000); // 4 seconds
        }
        
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        }
        
        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }
        
        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });
        
        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide(); // Swipe left - next slide
                } else {
                    prevSlide(); // Swipe right - previous slide
                }
            }
        }
        
        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            }
        });
        
        // Make carousel focusable for keyboard navigation
        carousel.setAttribute('tabindex', '0');
        
        // Initialize the carousel
        initCarousel();
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            stopAutoSlide();
        });
    });
}

// Debug mode for development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.gsapDebug = () => {
        console.log('Active ScrollTriggers:', ScrollTrigger.getAll());
        console.log('Active GSAP tweens:', gsap.getAllTweens());
    };
}