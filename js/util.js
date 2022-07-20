const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const previewImageElement = formElement.querySelector('.img-upload__preview').querySelector('img');
const bigPhotoElement = document.querySelector('.big-picture');

const getRandomNumber = (firstRangeNumber, lastRangeNumber) => {
  let numberRange = lastRangeNumber - firstRangeNumber;
  if (numberRange < 0) {
    numberRange = -numberRange;
    firstRangeNumber = lastRangeNumber;
  }

  return Math.floor(Math.random() * (numberRange + 1) + firstRangeNumber);
};

const getRandomElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomPhotos = (photosArray, length) => {
  const randomPhotos = [];
  while (randomPhotos.length < length) {
    const photo = getRandomElement(photosArray);
    if (!randomPhotos.some((element) => element.id === photo.id)) {
      randomPhotos.push(photo);
    }
  }

  return randomPhotos;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const checkEscapeKeydown = (evt) => evt.key === 'Escape';

export {getRandomPhotos, debounce, checkEscapeKeydown, bodyElement, formElement, previewImageElement, bigPhotoElement};
