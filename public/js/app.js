import { loadLayoutContent, loadEntries } from './contentLoader.js';
import { loadEntry } from './entry.js';

// Main application logic

async function init() {
  await loadLayoutContent();  // Load layout content for all pages

  const path = window.location.pathname;
  if (path === '/') {
    await loadEntries();
  } else if (path.startsWith('/entry/')) {
    const id = path.split('/')[2];
    await loadEntry(id);
  }
}

// Run the init function when the page loads
document.addEventListener('DOMContentLoaded', init);
