import cmsService from "./cmsService.js";
import createYouTubeEmbed from '../js/utils/createYouTubeEmbed.js'

export async function loadEntry(id) {
  try {
    const data = await cmsService.getEntry(id);
    const entryContainer = document.querySelector('#app');
    const youtubeUrl = data.entry.content.youtube_embed?.value

    entryContainer.innerHTML = `
      <div class="entry-show">
        <a href="/">← Back to Home</a>
        <hr />
        <h1>${data.entry.metadata.name}</h1>
        ${youtubeUrl ? `<div class="video">${createYouTubeEmbed(youtubeUrl)}</div>` : ''}
        <div>${data.entry.content.content.value}</div>
      </div>
    `;
  } catch (error) {
    console.error('Failed to load entry:', error);
    document.querySelector('#app').innerHTML = '<p>Failed to load entry. Please try again later.</p>';
  }
}
