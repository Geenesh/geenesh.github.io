// ==========================================================================
// KINETIC MINIMALISM - Modern Portfolio Scripts
// ==========================================================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize preloader first
    initPreloader();

    // Initialize features that work without GSAP
    initCustomCursor();
    initMagneticButtons();
    initScrollProgress();
    initBackToTop();
    initTiltCards();
    initSplitText();
    initFooterTime();
    initThemeToggle();
    initRippleEffect();
    initInputEnhancements();

    // Check if GSAP loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, falling back to CSS animations');
        document.body.classList.add('no-gsap');
        initWithoutGSAP();
        return;
    }

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    initLenis();

    // Initialize all modules
    initNavigation();
    initAnimations();
    initCarousels();
    initContactForm();
    initTextReveal();
    initParallax();
    initImageReveal();
});

// ==========================================================================
// NAVIGATION
// ==========================================================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.setAttribute('aria-expanded', 'false');

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            document.body.style.overflow = isOpen ? 'hidden' : '';
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

            // Focus first link when menu opens
            if (isOpen && navLinks.length > 0) {
                setTimeout(() => navLinks[0].focus(), 100);
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on escape and return focus to toggle
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }

    // Smooth scroll for anchor links (fallback when Lenis not available)
    if (!window.lenis) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    const offset = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = target.offsetTop - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ==========================================================================
// LENIS SMOOTH SCROLL
// ==========================================================================

function initLenis() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if Lenis is available
    if (typeof Lenis === 'undefined') {
        console.warn('Lenis not loaded');
        return;
    }

    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    // Store lenis instance globally for access in other functions
    window.lenis = lenis;

    // Integrate with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle anchor links with Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbar = document.getElementById('navbar');
                const offset = navbar ? navbar.offsetHeight : 0;

                lenis.scrollTo(target, {
                    offset: -offset,
                    duration: 1.2,
                });
            }
        });
    });

    // Stop Lenis when opening mobile menu
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        const originalClick = navToggle.onclick;
        navToggle.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                lenis.start();
            } else {
                lenis.stop();
            }
        });

        // Resume Lenis when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                lenis.start();
            });
        });
    }
}

// ==========================================================================
// ANIMATIONS
// ==========================================================================

function initAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Refined easing functions
    const easeOutExpo = 'expo.out';
    const easeOutQuart = 'quart.out';

    // Hero animations - Bento Grid with refined orchestration
    const heroTimeline = gsap.timeline({
        delay: 0.1,
        defaults: { ease: easeOutExpo }
    });

    heroTimeline
        .fromTo('.hero-greeting',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6 }
        )
        .fromTo('.hero-name',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            '-=0.4'
        )
        .fromTo('.hero-tagline',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.5'
        )
        .fromTo('.bento-card',
            { opacity: 0, y: 25 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: {
                    amount: 0.4,
                    from: 'start'
                }
            },
            '-=0.4'
        );

    // Scroll-triggered animations with refined timing
    const scrollDefaults = {
        ease: easeOutExpo,
        toggleActions: 'play none none none'
    };

    // Section labels - subtle slide in
    gsap.utils.toArray('.section-label').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: -15 },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: easeOutQuart,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    ...scrollDefaults
                }
            }
        );
    });

    // Section titles - smooth reveal
    gsap.utils.toArray('.section-title, .about-title, .contact-title').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: easeOutExpo,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    ...scrollDefaults
                }
            }
        );
    });

    // About text paragraphs - staggered reveal
    const aboutTexts = gsap.utils.toArray('.about-text');
    if (aboutTexts.length) {
        gsap.fromTo(aboutTexts,
            { opacity: 0, y: 15 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: easeOutQuart,
                scrollTrigger: {
                    trigger: aboutTexts[0],
                    start: 'top 85%',
                    ...scrollDefaults
                }
            }
        );
    }

    // Skill groups - batch animation
    const skillGroups = gsap.utils.toArray('.skill-group');
    if (skillGroups.length) {
        gsap.fromTo(skillGroups,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.06,
                ease: easeOutQuart,
                scrollTrigger: {
                    trigger: skillGroups[0],
                    start: 'top 85%',
                    ...scrollDefaults
                }
            }
        );
    }

    // App showcase items - refined stagger
    const appItems = gsap.utils.toArray('.app-showcase-item');
    if (appItems.length) {
        gsap.fromTo(appItems,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: easeOutExpo,
                scrollTrigger: {
                    trigger: '.device-gallery',
                    start: 'top 82%',
                    ...scrollDefaults
                }
            }
        );
    }

    // Device frames hover parallax - refined timing
    gsap.utils.toArray('.device-frame').forEach(frame => {
        frame.addEventListener('mouseenter', () => {
            gsap.to(frame, {
                rotateY: 3,
                rotateX: -3,
                duration: 0.3,
                ease: easeOutQuart
            });
        });
        frame.addEventListener('mouseleave', () => {
            gsap.to(frame, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.4,
                ease: easeOutExpo
            });
        });
    });

    // Contact links - batch animation
    const contactLinks = gsap.utils.toArray('.contact-link');
    if (contactLinks.length) {
        gsap.fromTo(contactLinks,
            { opacity: 0, x: -15 },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.06,
                ease: easeOutQuart,
                scrollTrigger: {
                    trigger: contactLinks[0],
                    start: 'top 90%',
                    ...scrollDefaults
                }
            }
        );
    }

    // Web project cards - batch animation
    const webCards = gsap.utils.toArray('.web-project-card');
    if (webCards.length) {
        gsap.fromTo(webCards,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: easeOutExpo,
                scrollTrigger: {
                    trigger: '.web-projects-grid',
                    start: 'top 82%',
                    ...scrollDefaults
                }
            }
        );
    }

    // Contact form - smooth reveal
    const contactForm = document.querySelector('.contact-form-wrapper');
    if (contactForm) {
        gsap.fromTo(contactForm,
            { opacity: 0, y: 25 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: easeOutExpo,
                scrollTrigger: {
                    trigger: contactForm,
                    start: 'top 85%',
                    ...scrollDefaults
                }
            }
        );
    }

    // Stats counter animation - refined spring effect
    gsap.utils.toArray('.stat-value').forEach(el => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            onEnter: () => {
                gsap.fromTo(el,
                    { opacity: 0, scale: 0.8, y: 10 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'back.out(1.4)'
                    }
                );
            },
            once: true
        });
    });
}

