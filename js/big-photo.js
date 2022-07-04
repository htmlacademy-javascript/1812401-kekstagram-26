const SHOWN_COMMENTS_NUMBER = 5;

const bigPhotoElement = document.querySelector('.big-picture');
const bodyElement =  document.querySelector('body');
const commentCountShownElement = bigPhotoElement.querySelector('.comments-count-shown');
const commentsLoaderElement = bigPhotoElement.querySelector('.comments-loader');
const commentsElement = bigPhotoElement.querySelector('.social__comments');
const modalCancelElement = bigPhotoElement.querySelector('.big-picture__cancel');
const imageElement = bigPhotoElement.querySelector('.big-picture__img').querySelector('img');
const likesElement = bigPhotoElement.querySelector('.likes-count');
const commentsCountElement = bigPhotoElement.querySelector('.comments-count');
const captionElement = bigPhotoElement.querySelector('.social__caption');
const commentTemplate = document.querySelector('#comment').content;
const commentsContainerElement = document.querySelector('.social__comments');

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
  commentsLoaderElement.classList.remove('hidden');
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

const addCommentsList = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = getCommentElement(comment);
    commentsFragment.append(commentElement);
  });

  commentsContainerElement.append(commentsFragment);
};

const addComments = (comments) => {
  let commentsCounter = SHOWN_COMMENTS_NUMBER;
  const defaultComments = comments.slice(0, SHOWN_COMMENTS_NUMBER);

  commentCountShownElement.textContent = defaultComments.length;
  addCommentsList(defaultComments);
  if (comments.length <= SHOWN_COMMENTS_NUMBER) {
    commentsLoaderElement.classList.add('hidden');
    return;
  }

  commentsLoaderElement.addEventListener('click', onShowMoreCommentsButtonClick);

  function onShowMoreCommentsButtonClick () {
    if (commentsCounter >= comments.length) {
      return;
    }
    const commentsItems = comments.slice(commentsCounter, commentsCounter + SHOWN_COMMENTS_NUMBER);
    commentsCounter += commentsItems.length;
    commentCountShownElement.textContent = commentsCounter;
    if (commentsCounter >= comments.length) {
      commentsLoaderElement.classList.add('hidden');
      commentsLoaderElement.removeEventListener('click', onShowMoreCommentsButtonClick);
    }

    addCommentsList(commentsItems);
  }
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
