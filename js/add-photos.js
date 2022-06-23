const photosContainerElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content;

const photosFragment = document.createDocumentFragment();

const getPhotoElement = ({url, likes, comments}) => {
  const element = photoTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__likes').textContent = likes;
  element.querySelector('.picture__comments').textContent = comments.length;

  return element;
};

const addPhotos = (photos) => {
  photos.forEach((photo) => {
    const photoElement = getPhotoElement(photo);
    photosFragment.append(photoElement);
  });

  photosContainerElement.append(photosFragment);
};

export {addPhotos};
