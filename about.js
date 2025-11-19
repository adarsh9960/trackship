/* about.js – Reveal animations, scroll detection, parallax, counters, menu toggle */

// =============================
// MOBILE NAV
// =============================
const mobileToggle = document.getElementById("mobileToggle");
const mobileNav = document.getElementById("mobileNav");

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
  });
}

// =============================
// REVEAL ON SCROLL
// =============================
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .scale-reveal"
);

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.85;

  revealElements.forEach((el, index) => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.style.transitionDelay = `${index * 0.06}s`;
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// =============================
// COUNTER ANIMATION
// =============================
const counters = document.querySelectorAll('[data-target]');
let counterStarted = false;

function startCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let current = 0;
    const increment = target / 100;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  });
}

window.addEventListener("scroll", () => {
  const statsSection = document.getElementById("stats");
  if (!statsSection) return;

  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.7 && !counterStarted) {
    counterStarted = true;
    startCounters();
  }
});

// =============================
// PARALLAX EFFECT
// =============================
const parallaxItems = document.querySelectorAll('.parallax-bg');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  parallaxItems.forEach(item => {
    item.style.backgroundPositionY = -(scrolled * 0.2) + 'px';
  });
});

// =============================
// SMOOTH SCROLL FOR NAV LINKS
// =============================
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
      if (!mobileNav.classList.contains('hidden')) {
        mobileNav.classList.add('hidden');
      }
    }
  });
});