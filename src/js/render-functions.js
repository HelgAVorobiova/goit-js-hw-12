import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderGallery(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-list-item">
          <a href="${largeImageURL}" class="gallery-list-link">
            <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="img-info">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </li>`;
      }
    )
    .join('');
}

export function clearGallery(container) {
  container.innerHTML = '';
}

export function initializeLightbox() {
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}

export function refreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  }
}
