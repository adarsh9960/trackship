document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector(".footer");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add("footer-visible");
            }
        });
    }, { threshold: 0.2 });

    observer.observe(footer);
});
// Check if user has visited before and popup logic
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has submitted the popup form
    const hasSubmitted = localStorage.getItem('trackshipPopupSubmitted');
    
    // Check if user has closed the popup and when
    const popupClosedData = localStorage.getItem('trackshipPopupClosed');
    let hasClosedRecently = false;
    
    if (popupClosedData) {
        const { timestamp } = JSON.parse(popupClosedData);
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        hasClosedRecently = (Date.now() - timestamp) < thirtyDaysInMs;
    }
    
    // Show popup if user hasn't submitted and hasn't closed recently
    if (!hasSubmitted && !hasClosedRecently) {
        setTimeout(() => {
            document.getElementById('popupModal').classList.add('active');
        }, 1000);
    }
});
// Popup Modal Controls
document.getElementById('popupClose').addEventListener('click', function() {
    document.getElementById('popupModal').classList.remove('active');
    
    // Store that user closed the popup with timestamp
    localStorage.setItem('trackshipPopupClosed', JSON.stringify({
        timestamp: Date.now()
    }));
});
document.getElementById('popupModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
        
        // Store that user closed the popup with timestamp
        localStorage.setItem('trackshipPopupClosed', JSON.stringify({
            timestamp: Date.now()
        }));
    }
});
// Mobile panel controls
const hamburger = document.getElementById('hamburger');
const hamburgerIcon = document.getElementById('hamburgerIcon');
const mobilePanel = document.getElementById('mobilePanel');
const closePanel = document.getElementById('closePanel');
const overlay = document.getElementById('overlay');
// Open Mobile Menu
hamburger.addEventListener('click', () => {
    mobilePanel.classList.add('open');
    overlay.style.display = 'block';
    overlay.classList.add('visible');
    hamburger.classList.add('active');
    
    // Prevent body scrolling when panel is open
    document.body.style.overflow = 'hidden';
});
// Close (from cross button)
closePanel.addEventListener('click', () => {
    mobilePanel.classList.remove('open');
    overlay.style.display = 'none';
    overlay.classList.remove('visible');
    hamburger.classList.remove('active');
    
    // Restore body scrolling
    document.body.style.overflow = '';
});
// Click outside overlay closes menu
overlay.addEventListener('click', () => {
    mobilePanel.classList.remove('open');
    overlay.style.display = 'none';
    overlay.classList.remove('visible');
    hamburger.classList.remove('active');
    
    // Restore body scrolling
    document.body.style.overflow = '';
});
// Desktop Services dropdown
const desktopServicesToggle = document.querySelector('.desktop-nav .dropdown-toggle');
const desktopServicesMenu = document.querySelector('.desktop-nav .dropdown-menu');
if (desktopServicesToggle) {
    desktopServicesToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        const isOpen = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isOpen);
        
        if (isOpen) {
            desktopServicesMenu.style.maxHeight = '0px';
        } else {
            desktopServicesMenu.style.maxHeight = desktopServicesMenu.scrollHeight + 'px';
        }
    });
}
hamburger.addEventListener('click', () => {
    mobilePanel.classList.add('open');
    overlay.style.display = 'block';
    overlay.classList.add('visible');
    hamburger.classList.add('active');

    // HIDE HEADER CLOSE BUTTON
    if (headerClose) headerClose.style.display = "none";

    document.body.style.overflow = 'hidden';
});
// ================================
// SERVICES MAIN DROPDOWN
// ================================
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.getElementById('servicesMenu');

