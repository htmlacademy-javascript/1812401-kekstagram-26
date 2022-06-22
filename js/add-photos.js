const photosContainerElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content;

const userPhotosFragment = document.createDocumentFragment();

const photoElement = () => photoTemplate.cloneNode(true);

const addPhotos = (photoElements) => {
  photoElements.forEach(({url, likes, comments}) => {
    const element = photoElement();
    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;
    userPhotosFragment.append(element);
  });

  photosContainerElement.append(userPhotosFragment);
};

export {addPhotos};
