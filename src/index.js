import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import { ApiPixabay } from './js/apiPixabay';
import Notiflix from 'notiflix';
import { renderImages, clearGallery } from './js/render.js';
const buttonRef = document.querySelector('.load-more');
buttonRef.addEventListener('click', onButtonclick);
const apiPixabay = new ApiPixabay();
const formRef = document.querySelector('#search-form');
formRef.addEventListener('submit', onFormSubmit);
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});
function onFormSubmit(event) {
  event.preventDefault();

  const value = event.target.elements.searchQuery.value.trim();
  if (!value) {
    return Notiflix.Notify.warning('Please, enter your request');
  }
  apiPixabay.setSearchValue(value);
  apiPixabay.resetPage();
  apiPixabay.fetchGallery().then(result => {
    if (!result.data.hits.length) {
      clearGallery();
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    apiPixabay.setTotalHits(result.data.totalHits);
    Notiflix.Notify.success(`Hooray! We found ${apiPixabay.totalHits} images.`);
    if (checkLastPage(apiPixabay)) {
      buttonRef.disabled = true;
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      buttonRef.disabled = false;
    }
    const hits = result.data.hits.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return {
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        };
      }
    );
    clearGallery();
    renderImages(hits);
    lightbox.refresh();
  });
}
function onButtonclick(event) {
  apiPixabay.increasePage();
  apiPixabay.fetchGallery().then(result => {
    if (checkLastPage(apiPixabay)) {
      buttonRef.disabled = true;
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    const hits = result.data.hits.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return {
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        };
      }
    );

    renderImages(hits);
    lightbox.refresh();
  });
}
function checkLastPage(apiPixabay) {
  return apiPixabay.page === Math.ceil(apiPixabay.totalHits / 40);
}
