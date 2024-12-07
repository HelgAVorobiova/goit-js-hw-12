import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  initializeLightbox,
  refreshLightbox,
  clearGallery,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
const per_page = 15;

initializeLightbox();

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = form.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery(gallery);
  loadBtn.style.display = 'none';
  await fetchImagesWithLoader(currentQuery, currentPage);
});

loadBtn.addEventListener('click', async () => {
  await fetchImagesWithLoader(currentQuery, currentPage);
  smoothScroll(); 
});

async function fetchImagesWithLoader(query, page) {
  showLoader();

  try {
    const data = await fetchImages(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query.',
      });
      clearInput();
      return;
    }

    totalHits = data.totalHits;

    const markup = renderGallery(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    refreshLightbox();
    clearInput();

    if (currentPage * per_page >= totalHits) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadBtn.style.display = 'none';
    } else {
      loadBtn.style.display = 'flex';
    }

    currentPage += 1;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again!',
    });
    console.error('Error:', error);
  } finally {
    hideLoader();
  }
}

function showLoader() {
  loader.style.display = 'flex';
}

function hideLoader() {
  loader.style.display = 'none';
}

function clearInput() {
  form.elements.searchQuery.value = '';
}

function smoothScroll() {
  const cardHeight =
    gallery.firstElementChild?.getBoundingClientRect().height || 0;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
