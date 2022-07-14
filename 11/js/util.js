const getRandomNumber = (firstRangeNumber, lastRangeNumber) => {
  let numberRange = lastRangeNumber - firstRangeNumber;
  if (numberRange < 0) {
    numberRange = -numberRange;
    firstRangeNumber = lastRangeNumber;
  }

  return Math.floor(Math.random() * (numberRange + 1) + firstRangeNumber);
};

const getRandomElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomIntegers = (items) => {
  const randomItems = [];
  while (randomItems.length < items) {
    const itemsElement = getRandomNumber(1, items);
    if (!randomItems.some((value) => value === itemsElement)) {
      randomItems.push(itemsElement);
    }
  }

  return randomItems;
};

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

const checkCommentLength = (phrase, maxLength) => phrase.length <= maxLength;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomNumber, getRandomElement, getRandomIntegers, getRandomPhotos, debounce};

// Временный вызов фукций для Lint
checkCommentLength('Комментарий', 80);
