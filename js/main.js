const PHOTO_AMOUNT = 25;

const Like = {
  MIN: 15,
  MAX: 200
};

const Comment = {
  MIN: 1,
  MAX: 5
};

const Avatar = {
  MIN: 1,
  MAX: 6
};

const DESCRIPTIONS = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
  'Описание 4',
  'Описание 5'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Имя 1',
  'Имя 2',
  'Имя 3',
  'Имя 4',
  'Имя 5'
];

const getRandomNumber = (firstRangeNumber, lastRangeNumber) => {
  let numberRange = lastRangeNumber - firstRangeNumber;
  if (numberRange < 0) {
    numberRange = -numberRange;
    firstRangeNumber = lastRangeNumber;
  }

  return Math.floor(Math.random() * (numberRange + 1) + firstRangeNumber);
};

const getRandomElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getIntRandomItems = (items) => {
  const randomItems = [];
  while (randomItems.length < items) {
    const itemsElement = getRandomNumber(1, items);
    if (!randomItems.some((value) => value === itemsElement)) {
      randomItems.push(itemsElement);
    }
  }

  return randomItems;
};

const createPhotos = (photosAmount) => {
  const commentsIdRandomArray = getIntRandomItems(Comment.MAX * photosAmount);
  let counter = 0;
  let index = 0;

  const getComments = () => {
    const comments = [];
    for (let comment = 0; comment < getRandomNumber(Comment.MIN, Comment.MAX); comment++) {
      comments.push({
        id: commentsIdRandomArray[comment + counter],
        avatar: `img/avatar-${getRandomNumber(Avatar.MIN, Avatar.MAX)}.svg`,
        message: getRandomElement(MESSAGES),
        name: getRandomElement(NAMES)
      });
      counter++;
    }

    return comments;
  };

  const photo = () => {
    index++;

    return {
      id: index,
      url: `photos/${index}.jpg`,
      description: getRandomElement(DESCRIPTIONS),
      likes: getRandomNumber(Like.MIN, Like.MAX),
      comments: getComments(getRandomNumber(Comment.MIN, Comment.MAX))
    };
  };

  return Array.from({length: photosAmount}, photo);
};

const checkCommentLength = (phrase, maxLength) => phrase.length <= maxLength;

// Временный вызов фукций для Lint
checkCommentLength('Комментарий', 80);
createPhotos(PHOTO_AMOUNT);
