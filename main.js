/**
 * Main JavaScript file for Karada no Atelier Homepage
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initial check in case of page reload halfway down
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // 2. Mobile Nav Toggle
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('nav-mobile');
    const mobileLinks = document.querySelectorAll('.mobile-links a');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if (navMobile.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            // Force scrolled header appearance so close button is visible (dark)
            header.classList.add('scrolled');
        } else {
            document.body.style.overflow = '';
            if (window.scrollY <= 50) {
                header.classList.remove('scrolled');
            }
        }
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Smooth Anchor Scrolling (For any # links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
