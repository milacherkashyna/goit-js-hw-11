import axios from 'axios';
const key = '34230452-ad0136fe30000e92e06c0596f';
const url = 'https://pixabay.com/api/';
export class ApiPixabay {
  constructor() {
    this.searchValue = '';
    this.page = 1;
    this.totalHits = 0;
  }
  fetchGallery() {
    return axios.get(
      `${url}?key=${key}&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
  }
  setSearchValue(value) {
    this.searchValue = value;
  }
  setTotalHits(value) {
    this.totalHits = value;
  }
  resetTotalHits() {
    this.totalHits = 0;
  }
  increasePage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}

// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.
