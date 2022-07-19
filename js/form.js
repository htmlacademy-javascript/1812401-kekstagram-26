import {initEffect, resetEffect} from './effect.js';
import {validateHashtags} from './hashtags.js';
import {showMessageModal} from './message.js';
import {sendData} from './network.js';
import {initScale, resetScale} from './scale.js';
import {bodyElement, formElement, previewImageElement} from './util.js';

const FILE_TYPES = ['png', 'jpeg', 'jpg'];

const uploadFileElement = formElement.querySelector('#upload-file');
const imageUploadElement = formElement.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = formElement.querySelector('#upload-cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const imageFileChooserElement = formElement.querySelector('.img-upload__input');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

pristine.addValidator(hashtagsInputElement, validateHashtags, 'В хештеге ошибка');

const openModal = () => {
  imageUploadElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  initScale();
  initEffect();

  document.addEventListener('keydown', onModalEscKeydown);
  uploadCancelButtonElement.addEventListener('click', onModalCloseButtonClick);
  formElement.addEventListener('submit', onFormSubmit);
};

const onImageLoadElementClick = () => {
  const file = imageFileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((element) => fileName.endsWith(element));

  if (matches) {
    previewImageElement.src = URL.createObjectURL(file);
    openModal();
  }
};

const initImageLoad = () => uploadFileElement.addEventListener('change', onImageLoadElementClick);

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  imageUploadElement.classList.add('hidden');

  document.removeEventListener('keydown', onModalEscKeydown);
  uploadCancelButtonElement.removeEventListener('click', onModalCloseButtonClick);
  formElement.removeEventListener('submit', onFormSubmit);
  formElement.reset();
  resetScale();
  resetEffect();
};

function onModalEscKeydown (evt) {
  const activeElementClasses = document.activeElement.classList;
  const sendErrorElement = bodyElement.querySelector('.error');

  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (sendErrorElement) {
      sendErrorElement.remove();
      return;
    }
    if (activeElementClasses.contains('text__hashtags') || activeElementClasses.contains('text__description')) {
      return;
    }

    closeModal();
  }
}

function onModalCloseButtonClick () {
  closeModal();
}

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

function onFormSubmit (evt) {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        unblockSubmitButton();
        closeModal();
        showMessageModal('success');
      },
      () => {
        unblockSubmitButton();
        showMessageModal('error');
      },
      new FormData(formElement),
    );
  }
}

export {initImageLoad, hashtagsInputElement, submitButtonElement};
