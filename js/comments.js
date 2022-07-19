import {bigPhotoElement} from './util.js';

const SHOWN_COMMENTS_AMOUNT = 5;

const commentCountShownElement = bigPhotoElement.querySelector('.comments-count-shown');
const commentsLoaderElement = bigPhotoElement.querySelector('.comments-loader');
const commentsElement = bigPhotoElement.querySelector('.social__comments');
const commentsContainerElement = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content;

const onShowMoreCommentsButtonClick = () => {
  const hiddenCommentsElements = commentsElement.querySelectorAll('.hidden');
  const hiddenCommentsAmount = hiddenCommentsElements.length;
  const commentsAmount = commentsElement.querySelectorAll('.social__comment').length;
  const shownCommentsAmount = commentsAmount - hiddenCommentsAmount;

  if (hiddenCommentsAmount <= SHOWN_COMMENTS_AMOUNT) {
    hiddenCommentsElements.forEach((element) => {
      element.classList.remove('hidden');
    });
    commentCountShownElement.textContent = commentsAmount;
    commentsLoaderElement.classList.add('hidden');
  } else {
    for (let i = 0; i < SHOWN_COMMENTS_AMOUNT; i++) {
      hiddenCommentsElements[i].classList.remove('hidden');
    }
    commentCountShownElement.textContent = shownCommentsAmount + SHOWN_COMMENTS_AMOUNT;
  }
};

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

  comments.forEach((comment, index) => {
    const commentElement = getCommentElement(comment);
    if (index > SHOWN_COMMENTS_AMOUNT - 1) {
      commentElement.querySelector('.social__comment').classList.add('hidden');
    }
    commentsFragment.append(commentElement);
  });

  commentsContainerElement.append(commentsFragment);

  const commentsListElement = commentsElement.querySelectorAll('.social__comment');

  if (commentsListElement.length <= SHOWN_COMMENTS_AMOUNT) {
    commentsLoaderElement.classList.add('hidden');
    commentCountShownElement.textContent = commentsListElement.length;
  } else {
    commentCountShownElement.textContent = SHOWN_COMMENTS_AMOUNT;
    commentsLoaderElement.addEventListener('click', onShowMoreCommentsButtonClick);
  }
};

const resetComments = () => {
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.removeEventListener('click', onShowMoreCommentsButtonClick);
};

export {removeComments, addComments, resetComments};
