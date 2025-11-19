// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        showSection(link.dataset.section);
    });
});

// Section Navigation
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Add active class to the clicked nav link
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize - Show home section on page load
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});

// Handle hash-based navigation (for direct links)
window.addEventListener('hashchange', () => {
    const sectionId = window.location.hash.slice(1) || 'home';
    showSection(sectionId);
});

// Scroll to section function (for CTA buttons)
function scrollToSection(sectionId) {
    showSection(sectionId);
}

// Add scroll animation for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for scroll animation
const cards = document.querySelectorAll('.video-card, .channel-card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Lazy load video iframes
document.addEventListener('DOMContentLoaded', () => {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        // Allow lazy loading of iframes
        iframe.setAttribute('loading', 'lazy');
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
    }
});

// Active link highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionId = section.getAttribute('id');
            const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
            
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Video modal functionality (optional - for future enhancement)
function openVideoModal(videoUrl) {
    // This function can be used to open videos in a modal/lightbox
    console.log('Opening video:', videoUrl);
}

// Add smooth hover effect for better UX
const videoCards = document.querySelectorAll('.video-card');
videoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Performance optimization - Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Scroll calculations happen here
    }, 100);
});

// Analytics tracking (optional - can be enhanced with Google Analytics)
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // Add analytics tracking here if needed
}

// Track section views
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const sectionName = link.dataset.section;
        trackEvent('section_view', { section: sectionName });
    });
});

// Print function for users who want to save sections
function printSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write('<pre>' + section.innerHTML + '</pre>');
        printWindow.document.close();
        printWindow.print();
    }
}

// Prayer Tab Switching Function
function switchPrayerTab(button, tabId) {
    // Get the parent prayer card
    const prayerCard = button.closest('.prayer-card');
    
    // Hide all prayer texts in this card
    const prayerTexts = prayerCard.querySelectorAll('.prayer-text');
    prayerTexts.forEach(text => {
        text.classList.remove('active');
    });
    
    // Remove active class from all buttons in this card
    const buttons = prayerCard.querySelectorAll('.prayer-tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show the selected prayer text
    const selectedText = document.getElementById(tabId);
    if (selectedText) {
        selectedText.classList.add('active');
    }
    
    // Add active class to clicked button
    button.classList.add('active');
}
