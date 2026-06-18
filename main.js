document.addEventListener('DOMContentLoaded', () => {
    
    // --- Device Selection Overlay Logic ---
    const deviceOverlay = document.getElementById('device-overlay');
    const deviceCards = document.querySelectorAll('.device-card');
    const continueBtn = document.getElementById('device-continue');

    // Handle device card selection
    deviceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all
            deviceCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked
            card.classList.add('active');
            // Enable continue button
            continueBtn.removeAttribute('disabled');
            continueBtn.classList.remove('disabled');
        });
    });

    // Handle continue button click
    continueBtn.addEventListener('click', () => {
        if (!continueBtn.hasAttribute('disabled')) {
            // Fade out the overlay
            deviceOverlay.classList.add('hide');
            // Re-enable scrolling on the body
            document.body.classList.remove('no-scroll');
            
            // Wait for transition to finish then remove from DOM
            setTimeout(() => {
                deviceOverlay.style.display = 'none';
            }, 600); // Matches CSS transition time
        }
    });

    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const mobileIcon = document.querySelector('.mobile-menu-toggle i');

    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('menu-open');
        
        if (navLinks.classList.contains('active')) {
            mobileIcon.classList.remove('fa-bars');
            mobileIcon.classList.add('fa-times');
        } else {
            mobileIcon.classList.remove('fa-times');
            mobileIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('menu-open');
                mobileIcon.classList.remove('fa-times');
                mobileIcon.classList.add('fa-bars');
            }
        });
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const animationElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animationElements.forEach(el => {
        scrollObserver.observe(el);
    });

});
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}