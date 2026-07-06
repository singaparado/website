// STUDIO — Refactored view switching with smooth transitions
(function () {
  const VIEWS = ['studio-home', 'applied', 'foundational'];
  const TITLES = {
    'studio-home': 'Studio — Mahdi Singaparado',
    'applied': 'Applied Works — Studio — Mahdi Singaparado',
    'foundational': 'Foundational Works — Studio — Mahdi Singaparado'
  };

  function showView(id, push) {
    if (!VIEWS.includes(id)) id = 'studio-home';

    // Toggle view visibility
    VIEWS.forEach(v => {
      const el = document.getElementById(v);
      if (el) {
        el.classList.toggle('active', v === id);
      }
    });

    // Update tab highlight
    document.querySelectorAll('[data-view-link]').forEach(a => {
      a.classList.toggle('is-current', a.getAttribute('data-view-link') === id);
    });

    // Update page title
    document.title = TITLES[id];
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL history
    if (push) {
      const hash = id === 'studio-home' ? '' : ('#' + id);
      history.pushState({ view: id }, '', '/studio' + hash);
    }

    // Re-run the shared reveal observer for newly visible section
    if (typeof initReveal === 'function') {
      const newActiveView = document.getElementById(id);
      if (newActiveView) {
        initReveal(newActiveView);
      }
    }
  }

  // Attach click handlers to all view navigation links
  document.querySelectorAll('[data-view-link]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = a.getAttribute('data-view-link');
      showView(targetView, true);
    });
  });

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    const id = (e.state && e.state.view) || (location.hash ? location.hash.slice(1) : 'studio-home');
    showView(id, false);
  });

  // Initialize based on URL hash on page load
  const initial = location.hash ? location.hash.slice(1) : 'studio-home';
  showView(initial, false);
})();
