const bigPhotoElement = document.querySelector('.big-picture');
const bodyElement =  document.querySelector('body');
const commentCountElement = bigPhotoElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPhotoElement.querySelector('.comments-loader');
const commentsElement = bigPhotoElement.querySelector('.social__comments');
const modalCancelElement = bigPhotoElement.querySelector('.big-picture__cancel');
const photosElement = document.querySelector('.pictures');
const imageElement = bigPhotoElement.querySelector('.big-picture__img').querySelector('img');
const likesElement = bigPhotoElement.querySelector('.likes-count');
const commentsCountElement = bigPhotoElement.querySelector('.comments-count');
const captionElement = bigPhotoElement.querySelector('.social__caption');
const commentTemplate = document.querySelector('#comment').content;
const commentsContainerElement = document.querySelector('.social__comments');

// Временное добавление hidden
commentCountElement.classList.add('hidden');
commentsLoaderElement.classList.add('hidden');

const toggleModal = () => {
  bodyElement.classList.toggle('modal-open');
  bigPhotoElement.classList.toggle('hidden');
};

const removeComments = () => (commentsElement.innerHTML = '');

const onModalKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    toggleModal();
  }
};

const closeModal = () => {
  modalCancelElement.addEventListener('click', () => {
    toggleModal();
    document.removeEventListener('keydown', onModalKeydown);
  });
};

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

const showBigPhoto = (photos) => {
  const pictures = document.querySelectorAll('.picture__img');
  const picturesSources = [];
  pictures.forEach((element, index) => (picturesSources[index] = element.src));

  const onPictureClick = (evt) => {
    if (evt.target.matches('.picture__img') || evt.target.matches('.picture')) {
      let index = picturesSources.indexOf(evt.target.src);
      if (evt.target.matches('.picture')) {
        index = picturesSources.indexOf(evt.target.querySelector('.picture__img').src);
      }
      imageElement.src = photos[index].url;
      likesElement.textContent = photos[index].likes;
      commentsCountElement.textContent = photos[index].comments.length;
      captionElement.textContent = photos[index].description;

      removeComments();
      addComments(photos[index].comments);

      toggleModal();
      document.addEventListener('keydown', onModalKeydown, {once: true});
    }
  };

  closeModal();
  photosElement.addEventListener('click', onPictureClick);

};

export {showBigPhoto};