// ==========================================================================
// APP SHOWCASE - Device Gallery & Screen Carousels
// ==========================================================================

function initCarousels() {
    // Initialize screen carousels inside each device
    initScreenCarousels();
    // Initialize the main gallery navigation
    initGalleryNavigation();
}

function initScreenCarousels() {
    const screenCarousels = document.querySelectorAll('.screen-carousel');

    screenCarousels.forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        const dots = carousel.parentElement.querySelectorAll('.screen-dot');

        let currentIndex = 0;
        let autoplayInterval;
        const autoplayDelay = 3500;

        function showImage(index) {
            if (index >= images.length) index = 0;
            if (index < 0) index = images.length - 1;

            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentIndex = index;
        }

        function nextImage() {
            showImage(currentIndex + 1);
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(nextImage, autoplayDelay);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }

        // Dot click handlers
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showImage(i);
                startAutoplay();
            });
        });

        // Pause on hover
        const deviceFrame = carousel.closest('.device-frame');
        if (deviceFrame) {
            deviceFrame.addEventListener('mouseenter', stopAutoplay);
            deviceFrame.addEventListener('mouseleave', startAutoplay);
        }

        // Start autoplay
        startAutoplay();

        // Pause when not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        });
    });
}

function initGalleryNavigation() {
    const gallery = document.querySelector('.device-gallery');
    if (!gallery) return;

    const track = gallery.querySelector('.gallery-track');
    if (!track) return;

    const items = gallery.querySelectorAll('.app-showcase-item');
    const prevBtn = gallery.querySelector('.gallery-prev');
    const nextBtn = gallery.querySelector('.gallery-next');
    const dots = gallery.querySelectorAll('.gallery-dot');

    if (items.length === 0) return;

    let currentIndex = 0;

    function scrollToItem(index) {
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;

        const item = items[index];
        if (item) {
            const trackRect = track.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();
            const scrollLeft = track.scrollLeft + (itemRect.left - trackRect.left) - (trackRect.width / 2) + (itemRect.width / 2);

            track.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });

            currentIndex = index;
            updateDots();
        }
    }

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Button handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => scrollToItem(currentIndex - 1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => scrollToItem(currentIndex + 1));
    }

    // Dot click handlers
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => scrollToItem(i));
    });

    // Update current index on scroll
    let scrollTimeout;
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const trackRect = track.getBoundingClientRect();
            const trackCenter = trackRect.left + trackRect.width / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            items.forEach((item, i) => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.left + itemRect.width / 2;
                const distance = Math.abs(trackCenter - itemCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = i;
                }
            });

            currentIndex = closestIndex;
            updateDots();
        }, 100);
    }, { passive: true });

    // Keyboard navigation
    gallery.setAttribute('tabindex', '0');
    gallery.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            scrollToItem(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            scrollToItem(currentIndex + 1);
        }
    });
}

