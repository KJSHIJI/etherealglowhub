/* Mobile Menu Toggle */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

/* Smooth Scroll for Navbar Links */
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        // Close menu on mobile after click
        navLinks.classList.remove('show');
    });
});

/* Back to Top Button */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Smooth Dropdown Animation */
document.querySelectorAll('.dropdown').forEach(drop => {
    drop.addEventListener('mouseenter', () => {
        const menu = drop.querySelector('.dropdown-menu');
        if (menu) {
            menu.style.opacity = '0';
            menu.style.display = 'block';
            setTimeout(() => {
                menu.style.transition = 'opacity 0.3s ease';
                menu.style.opacity = '1';
            }, 10);
        }
    });
    drop.addEventListener('mouseleave', () => {
        const menu = drop.querySelector('.dropdown-menu');
        if (menu) {
            menu.style.opacity = '0';
            setTimeout(() => {
                menu.style.display = 'none';
            }, 300);
        }
    });
});

/* Fade-in Effect for Sections on Scroll */
const sections = document.querySelectorAll('.content-section, .hero');
const options = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, options);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});