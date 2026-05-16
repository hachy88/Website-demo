/**
 * Tsudoi Childcare Service - Main Scripts
 * Handles mobile navigation toggle, navbar scroll effects, and scroll-triggered animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
});

/**
 * Initializes mobile navigation and scrolled navbar state
 */
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('open');

            // Update aria attribute for accessibility
            const isExpanded = navToggle.classList.contains('open');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Shrink navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

/**
 * Uses IntersectionObserver to trigger animations when elements scroll into view
 */
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-trigger');

    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Automatically make everything visible if reduced motion is preferred
        scrollElements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before it comes fully into view
        threshold: 0.1
    });

    scrollElements.forEach(el => {
        elementObserver.observe(el);
    });
}
