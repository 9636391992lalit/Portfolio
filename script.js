document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Section Entrance Animation
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTimeline
        .to('.hero-title', { opacity: 1, y: 0, duration: 1, autoAlpha: 1, delay: 0.2 })
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, autoAlpha: 1 }, "-=0.6")
        .to('.social-links a', { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, autoAlpha: 1 }, "-=0.5")
        .to('.btn', { opacity: 1, y: 0, duration: 0.8, autoAlpha: 1 }, "-=0.4");

    // Helper function for scroll-triggered animations
    const animateOnScroll = (element, vars) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%', // Animation starts when the top of the element is 85% down the viewport
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            ...vars, // Override defaults if needed
        });
    };
    
    const staggerOnScroll = (container, elements) => {
        gsap.from(elements, {
            scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.2,
        });
    };

    // 2. Animate Section Titles on Scroll
    gsap.utils.toArray('.section-title').forEach(title => {
        animateOnScroll(title);
    });

    // 3. Staggered animations for items within sections
    staggerOnScroll('.education-container', '.education-item');
    staggerOnScroll('.project-grid', '.project-card');
    staggerOnScroll('.skills-container', '.skill-category');
    staggerOnScroll('.cert-list', '.cert-list li');
    
    // 4. Animate single items
    animateOnScroll('.experience-item');
    animateOnScroll('.contact-info');
});