// ==========================================================================
// CONTACT FORM
// ==========================================================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Add loading state
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showNotification('Failed to send message. Please try again or email me directly.', 'error');
        } finally {
            submitBtn.classList.remove('btn-loading');
            submitBtn.disabled = false;
        }
    });
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#22c55e' : '#ef4444'};
        color: white;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 400);
    }, 5000);

    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 400);
    });
}

// ==========================================================================
// FALLBACK FOR NO GSAP
// ==========================================================================

function initWithoutGSAP() {
    initNavigation();
    initCarousels();
    initContactForm();

    // Simple scroll-based visibility
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================================================
// CUSTOM CURSOR
// ==========================================================================

function initCustomCursor() {
    // Only on devices with hover capability (desktop)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }

    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorOutline = cursor.querySelector('.cursor-outline');

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth outline follow
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover states for interactive elements
    const hoverElements = document.querySelectorAll('a, button, [role="button"], .bento-card, .tech-icon, .app-showcase-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // Text input state
    const textElements = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
    textElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-text');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-text');
        });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-click');
    });
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-click');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// ==========================================================================
// MAGNETIC BUTTONS
// ==========================================================================

function initMagneticButtons() {
    // Only on devices with hover capability (desktop)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }

    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move the button slightly toward cursor
            const moveX = x * 0.3;
            const moveY = y * 0.3;

            el.style.transform = `translate(${moveX}px, ${moveY}px)`;

            // Move inner content in opposite direction for parallax effect
            const innerElements = el.querySelectorAll('span, i, svg');
            innerElements.forEach(inner => {
                inner.style.transform = `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`;
            });
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
            const innerElements = el.querySelectorAll('span, i, svg');
            innerElements.forEach(inner => {
                inner.style.transform = 'translate(0, 0)';
            });
        });
    });
}


// ==========================================================================
// SCROLL PROGRESS BAR
// ==========================================================================

function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    function updateProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

// ==========================================================================
// BACK TO TOP BUTTON
// ==========================================================================

function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    // Show/hide button based on scroll position
    function toggleButton() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleButton, { passive: true });

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        if (window.lenis) {
            window.lenis.scrollTo(0, { duration: 1.2 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// ==========================================================================
// 3D TILT CARDS
// ==========================================================================

function initTiltCards() {
    // Only on devices with hover capability (desktop)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }

    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });

        // Add transition for smooth reset
        card.style.transition = 'transform 0.3s ease-out';
    });
}

// ==========================================================================
// PRELOADER
// ==========================================================================

function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
        document.body.style.overflow = '';
        if (window.lenis) window.lenis.start();
        return;
    }

    // Prevent scroll while loading
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();

    // Hide preloader after content loads
    const hidePreloader = () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start();
        }, 2000);
    };

    // Use load event or fallback to timeout
    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }

    // Failsafe: always enable scroll after 4 seconds
    setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.style.overflow = '';
        if (window.lenis) window.lenis.start();
    }, 4000);
}

// ==========================================================================
// SPLIT TEXT ANIMATION
// ==========================================================================

