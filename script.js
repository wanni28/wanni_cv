const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const revealItems = document.querySelectorAll('.reveal');
const yearSpan = document.querySelector('.year');

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.14 });

revealItems.forEach((item) => observer.observe(item));

const setActiveLink = () => {
    let current = '';

    sections.forEach((section) => {
        const top = section.offsetTop - 140;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
};

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
