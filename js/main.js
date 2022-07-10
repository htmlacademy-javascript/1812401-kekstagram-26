import {getPhotos} from './network.js';
import {addPhotos} from './add-photos.js';
import {showBigPhoto} from './big-photo.js';
import {openImageUploadModal, setUserFormSubmit, closeModal, uploadFileElement} from './form.js';

getPhotos((photos) => {
  const photosElement = document.querySelector('.pictures');

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
  uploadFileElement.addEventListener('change', openImageUploadModal);
});

setUserFormSubmit(closeModal);
