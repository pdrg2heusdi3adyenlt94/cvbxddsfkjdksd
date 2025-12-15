// Basic interactivity: menu toggle, dark mode, footer year, and Formspree friendly UX.
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const themeToggle = document.getElementById('theme-toggle');
  const yearSpan = document.getElementById('year');

  // Mobile nav
  menuToggle && menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // Theme (light/dark) — simple: toggle data-theme on <html>
  const userPref = localStorage.getItem('theme');
  if (userPref === 'light') document.documentElement.setAttribute('data-theme', 'light');

  themeToggle && themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('theme');
      themeToggle.textContent = '🌙';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '🌞';
    }
  });

  // Footer year
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Contact form: optional nicer UX for Formspree
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      // Let the browser send to the form action (Formspree)
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      // If you want AJAX handling, replace this with fetch to the action URL.
      // A short timeout to re-enable (Formspree will redirect/confirm in most setups).
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      }, 4000);
    });
  }
});
