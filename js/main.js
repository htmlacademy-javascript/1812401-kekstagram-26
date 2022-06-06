const getRandomNumber = (firstRangeNumber, lastRangeNumber) => {
  let numberRange = lastRangeNumber - firstRangeNumber;
  if (numberRange < 0) {
    numberRange = -numberRange;
    firstRangeNumber = lastRangeNumber;
  }

  return Math.floor(Math.random() * (numberRange + 1) + firstRangeNumber);
};

const checkCommentLength = (phrase, maxLength) => phrase.length <= maxLength;

// Временный вызов фукций для Lint
getRandomNumber(1, 2);
checkCommentLength('Комментарий', 80);
