document.addEventListener('DOMContentLoaded', () => {

    // Ensure Font Awesome icons are loaded before animations
    const ensureIconsLoaded = () => {
        return new Promise((resolve) => {
            // Check if Font Awesome is loaded
            const checkFontAwesome = () => {
                const testIcon = document.createElement('i');
                testIcon.className = 'fas fa-envelope';
                testIcon.style.position = 'absolute';
                testIcon.style.left = '-9999px';
                document.body.appendChild(testIcon);
                
                const computedStyle = window.getComputedStyle(testIcon, ':before');
                const isLoaded = computedStyle.getPropertyValue('content') !== 'none';
                
                document.body.removeChild(testIcon);
                
                if (isLoaded) {
                    resolve();
                } else {
                    setTimeout(checkFontAwesome, 100);
                }
            };
            
            // Also wait a minimum time for icons to load
            setTimeout(() => {
                checkFontAwesome();
            }, 500);
        });
    };

    // Wait for icons to load before starting animations
    ensureIconsLoaded().then(() => {
        initializeAnimations();
    });

    function initializeAnimations() {
        // --- Mobile Navigation Toggle ---
        const menuIcon = document.querySelector('.menu-icon');
        const navLinks = document.querySelector('.nav-links');
        
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
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
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out',
                ...vars,
            });
        };
        
        // Helper function for staggered animations
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
        
        // 4. Animate single items (but NOT contact-info to prevent hiding)
        animateOnScroll('.experience-item');

        // 5. Animate contact items individually with delay to ensure they're visible
        setTimeout(() => {
            gsap.from('.contact-item', {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }, 300);

        // 6. Smooth scroll behavior for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // 7. Add scroll effect to navigation bar
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(28, 31, 36, 0.95)';
            } else {
                header.style.backgroundColor = 'rgba(28, 31, 36, 0.85)';
            }
        });
    }

    // Fallback: Ensure contact section is visible after 2 seconds regardless
    setTimeout(() => {
        const contactInfo = document.querySelector('.contact-info');
        const contactItems = document.querySelectorAll('.contact-item');
        
        if (contactInfo) {
            contactInfo.style.opacity = '1';
            contactInfo.style.visibility = 'visible';
        }
        
        contactItems.forEach(item => {
            item.style.opacity = '1';
            item.style.visibility = 'visible';
        });
    }, 2000);

});