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

const getHiddenComments = () => {
  const commentsListElement = bigPhotoElement.querySelectorAll('.social__comment');

  if (commentsListElement.length <= SHOWN_COMMENTS_NUMBER) {
    commentsLoaderElement.classList.add('hidden');
    commentCountShownElement.textContent = commentsListElement.length;
    return;
  }

  commentsListElement.forEach((element, index) => {
    if (index >= SHOWN_COMMENTS_NUMBER) {
      element.classList.add('hidden');
      commentCountShownElement.textContent = SHOWN_COMMENTS_NUMBER;
    }
  });
  commentsLoaderElement.addEventListener('click', onShowMoreCommentsButtonClick);
};

const openModal = () => {
  bodyElement.classList.add('modal-open');
  bigPhotoElement.classList.remove('hidden');

  document.addEventListener('keydown', onModalEscKeydown);
  modalCancelElement.addEventListener('click', onModalCloseButtonClick);

  getHiddenComments();
};

const closeModal = () => {
  bodyElement.classList.remove('modal-open');
  bigPhotoElement.classList.add('hidden');

  document.removeEventListener('keydown', onModalEscKeydown);
  modalCancelElement.removeEventListener('click', onModalCloseButtonClick);
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.removeEventListener('click', onShowMoreCommentsButtonClick);
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

function onShowMoreCommentsButtonClick () {
  const hiddenCommentsElements = commentsElement.querySelectorAll('.hidden');
  const hiddenCommentsNumber = hiddenCommentsElements.length;
  const commentsNumber = commentsElement.children.length - hiddenCommentsNumber;
  let hiddenCounter = 0;

  if (SHOWN_COMMENTS_NUMBER <= hiddenCommentsNumber) {
    for (let i = 0; i < SHOWN_COMMENTS_NUMBER; i++) {
      hiddenCommentsElements[i].classList.remove('hidden');
      hiddenCounter++;
    }
    commentCountShownElement.textContent = commentsNumber + hiddenCounter;

    if (commentsElement.children.length === commentsNumber + hiddenCounter) {
      commentsLoaderElement.classList.add('hidden');
    }

    return;
  }

  hiddenCommentsElements.forEach((element) => element.classList.remove('hidden'));
  commentCountShownElement.textContent = commentsElement.children.length;
  commentsLoaderElement.classList.add('hidden');
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
