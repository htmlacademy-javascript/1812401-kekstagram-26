import {removeComments, addComments, resetComments} from './comments.js';
import {bodyElement, bigPhotoElement} from './util.js';

const modalCancelElement = bigPhotoElement.querySelector('.big-picture__cancel');
const imageElement = bigPhotoElement.querySelector('.big-picture__img').querySelector('img');
const likesElement = bigPhotoElement.querySelector('.likes-count');
const commentsCountElement = bigPhotoElement.querySelector('.comments-count');
const captionElement = bigPhotoElement.querySelector('.social__caption');

const openModal = () => {
  bodyElement.classList.add('modal-open');
  bigPhotoElement.classList.remove('hidden');

  document.addEventListener('keydown', onModalEscKeydown);
  modalCancelElement.addEventListener('click', onModalCloseButtonClick);
};

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  bigPhotoElement.classList.add('hidden');

  document.removeEventListener('keydown', onModalEscKeydown);
  modalCancelElement.removeEventListener('click', onModalCloseButtonClick);
  resetComments();
};

function onModalEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
  }
}

function onModalCloseButtonClick () {
  closeModal();
}

const showBigPhoto = (photo) => {
  imageElement.src = photo.url;
  likesElement.textContent = photo.likes;
  commentsCountElement.textContent = photo.comments.length;
  captionElement.textContent = photo.description;

  removeComments();
  addComments(photo.comments);

  openModal();
};

export {showBigPhoto};
