// STUDIO — single-page view switching. No page reloads between
// Studio Home, Applied Works, and Foundational Works.
(function () {
  const VIEWS = ['studio-home', 'applied', 'foundational'];
  const TITLES = {
    'studio-home': 'Studio — Mahdi Singaparado',
    'applied': 'Applied Works — Studio — Mahdi Singaparado',
    'foundational': 'Foundational Works — Studio — Mahdi Singaparado'
  };

  function showView(id, push) {
    if (!VIEWS.includes(id)) id = 'studio-home';

    VIEWS.forEach(v => {
      const el = document.getElementById(v);
      if (el) el.classList.toggle('active', v === id);
    });

    document.querySelectorAll('[data-view-link]').forEach(a => {
      a.classList.toggle('is-current', a.getAttribute('data-view-link') === id);
    });

    document.title = TITLES[id];
    window.scrollTo(0, 0);

    if (push) {
      const hash = id === 'studio-home' ? '' : ('#' + id);
      history.pushState({ view: id }, '', '/studio' + hash);
    }

    // Re-run the shared reveal observer for the newly visible section
    if (typeof initReveal === 'function') {
      initReveal(document.getElementById(id));
    }
  }

  document.querySelectorAll('[data-view-link]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      showView(a.getAttribute('data-view-link'), true);
    });
  });

  window.addEventListener('popstate', (e) => {
    const id = (e.state && e.state.view) || (location.hash ? location.hash.slice(1) : 'studio-home');
    showView(id, false);
  });

  const initial = location.hash ? location.hash.slice(1) : 'studio-home';
  showView(initial, false);
})();
