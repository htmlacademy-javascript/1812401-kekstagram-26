import {addPhotos} from './gallery.js';
import {getRandomPhotos, debounce} from './util.js';

const RANDOM_PICTURES_AMOUNT = 10;
const RERENDER_DELAY = 500;

const imageFiltersElement = document.querySelector('.img-filters');
const filterFormElement = imageFiltersElement.querySelector('.img-filters__form');
const filterButtonElements = Array.from(filterFormElement.querySelectorAll('.img-filters__button'));
const defaultFilterElement = filterFormElement.querySelector('#filter-default');
const randomFilterElement = filterFormElement.querySelector('#filter-random');
const discussedFilterElement = filterFormElement.querySelector('#filter-discussed');

const removeImages = () => {
  const photosElements = document.querySelectorAll('.picture');
  photosElements.forEach((element) => element.remove());
};

const checkFilterTarget = (evt) => {
  const notFilterButton = !evt.target.classList.contains('img-filters__button');
  const activeFilterElement = evt.target.classList.contains('img-filters__button--active');
  const notRandomFilterElement = !(evt.target.id === 'filter-random');

  return notFilterButton || activeFilterElement && notRandomFilterElement;
};

const changeActiveFilterClass = (evt) => {
  const activeFilterElement = filterButtonElements.find((element) => element.classList.contains('img-filters__button--active'));

  activeFilterElement.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const setFilterClick = (photos, cb) => {
  filterFormElement.addEventListener('click', (evt) => {
    if (checkFilterTarget(evt)) {
      return;
    }

    const photosCopy = photos.slice();
    let sortedPhotos;

    removeImages();
    changeActiveFilterClass(evt);
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

    cb(sortedPhotos);
  });
};

const initFilters = (photosCopy) => {
  imageFiltersElement.classList.remove('img-filters--inactive');
  setFilterClick(photosCopy, debounce((photos) => addPhotos(photos), RERENDER_DELAY));
};

export {initFilters};
