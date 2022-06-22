import {createPhotos} from './create-photos.js';

const userPhotos = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content;

const photos = createPhotos();

const userPhotosFragment = document.createDocumentFragment();

photos.forEach(({url, likes, comments}) => {
  const photoItem = photoTemplate.cloneNode(true);
  photoItem.querySelector('.picture__img').src = url;
  photoItem.querySelector('.picture__likes').textContent = likes;
  photoItem.querySelector('.picture__comments').textContent = comments.length;
  userPhotosFragment.append(photoItem);
});

userPhotos.append(userPhotosFragment);
