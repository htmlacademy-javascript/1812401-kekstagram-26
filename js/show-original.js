const bigPhoto = document.querySelector('.big-picture');

const toggleClasses = () => {
  document.querySelector('body').classList.toggle('modal-open');
  bigPhoto.classList.toggle('hidden');
  bigPhoto.querySelector('.social__comment-count').classList.toggle('hidden');
  bigPhoto.querySelector('.comments-loader').classList.toggle('hidden');
};

const removeComments = () => (bigPhoto.querySelector('.social__comments').innerHTML = '');

const keydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    document.querySelector('body').classList.remove('modal-open');
    bigPhoto.classList.add('hidden');
    bigPhoto.querySelector('.social__comment-count').classList.remove('hidden');
    bigPhoto.querySelector('.comments-loader').classList.remove('hidden');
  }
};

const showBigPhoto = (photos) => {
  const addedPhotos = document.querySelectorAll('.picture');
  const commentElement = bigPhoto.querySelectorAll('.social__comment');
  for (let i = 0; i < addedPhotos.length; i++) {
    addedPhotos[i].addEventListener('click', () => {
      bigPhoto.querySelector('.big-picture__img').querySelector('img').src = photos[i].url;
      bigPhoto.querySelector('.likes-count').textContent = photos[i].likes;
      bigPhoto.querySelector('.comments-count').textContent = photos[i].comments.length;
      bigPhoto.querySelector('.social__caption').textContent = photos[i].description;
      removeComments();
      for (let j = 0; j < photos[i].comments.length; j++) {
        const newCommentElement = commentElement[0].cloneNode(true);
        const index = photos[i].comments[j];
        newCommentElement.querySelector('.social__picture').src = index.avatar;
        newCommentElement.querySelector('.social__picture').alt = index.name;
        newCommentElement.querySelector('.social__text').textContent = index.message;
        bigPhoto.querySelector('.social__comments').append(newCommentElement);
      }
      toggleClasses();
      document.addEventListener('keydown', keydownHandler, {once: true});
    });
    bigPhoto.querySelector('.big-picture__cancel').addEventListener('click', () =>     toggleClasses());
  }
};

export {showBigPhoto};
