const galleryRef = document.querySelector('.gallery');
export function renderImages(array) {
  const markup = array
    .map(
      el => `<a href="${el.largeImageURL}"><div class="photo-card">
  <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" width = "100" height = "60" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${el.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${el.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${el.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${el.downloads}</b>
    </p>
  </div>
</div></a>`
    )
    .join('');
  galleryRef.insertAdjacentHTML('beforeend', markup);
}
export function clearGallery() {
  galleryRef.innerHTML = '';
}
