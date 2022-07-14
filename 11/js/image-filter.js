import {addPhotos, imageFiltersElement} from './add-photos.js';
import {getRandomPhotos} from './util.js';

const RANDOM_PICTURES_AMOUNT = 10;

const imageFiltersButtonsElement = imageFiltersElement.querySelector('.img-filters__form');
const imageFiltersButtonElements = imageFiltersButtonsElement.querySelectorAll('.img-filters__button');
const defaultFilterElement = imageFiltersButtonsElement.querySelector('#filter-default');
const randomFilterElement = imageFiltersButtonsElement.querySelector('#filter-random');
const discussedFilterElement = imageFiltersButtonsElement.querySelector('#filter-discussed');

const removeImages = () => {
  const photosElements = document.querySelectorAll('.picture');
  photosElements.forEach((element) => element.remove());
};

const onFiltersButtonClick = (photos, evt) => {
  const activeFilterElement = evt.target.classList.contains('img-filters__button--active');

  if (activeFilterElement && !randomFilterElement) {
    return;
  }
  removeImages();
  imageFiltersButtonElements.forEach((element) => element.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
  if (evt.target === defaultFilterElement) {
    addPhotos(photos);
  }
  if (evt.target === randomFilterElement) {
    const randomPhotos = getRandomPhotos(photos, RANDOM_PICTURES_AMOUNT);
    addPhotos(randomPhotos);
  }
  if (evt.target === discussedFilterElement) {
    const discussedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
    addPhotos(discussedPhotos);
  }
};

export {onFiltersButtonClick, imageFiltersButtonsElement};
