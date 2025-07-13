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
    initializeProjectShowcase();
});

// Hero Animations
function initializeAnimations() {
    if (prefersReducedMotion) {
        // Show all elements immediately for users who prefer reduced motion
        gsap.set(['.title-line', '.hero-subtitle', '.hero-actions', '.code-window'], {
            opacity: 1,
            transform: 'none'
        });
        return;
    }

    // Hero entrance animation
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .to('.title-line', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        })
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-actions', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.3')
        .to('.code-window', {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6');

    // Typing effect for code content
    const codeContent = document.querySelector('.code-content code');
    if (codeContent) {
        const originalText = codeContent.innerHTML;
        codeContent.innerHTML = '';
        
        gsap.delayedCall(1.5, () => {
            typeText(codeContent, originalText, 30);
        });
    }

    // Scroll-triggered animations for sections
    gsap.utils.toArray('section:not(.hero)').forEach((section, index) => {
        gsap.fromTo(section, 
            { 
                opacity: 0, 
                y: 60 
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Animated stats counters
    gsap.utils.toArray('.stat-number').forEach(stat => {
        const finalNumber = stat.textContent;
        const isPlus = finalNumber.includes('+');
        const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(stat, 
                    { textContent: 0 },
                    {
                        textContent: numericValue,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { textContent: 1 },
                        onUpdate: function() {
                            stat.textContent = Math.ceil(this.targets()[0].textContent) + (isPlus ? '+' : '');
                        }
                    }
                );
            }
        });
    });

    // Project showcase animation
    const projectShowcase = document.querySelector('.project-showcase');
    if (projectShowcase) {
        gsap.fromTo(projectShowcase,
            {
                opacity: 0,
                y: 40,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: projectShowcase,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    // Tech items animation
    gsap.utils.toArray('.tech-category').forEach(category => {
        const items = category.querySelectorAll('.tech-item');
        
        gsap.fromTo(items,
            {
                opacity: 0,
                y: 20,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: category,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Skill items hover animations
    gsap.utils.toArray('.skill-item').forEach(item => {
        const icon = item.querySelector('.skill-icon');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.2,
                rotation: 360,
                duration: 0.6,
                ease: 'back.out(1.7)'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // Contact form animations
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formGroups = contactForm.querySelectorAll('.form-group');
        
        gsap.fromTo(formGroups,
            {
                opacity: 0,
                x: -30
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: contactForm,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Typing effect function
function typeText(element, text, speed = 50) {
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.innerHTML = text.slice(0, index + 1);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
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

    // Custom cursor effect for interactive elements
    const cursor = createCustomCursor();
    if (cursor) {
        const interactiveElements = document.querySelectorAll('.btn, .nav-link, .tech-item, .project-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 1.5, duration: 0.3 });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            });
        });
    }
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

        // Form input animations
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            input.addEventListener('blur', () => {
                gsap.to(input, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
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
    
    // Animate in
    gsap.to(notification, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
    });
    
    // Auto remove after 5 seconds
    gsap.delayedCall(5, () => {
        gsap.to(notification, {
            x: '100%',
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                notification.remove();
            }
        });
    });
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        gsap.to(notification, {
            x: '100%',
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                notification.remove();
            }
        });
    });
}

// Interactive microanimations
function initializeInteractions() {
    // Button hover effects
    gsap.utils.toArray('.btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (!prefersReducedMotion) {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (!prefersReducedMotion) {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });

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

    // Project card interactive effects
    gsap.utils.toArray('.project-card').forEach(card => {
        const phoneContainer = card.querySelector('.phone-mockup');
        
        card.addEventListener('mouseenter', () => {
            if (!prefersReducedMotion && phoneContainer) {
                gsap.to(phoneContainer, {
                    rotationY: 0,
                    scale: 1.02,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!prefersReducedMotion && phoneContainer) {
                gsap.to(phoneContainer, {
                    rotationY: -5,
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }
        });
    });

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
function initializeProjectShowcase() {
    const projectNavItems = document.querySelectorAll('.project-nav-item');
    const progressFill = document.querySelector('.progress-fill');
    const progressIndicators = document.querySelectorAll('.indicator');
    
    // Project data
    const projects = [
        {
            title: 'EcoCash Super App',
            subtitle: 'Revolutionary mobile payment platform serving millions across Zimbabwe',
            year: '2023',
            description: 'Architected a comprehensive financial ecosystem combining payments, social features, and service marketplace in a single, seamless experience. Led the complete rebuild from legacy systems to modern React Native architecture.',
            metrics: [
                { number: '5M+', label: 'Active Users' },
                { number: '40%', label: 'Faster Processing' },
                { number: '99.9%', label: 'Uptime' }
            ],
            tech: ['React Native', 'TypeScript', 'Redux Toolkit', 'Firebase', 'Encryption'],
            link: 'ecocash-details.html',
            images: {
                primary: './assets/ecocash-splash.PNG',
                secondary1: './assets/ecocash-home.PNG',
                secondary2: './assets/ecocash-transactions.PNG'
            }
        },
        {
            title: 'Kridas Sports Platform',
            subtitle: 'Global sports networking platform connecting athletes and organizations',
            year: '2023',
            description: 'Built scalable infrastructure handling real-time interactions, media streaming, and complex relationship management. Revolutionized how sports professionals connect and collaborate worldwide.',
            metrics: [
                { number: '10K+', label: 'Athletes Connected' },
                { number: '60%', label: 'Engagement Boost' },
                { number: '24/7', label: 'Live Streaming' }
            ],
            tech: ['React Native', 'TypeScript', 'GraphQL', 'WebSockets', 'Docker'],
            link: 'kridas-details.html',
            images: {
                primary: './assets/kridas-feed.png',
                secondary1: './assets/kridas-login.png',
                secondary2: './assets/kridas-events.png'
            }
        },
        {
            title: 'Zaapi E-commerce Hub',
            subtitle: 'Unified commerce platform integrating multiple social channels',
            year: '2022',
            description: 'Revolutionized how businesses manage customer communications and sales across platforms. Implemented robust queue system with retry logic and real-time sync monitoring.',
            metrics: [
                { number: '300%', label: 'Response Speed' },
                { number: '50%', label: 'Fewer Missed Leads' },
                { number: '15+', label: 'Platform Integrations' }
            ],
            tech: ['React Native', 'TypeScript', 'REST APIs', 'AWS', 'WebRTC'],
            link: 'zaapi-details.html',
            images: {
                primary: './assets/zaapi-profile.jpeg',
                secondary1: './assets/zaapi-splash.jpeg',
                secondary2: './assets/zaapi-qr.jpeg'
            }
        },
        {
            title: 'Namma Kutira',
            subtitle: 'Comprehensive property management solution',
            year: '2024',
            description: 'Digital transformation of traditional rental processes with smart automation and intuitive interfaces. Streamlined landlord-tenant relationships through workflow automation.',
            metrics: [
                { number: '80%', label: 'Less Manual Work' },
                { number: '90%', label: 'Faster Onboarding' },
                { number: '95%', label: 'User Satisfaction' }
            ],
            tech: ['React Native', 'TypeScript', 'Node.js', 'MongoDB', 'Push Notifications'],
            link: 'namma-kutira-details.html',
            images: {
                primary: './assets/ecocash-home.PNG',
                secondary1: './assets/ecocash-login.PNG',
                secondary2: './assets/ecocash-pin.PNG'
            }
        },
        {
            title: 'ISNEE Event Platform',
            subtitle: 'Motorsport event management for competitive racing',
            year: '2024',
            description: 'Built for the high-stakes world of competitive racing. Event-driven architecture with instant updates and offline capabilities ensuring zero downtime during critical events.',
            metrics: [
                { number: '0', label: 'Event Downtime' },
                { number: '100%', label: 'Registration Accuracy' },
                { number: '<2s', label: 'Real-time Updates' }
            ],
            tech: ['React Native', 'TypeScript', 'NestJS', 'PostgreSQL', 'Real-time Sync'],
            link: 'isnee-details.html',
            images: {
                primary: './assets/kridas-events.png',
                secondary1: './assets/kridas-page.png',
                secondary2: './assets/kridas-products.png'
            }
        }
    ];

    let currentProjectIndex = 0;
    let isTransitioning = false;

    // Update project content
    function updateProjectContent(index, animate = true) {
        if (isTransitioning || index === currentProjectIndex) return;
        
        isTransitioning = true;
        const project = projects[index];
        
        // Update navigation active state
        projectNavItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Update progress indicators
        progressIndicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Update progress bar
        const progressWidth = ((index + 1) / projects.length) * 100;
        gsap.to(progressFill, {
            width: `${progressWidth}%`,
            duration: 0.6,
            ease: 'power2.out'
        });

        if (animate && !prefersReducedMotion) {
            // Animate content change
            const tl = gsap.timeline({
                onComplete: () => {
                    isTransitioning = false;
                }
            });

            // Fade out current content
            tl.to(['.project-title', '.project-subtitle', '.project-description'], {
                opacity: 0,
                y: -20,
                duration: 0.3,
                stagger: 0.05
            })
            .to(['.project-metrics', '.project-tech-stack'], {
                opacity: 0,
                scale: 0.9,
                duration: 0.3
            }, '-=0.2')
            .to('.phone-ecosystem', {
                opacity: 0,
                scale: 0.95,
                duration: 0.4
            }, '-=0.3')
            .call(() => {
                // Update content
                updateProjectData(project);
            })
            .to(['.project-title', '.project-subtitle', '.project-description'], {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.05
            })
            .to(['.project-metrics', '.project-tech-stack'], {
                opacity: 1,
                scale: 1,
                duration: 0.4
            }, '-=0.3')
            .to('.phone-ecosystem', {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)'
            }, '-=0.2');
        } else {
            updateProjectData(project);
            isTransitioning = false;
        }
        
        currentProjectIndex = index;
    }

    // Update project data in DOM
    function updateProjectData(project) {
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-subtitle').textContent = project.subtitle;
        document.getElementById('project-year').textContent = project.year;
        document.getElementById('project-description').querySelector('p').textContent = project.description;
        document.getElementById('project-link').href = project.link;
        
        // Update metrics
        project.metrics.forEach((metric, i) => {
            document.getElementById(`metric-${i + 1}`).textContent = metric.number;
            document.getElementById(`metric-${i + 1}-label`).textContent = metric.label;
        });
        
        // Update tech stack
        const techStack = document.getElementById('project-tech');
        techStack.innerHTML = '';
        project.tech.forEach(tech => {
            const techItem = document.createElement('div');
            techItem.className = 'tech-item';
            techItem.textContent = tech;
            techStack.appendChild(techItem);
        });
        
        // Update images
        document.getElementById('primary-screen').src = project.images.primary;
        document.getElementById('secondary-screen-1').src = project.images.secondary1;
        document.getElementById('secondary-screen-2').src = project.images.secondary2;
    }

    // Add event listeners to navigation items
    projectNavItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateProjectContent(index);
        });
    });

    // Add event listeners to progress indicators
    progressIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateProjectContent(index);
        });
    });

    // Auto-advance projects (optional)
    let autoAdvanceInterval;
    
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(() => {
            const nextIndex = (currentProjectIndex + 1) % projects.length;
            updateProjectContent(nextIndex);
        }, 8000); // Change every 8 seconds
    }
    
    function stopAutoAdvance() {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
            autoAdvanceInterval = null;
        }
    }

    // Start auto-advance when section comes into view
    ScrollTrigger.create({
        trigger: '.projects',
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
            if (!prefersReducedMotion) {
                startAutoAdvance();
            }
        },
        onLeave: stopAutoAdvance,
        onEnterBack: () => {
            if (!prefersReducedMotion) {
                startAutoAdvance();
            }
        },
        onLeaveBack: stopAutoAdvance
    });

    // Pause auto-advance on hover
    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        projectsSection.addEventListener('mouseenter', stopAutoAdvance);
        projectsSection.addEventListener('mouseleave', () => {
            if (!prefersReducedMotion) {
                startAutoAdvance();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!document.querySelector('.projects:hover')) return;
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = currentProjectIndex > 0 ? currentProjectIndex - 1 : projects.length - 1;
            updateProjectContent(prevIndex);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentProjectIndex + 1) % projects.length;
            updateProjectContent(nextIndex);
        }
    });

    // Initialize first project
    updateProjectContent(0, false);
}

// Debug mode for development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.gsapDebug = () => {
        console.log('Active ScrollTriggers:', ScrollTrigger.getAll());
        console.log('Active GSAP tweens:', gsap.getAllTweens());
    };
}