function initSplitText() {
    const splitTexts = document.querySelectorAll('.split-text');

    splitTexts.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';

        // Split into characters
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${i * 0.05}s`;
            el.appendChild(span);
        });

        // Trigger animation after preloader
        setTimeout(() => {
            el.classList.add('animated');
        }, 2200);
    });
}

// ==========================================================================
// TEXT REVEAL ON SCROLL
// ==========================================================================

function initTextReveal() {
    if (typeof gsap === 'undefined') return;

    // Animate text reveals on scroll
    gsap.utils.toArray('.text-reveal').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Animate footer headline
    gsap.utils.toArray('.footer-headline span').forEach((el, i) => {
        gsap.fromTo(el,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.footer-cta',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// ==========================================================================
// FOOTER TIME DISPLAY
// ==========================================================================

function initFooterTime() {
    const timeEl = document.getElementById('current-time');
    if (!timeEl) return;

    function updateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        timeEl.textContent = `India ${now.toLocaleTimeString('en-US', options)}`;
    }

    updateTime();
    setInterval(updateTime, 60000); // Update every minute
}

// ==========================================================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ==========================================================================

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Apply initial theme
    if (initialTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Toggle handler
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        if (newTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        localStorage.setItem('theme', newTheme);

        // Update meta theme color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute('content', newTheme === 'light' ? '#f5f5f7' : '#0a0a0f');
        }
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }
        }
    });
}

// ==========================================================================
// BUTTON RIPPLE EFFECT
// ==========================================================================

function initRippleEffect() {
    // Add ripple class to all buttons
    const buttons = document.querySelectorAll('.btn-primary, .nav-cta, .footer-cta-btn');
    buttons.forEach(btn => btn.classList.add('btn-ripple'));

    // Ripple effect handler
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-ripple');
        if (!btn) return;

        // Remove existing ripples
        const existingRipple = btn.querySelector('.ripple');
        if (existingRipple) existingRipple.remove();

        // Create ripple element
        const ripple = document.createElement('span');
        ripple.className = 'ripple';

        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

        btn.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);
    });
}

// ==========================================================================
// INPUT ENHANCEMENTS
// ==========================================================================

function initInputEnhancements() {
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        group.classList.add('input-enhanced');

        const input = group.querySelector('input, textarea');
        if (!input) return;

        // Focus glow effect
        input.addEventListener('focus', () => {
            group.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            group.classList.remove('focused');

            // Validation feedback
            if (input.value.trim()) {
                if (input.type === 'email') {
                    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
                    group.classList.remove('valid', 'invalid');
                    group.classList.add(isValid ? 'valid' : 'invalid');
                    group.classList.add('input-validated');

                    if (!isValid) {
                        group.classList.add('shake');
                        setTimeout(() => group.classList.remove('shake'), 500);
                    }
                } else if (input.required && input.value.trim().length >= 2) {
                    group.classList.add('input-validated', 'valid');
                }
            } else {
                group.classList.remove('input-validated', 'valid', 'invalid');
            }
        });
    });
}

// ==========================================================================
// PARALLAX EFFECTS
// ==========================================================================

function initParallax() {
    if (typeof gsap === 'undefined') return;

    // Parallax for blob elements
    gsap.utils.toArray('.blob').forEach((blob, i) => {
        const speed = 0.5 + (i * 0.2);
        gsap.to(blob, {
            y: () => window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            }
        });
    });

    // Parallax for hero section elements
    const heroElements = document.querySelectorAll('.bento-card');
    heroElements.forEach((el, i) => {
        gsap.to(el, {
            y: 50 + (i * 10),
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // Parallax for section backgrounds
    gsap.utils.toArray('section').forEach(section => {
        const bg = section.querySelector('.parallax-bg');
        if (bg) {
            gsap.to(bg, {
                y: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }
    });
}

// ==========================================================================
// IMAGE REVEAL ON SCROLL
// ==========================================================================

function initImageReveal() {
    if (typeof gsap === 'undefined') return;

    // Apply reveal class to images in device frames and browser screens
    const revealImages = document.querySelectorAll('.device-screen img, .browser-screen img');

    revealImages.forEach(img => {
        const wrapper = img.parentElement;
        wrapper.classList.add('reveal-image');

        ScrollTrigger.create({
            trigger: wrapper,
            start: 'top 85%',
            onEnter: () => wrapper.classList.add('revealed'),
            once: true
        });
    });

    // Reveal for web project cards
    gsap.utils.toArray('.web-project-card').forEach((card, i) => {
        const img = card.querySelector('.browser-screen');
        if (img) {
            gsap.fromTo(img,
                { clipPath: 'inset(0 100% 0 0)' },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
    });
}


// ==========================================================================
// CLEANUP
// ==========================================================================

window.addEventListener('beforeunload', () => {
    // Cleanup Lenis
    if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
    }
    // Cleanup ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
    // Cleanup GSAP
    if (typeof gsap !== 'undefined') {
        gsap.killTweensOf('*');
    }
});
