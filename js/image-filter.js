import {addPhotos, imageFiltersElement} from './add-photos.js';
import {getRandomPhotos} from './util.js';

const RANDOM_PICTURES_AMOUNT = 10;

const filterFormElement = imageFiltersElement.querySelector('.img-filters__form');
const filterButtonElements = filterFormElement.querySelectorAll('.img-filters__button');
const defaultFilterElement = filterFormElement.querySelector('#filter-default');
const randomFilterElement = filterFormElement.querySelector('#filter-random');
const discussedFilterElement = filterFormElement.querySelector('#filter-discussed');

const removeImages = () => {
  const photosElements = document.querySelectorAll('.picture');
  photosElements.forEach((element) => element.remove());
};

const onFiltersButtonClick = (photos, evt) => {
  const activeFilterElement = evt.target.classList.contains('img-filters__button--active');
  const photosCopy = photos.slice();
  let sortedPhotos;

  if (activeFilterElement && !randomFilterElement) {
    return;
  }
  removeImages();
  filterButtonElements.forEach((element) => element.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
  switch (evt.target) {
    case defaultFilterElement:
      sortedPhotos = photos;
      break;
    case randomFilterElement:
      sortedPhotos = getRandomPhotos(photos, RANDOM_PICTURES_AMOUNT);
      break;
    case discussedFilterElement:
      sortedPhotos = photosCopy.sort((a, b) => b.comments.length - a.comments.length);
  }
  addPhotos(sortedPhotos);
};

export {onFiltersButtonClick, filterFormElement};