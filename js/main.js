import {getPhotos} from './network.js';
import {addPhotos} from './add-photos.js';
import {showBigPhoto} from './big-photo.js';
import {onImageLoadElementClick, setUserFormSubmit, closeModal, uploadFileElement} from './form.js';
import {onFiltersButtonClick, filterFormElement} from './image-filter.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getPhotos((photos) => {
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
  uploadFileElement.addEventListener('change', onImageLoadElementClick);
  filterFormElement.addEventListener('click', debounce((evt) => onFiltersButtonClick(photosCopy, evt), RERENDER_DELAY));
});

setUserFormSubmit(closeModal);
