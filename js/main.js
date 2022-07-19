import {showBigPhoto} from './big-photo.js';
import {initFilters} from './filters.js';
import {initImageLoad} from './form.js';
import {addPhotos} from './gallery.js';
import {showAlert} from './message.js';
import {getPhotos} from './network.js';

const initPhotos = (photos) => {
  const photosElement = document.querySelector('.pictures');
  const photosCopy = photos.slice();

  addPhotos(photos);

  const onPictureClick = (evt) => {
    if (evt.target.matches('.picture__img') || evt.target.matches('.picture')) {
      let index = evt.target.dataset.id;
      if (evt.target.matches('.picture')) {
        index = evt.target.querySelector('.picture__img').dataset.id;
      }

      const photo = photos[index];
      showBigPhoto(photo);
    }
  };

  photosElement.addEventListener('click', onPictureClick);
  initImageLoad();
  initFilters(photosCopy);
};

getPhotos(initPhotos, showAlert);
