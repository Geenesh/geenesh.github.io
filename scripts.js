// ==========================================================================
// KINETIC MINIMALISM - Modern Portfolio Scripts
// ==========================================================================

// Wait for GSAP to load
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, falling back to CSS animations');
        document.body.classList.add('no-gsap');
        initWithoutGSAP();
        return;
    }

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all modules
    initNavigation();
    initAnimations();
    initCarousels();
    initContactForm();
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
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight;
                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// ANIMATIONS
// ==========================================================================

function initAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Hero animations
    const heroTimeline = gsap.timeline({ delay: 0.2 });

    heroTimeline
        .fromTo('.title-line',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        )
        .fromTo('.hero-description',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.4'
        )
        .fromTo('.hero-stats',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.3'
        )
        .fromTo('.hero-actions',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.3'
        )
        .fromTo('.code-window',
            { opacity: 0, scale: 0.95, rotateY: -10 },
            { opacity: 1, scale: 1, rotateY: -5, duration: 0.8, ease: 'power3.out' },
            '-=0.5'
        );

    // Scroll-triggered animations
    // Section labels
    gsap.utils.toArray('.section-label').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: -20 },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Section titles
    gsap.utils.toArray('.section-title, .about-title, .contact-title').forEach(el => {
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

    // About text paragraphs
    gsap.utils.toArray('.about-text').forEach((el, i) => {
        gsap.fromTo(el,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Skill groups
    gsap.utils.toArray('.skill-group').forEach((el, i) => {
        gsap.fromTo(el,
            { opacity: 0, y: 30, scale: 0.98 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // App showcase items
    gsap.utils.toArray('.app-showcase-item').forEach((el, i) => {
        gsap.fromTo(el,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.device-gallery',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Device frames hover parallax
    gsap.utils.toArray('.device-frame').forEach(frame => {
        frame.addEventListener('mouseenter', () => {
            gsap.to(frame, {
                rotateY: 5,
                rotateX: -5,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        frame.addEventListener('mouseleave', () => {
            gsap.to(frame, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // Contact links
    gsap.utils.toArray('.contact-link').forEach((el, i) => {
        gsap.fromTo(el,
            { opacity: 0, x: -20 },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Contact form
    gsap.fromTo('.contact-form-wrapper',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-form-wrapper',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Stats counter animation
    gsap.utils.toArray('.stat-value').forEach(el => {
        const endValue = el.textContent;
        const hasPlus = endValue.includes('+');
        const hasM = endValue.includes('M');
        const numValue = parseInt(endValue.replace(/[^0-9]/g, ''));

        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => {
                gsap.fromTo(el,
                    { opacity: 0, scale: 0.5 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: 'back.out(1.7)'
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
    const items = gallery.querySelectorAll('.app-showcase-item');
    const prevBtn = gallery.querySelector('.gallery-prev');
    const nextBtn = gallery.querySelector('.gallery-next');
    const dots = gallery.querySelectorAll('.gallery-dot');

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
// CLEANUP
// ==========================================================================

window.addEventListener('beforeunload', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
    if (typeof gsap !== 'undefined') {
        gsap.killTweensOf('*');
    }
});
