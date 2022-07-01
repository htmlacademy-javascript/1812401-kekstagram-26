const bigPhotoElement = document.querySelector('.big-picture');
const bodyElement =  document.querySelector('body');
const commentCountElement = bigPhotoElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPhotoElement.querySelector('.comments-loader');
const commentsElement = bigPhotoElement.querySelector('.social__comments');
const modalCancelElement = bigPhotoElement.querySelector('.big-picture__cancel');
const imageElement = bigPhotoElement.querySelector('.big-picture__img').querySelector('img');
const likesElement = bigPhotoElement.querySelector('.likes-count');
const commentsCountElement = bigPhotoElement.querySelector('.comments-count');
const captionElement = bigPhotoElement.querySelector('.social__caption');
const commentTemplate = document.querySelector('#comment').content;
const commentsContainerElement = document.querySelector('.social__comments');

// Временное добавление hidden
commentCountElement.classList.add('hidden');
commentsLoaderElement.classList.add('hidden');

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

const removeComments = () => (commentsElement.innerHTML = '');

const getCommentElement = ({avatar, name, message}) => {
  const element = commentTemplate.cloneNode(true);
  element.querySelector('.social__picture').src = avatar;
  element.querySelector('.social__picture').alt = name;
  element.querySelector('.social__text').textContent = message;

  return element;
};

const addComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = getCommentElement(comment);
    commentsFragment.append(commentElement);
  });

  commentsContainerElement.append(commentsFragment);
};

const showBigPhoto = (photo) => {
  imageElement.src = photo.url;
  likesElement.textContent = photo.likes;
  commentsCountElement.textContent = photo.comments.length;
  captionElement.textContent = photo.description;

  removeComments();
  addComments(photo.comments);

  openModal();
};

export {showBigPhoto, bodyElement};
