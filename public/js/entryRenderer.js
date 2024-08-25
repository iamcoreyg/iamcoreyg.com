// Renders an entry element based on the provided entry data
export function createEntryElement(entry) {
  if (!entry || typeof entry !== 'object') {
    console.error('Invalid entry object provided');
    return null;
  }

  const template = document.getElementById('entry-template');
  if (!template) {
    console.error('Entry template not found');
    return null;
  }

  const entryElement = template.content.cloneNode(true);
  const container = document.createElement('div');
  container.appendChild(entryElement);

  try {
    // Get inner HTML and perform find-and-replace
    let html = container.innerHTML;

    html = html.replace('{id}', entry.slug || '#');
    html = html.replace('{coverImage}', entry.content?.cover?.sizes?.medium || '');
    html = html.replace('{title}', entry.title || 'Untitled');
    html = html.replace('{category}', entry.content?.category?.value || 'Uncategorized');
    html = html.replace('{date}', formatDate(entry.created_at));
    html = html.replace('{description}', entry.description || '');

    // Set the modified HTML back to the container
    container.innerHTML = html;

    return container.firstElementChild;
  } catch (error) {
    console.error('Error creating entry element:', error);
    return null;
  }
}

// Helper function to format date
function formatDate(date) {
  if (!date) {
    return 'Date unknown';
  }

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
