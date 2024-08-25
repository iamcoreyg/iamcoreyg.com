// Responsible for rendering entry elements

export function createEntryElement(entry) {
  const template = document.getElementById('entry-template');
  const entryElement = template.content.cloneNode(true);

  const link = entryElement.querySelector('a');
  link.href = `/entry/${entry.slug}`;

  const image = entryElement.querySelector('.entry-image');
  image.style.background = `url('${entry.content.cover.sizes.medium}') center center`;
  image.style.backgroundSize = 'contain';

  entryElement.querySelector('.entry-title div:first-child').textContent = entry.title;
  entryElement.querySelector('.label').textContent = entry.content.category.value;

  const dateElement = entryElement.querySelector('.text-xs.gray-medium');
  const date = new Date(entry.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  dateElement.textContent = date;

  if (entry.description) {
    dateElement.textContent += ` — ${entry.description}`;
  }

  return entryElement;
}
