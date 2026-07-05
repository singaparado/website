// SHARED — used by homepage, Studio, and Vault.
// Only truly universal behavior belongs here.

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal
function initReveal(root = document) {
  const revealEls = root.querySelectorAll('.reveal:not(.is-visible)');
  if (!revealEls.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}
initReveal();

// Archive-entry folder behavior — used on any page with .archive-list
// (currently: homepage Work preview, Vault). When one entry opens,
// close its siblings, so it behaves like opening one folder at a
// time in a cabinet rather than an accordion piling everything open.
document.querySelectorAll('.archive-list').forEach(list => {
  const entries = list.querySelectorAll('details.archive-entry');
  entries.forEach(entry => {
    entry.addEventListener('toggle', () => {
      if (entry.open) {
        entries.forEach(other => {
          if (other !== entry) other.open = false;
        });
      }
    });
  });
});
