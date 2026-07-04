// HOME — homepage-only behavior.

// When one archive entry opens, close its siblings within the same
// group. This makes the Work section behave like opening one folder
// at a time in a cabinet, rather than an accordion where everything
// piles up open at once.
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
