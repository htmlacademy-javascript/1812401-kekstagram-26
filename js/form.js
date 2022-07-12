import {bodyElement} from './big-photo.js';
import {changeScale, resetScale} from './scale.js';
import {changeEffect, resetEffects} from './effect.js';
import {sendData} from './network.js';

const HASHTAG_AMOUNT = 5;

const formElement = document.querySelector('.img-upload__form');
const uploadFileElement = formElement.querySelector('#upload-file');
const imageUploadElement = formElement.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = formElement.querySelector('#upload-cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const onImageLoadElementClick = () => {
  imageUploadElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  changeScale();
  changeEffect();

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
  resetEffects();
};

function onModalEscKeydown (evt) {
  const activElementClasslist = document.activeElement.classList;
  const sendErrorElement = bodyElement.querySelector('.error');

  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (sendErrorElement) {
      sendErrorElement.remove();
      return;
    }
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
  const verifyHashtagAmount = () => hashtagsItems.length > HASHTAG_AMOUNT;
  const searchSameHashtag = () => hashtagsItems.some((tag, index) => hashtagsItems.indexOf(tag) !== index);
  const verifySpaceIsFirst = () => hashtagsItems[0] === '' && hashtagsItems.length > 1;
  const searchHashtagGrammarError = () => hashtagsItems[0] !== '' && hashtagsItems.some((tag) => !re.test(tag));

  if (verifyHashtagAmount() ||
    searchSameHashtag() ||
    verifySpaceIsFirst() ||
    searchHashtagGrammarError()) {
    submitButtonElement.disabled = true;
    return false;
  }

  submitButtonElement.disabled = false;
  return true;
}, 'В хештеге ошибка');

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          unblockSubmitButton();
        },
        new FormData(formElement),
      );
    }
  });
};

export {onImageLoadElementClick, setUserFormSubmit, closeModal, uploadFileElement, formElement};
