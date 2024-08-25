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

  try {
    // Set link URL
    const linkElement = entryElement.querySelector('a');
    if (linkElement && entry.slug) {
      linkElement.href = `/entry/${entry.slug}`;
    }

    // Set background image
    const imageElement = entryElement.querySelector('.entry-image');
    if (imageElement && entry.content?.cover?.sizes?.medium) {
      imageElement.style.background = `url('${entry.content.cover.sizes.medium}') center center`;
      imageElement.style.backgroundSize = 'contain';
    }

    // Set title
    const titleElement = entryElement.querySelector('.entry-title div:first-child');
    if (titleElement) {
      titleElement.textContent = entry.title || 'Untitled';
    }

    // Set category
    const categoryElement = entryElement.querySelector('.label');
    if (categoryElement) {
      categoryElement.textContent = entry.content?.category?.value || 'Uncategorized';
    }

    // Set date and description
    const metaElement = entryElement.querySelector('.text-xs.gray-medium');
    if (metaElement) {
      metaElement.textContent = formatDateAndDescription(entry);
    }

    return entryElement;
  } catch (error) {
    console.error('Error creating entry element:', error);
    return null;
  }
}

// Helper function to format date and add description if available
function formatDateAndDescription(entry) {
  if (!entry.created_at) {
    return 'Date unknown';
  }

  const formattedDate = new Date(entry.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return entry.description
    ? `${formattedDate} — ${entry.description}`
    : formattedDate;
}
