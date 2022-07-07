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

const checkCommentLength = (phrase, maxLength) => phrase.length <= maxLength;

export {getRandomNumber, getRandomElement, getRandomIntegers};

// Временный вызов фукций для Lint
checkCommentLength('Комментарий', 80);