dropdownToggle.addEventListener('click', () => {
    const isOpen = dropdownToggle.getAttribute('aria-expanded') === 'true';

    dropdownToggle.setAttribute('aria-expanded', !isOpen);

    dropdownMenu.style.maxHeight = isOpen ? "0px" : dropdownMenu.scrollHeight + "px";

    dropdownToggle.querySelector("i").style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
});
const nestedToggle = document.querySelector('.nested-toggle');
const nestedMenu = document.getElementById('b2bMenu');
nestedToggle.addEventListener('click', () => {
    const isOpen = nestedToggle.getAttribute('aria-expanded') === 'true';

    nestedToggle.setAttribute('aria-expanded', !isOpen);

    nestedMenu.style.maxHeight = isOpen ? "0px" : nestedMenu.scrollHeight + "px";

    nestedToggle.querySelector("i").style.transform = isOpen ? "rotate(0deg)" : "rotate(90deg)";
});
// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            mobilePanel.classList.remove('open');
            overlay.style.display = 'none';
            overlay.classList.remove('visible');
            hamburger.classList.remove('active');
            
            // Restore body scrolling
            document.body.style.overflow = '';
        }
    });
});
// Reveal Animation on Scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
            
            // Service card animation
            if (element.classList.contains('service-card')) {
                element.style.animation = 'fadeUp 0.9s ease forwards';
                element.style.animationDelay = getComputedStyle(element).animationDelay;
            }
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// FAQ Accordion (Independent toggle)
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;

        // Toggle ONLY this FAQ
        faqItem.classList.toggle('active');
    });
});
// Testimonial Slider
const testimonialTrack = document.getElementById('testimonialsTrack');
const navDots = document.querySelectorAll('.nav-dot');
let currentSlide = 0;
const slideWidth = 370; // Width of testimonial card + margin
function goToSlide(slideIndex) {
    if (slideIndex < 0) {
        slideIndex = navDots.length - 1;
    } else if (slideIndex >= navDots.length) {
        slideIndex = 0;
    }
    
    currentSlide = slideIndex;
    testimonialTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    
    // Update nav dots
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}
// Add click event to nav dots
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});
// Auto-rotate testimonials
let testimonialInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
}, 5000);
// Pause auto-rotation on hover
testimonialTrack.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});
testimonialTrack.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
});
// Clone testimonials for infinite scroll
const testimonials = document.querySelectorAll('.testimonial-card');
testimonials.forEach(testimonial => {
    const clone = testimonial.cloneNode(true);
    testimonialTrack.appendChild(clone);
});
// Enable swipe for testimonials
function enableSwipe(slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse Events
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch Events
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}
// Apply swipe to testimonials
enableSwipe(testimonialTrack);
// Partners carousel swipe
const partnersCarousel = document.querySelector('.partners-carousel');
if (partnersCarousel) {
    enableSwipe(partnersCarousel);
}
// Apply swipe to testimonials
enableSwipe(testimonialTrack);
function enableSwipe(slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse Events
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch Events
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// Preloader
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.classList.add("hide");
    }, 300); // slight delay for smooth fade
});
// Text case conversion (Title Case) for sections
function convertToTitleCase() {
    // Get all sections except header, footer, and hero
    const sections = document.querySelectorAll('section:not(.hero-section):not(.main-header):not(.footer)');
    
    sections.forEach(section => {
        // Get all text nodes that are not inside script, style, or other excluded elements
        const walker = document.createTreeWalker(
            section,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Exclude script, style, and other non-content elements
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    
                    // Exclude certain elements
                    if (parent.tagName === 'SCRIPT' || 
                        parent.tagName === 'STYLE' || 
                        parent.tagName === 'NOSCRIPT' ||
                        parent.classList.contains('credit')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    
                    // Exclude text that is just whitespace
                    if (node.textContent.trim() === '') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        let textNode;
        while (textNode = walker.nextNode()) {
            const text = textNode.textContent;
            // Convert to title case
            const titleCaseText = text.replace(/\w\S*/g, (txt) => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            // Only update if there's a change
            if (text !== titleCaseText) {
                textNode.textContent = titleCaseText;
            }
        }
    });
}
// Apply title case conversion after DOM is loaded
document.addEventListener('DOMContentLoaded', convertToTitleCase);
// ======= CITY CARDS SCROLL ANIMATION =======
const cityCards = document.querySelectorAll('.city-card');
const revealCities = () => {
    const trigger = window.innerHeight - 100;
    cityCards.forEach(card => {
        const top = card.getBoundingClientRect().top;
        if (top < trigger) card.classList.add("show");
    });
};
window.addEventListener("scroll", revealCities);
revealCities();
// DESKTOP SERVICES DROPDOWN FIX
const desktopDropdown = document.querySelector('.desktop-nav .dropdown');
const desktopToggle = desktopDropdown.querySelector('.dropdown-toggle');
const desktopMenu = desktopDropdown.querySelector('.dropdown-menu');

desktopToggle.addEventListener('mouseenter', () => {
    desktopMenu.classList.add('show');
});

desktopDropdown.addEventListener('mouseleave', () => {
    desktopMenu.classList.remove('show');
});

// Nested dropdown hover
const nestedDropdown = document.querySelector('.desktop-nav .nested-dropdown');
if (nestedDropdown) {
    const nestedToggle = nestedDropdown.querySelector('.nested-toggle');
    const nestedMenu = nestedDropdown.querySelector('.nested-menu');

    nestedDropdown.addEventListener('mouseenter', () => {
        nestedMenu.classList.add('show');
    });

    nestedDropdown.addEventListener('mouseleave', () => {
        nestedMenu.classList.remove('show');
    });
}
// hero-section
