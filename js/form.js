import {bodyElement} from './big-photo.js';
import {changeScale} from './scale.js';
import {resetScale} from './scale.js';

const formElement = document.querySelector('.img-upload__form');
const uploadFileElement = formElement.querySelector('#upload-file');
const imageUploadElement = formElement.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = formElement.querySelector('#upload-cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const openImageUploadModal = () => {
  imageUploadElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  changeScale();

  document.addEventListener('keydown', onModalEscKeydown);
  uploadCancelButtonElement.addEventListener('click', onModalCloseButtonClick);
};

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  imageUploadElement.classList.add('hidden');

  document.removeEventListener('keydown', onModalEscKeydown);
  uploadCancelButtonElement.removeEventListener('click', onModalCloseButtonClick);
  formElement.reset();
  resetScale();
};

function onModalEscKeydown (evt) {
  const activElementClasslist = document.activeElement.classList;
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (activElementClasslist.contains('text__hashtags') || activElementClasslist.contains('text__description')) {
      return;
    }

    closeModal();
  }
}

function onModalCloseButtonClick () {
  closeModal();
}

const getHashtags = () => hashtagsInputElement.value.toLowerCase().split(' ');

pristine.addValidator(hashtagsInputElement, () => {
  const hashtagsItems = getHashtags();
  if (hashtagsItems.length > 5) {
    return false;
  }
  if (hashtagsItems.some((tag, index) => hashtagsItems.indexOf(tag) !== index)) {
    return false;
  }
  if (hashtagsItems[0] !== '' && hashtagsItems.some((tag) => !re.test(tag))) {
    return false;
  }
  return true;
}, 'В хештеге ошибка');

formElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

export {openImageUploadModal, uploadFileElement};
