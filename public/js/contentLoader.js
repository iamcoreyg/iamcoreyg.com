import cmsService from './cmsService.js';
import { createEntryElement } from './entryRenderer.js';

// Responsible for loading and rendering content

const LAYOUT_CONTENT_IDS = ['bio', 'links'];

export async function loadLayoutContent() {
  try {
    const layoutContent = await Promise.all(
      LAYOUT_CONTENT_IDS.map(id => cmsService.getEntry(id))
    );

    layoutContent.forEach(content => {
      const element = document.querySelector(`[data-cycle="${content.entry.slug}"]`);
      if (element) {
        element.innerHTML = content.entry.content.content.value;
      } else {
        console.warn(`Element with data-cycle="${content.entry.slug}" not found`);
      }
    });
  } catch (error) {
    console.error('Failed to load layout content:', error);
  }
}

export async function loadEntries() {
  try {
    const data = await cmsService.getGroups();
    const entries = data.groups['main-entries'][0].entries;
    const entriesContainer = document.querySelector('#app');

    entriesContainer.innerHTML = '<div class="entries"></div>';
    const entriesElement = entriesContainer.querySelector('.entries');

    entries.forEach(entry => {
      const entryElement = createEntryElement(entry);
      entriesElement.appendChild(entryElement);
    });
  } catch (error) {
    console.error('Failed to load entries:', error);
    document.querySelector('#app').innerHTML = '<p>Failed to load entries. Please try again later.</p>';
  }
}
