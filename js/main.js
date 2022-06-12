const RANGE_NUMBERS = {
  photoFirst: 1,
  photoLast: 25,
  likeFirst: 15,
  likeLast: 200,
  commentsNumberFirst: 1,
  commentsNumberLast: 5,
  avatarFirst: 1,
  avatarLast: 6,
};

const DESCRIPTION_VALUES = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
  'Описание 4',
  'Описание 5'
];

const MESSEGE_VALUES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENTATOR_NAMES = [
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

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getIntRandomArray = (arrayLength) => {
  const randomArray = [];
  while (randomArray.length < arrayLength) {
    const arrayElement = getRandomNumber(1, arrayLength);
    if (randomArray.some((value) => value === arrayElement) === false) {
      randomArray.push(arrayElement);
    }
  }

  return randomArray;
};

const createPhotoAlbum = () => {
  const commentsIdRandomArray = getIntRandomArray(RANGE_NUMBERS.commentsNumberLast * RANGE_NUMBERS.photoLast);
  const photoAlbum = [];
  let counter = 0;

  const getCommentsMassive = (massiveLength) => {
    const commentsMassive = [];
    for (let comment = 0; comment < massiveLength; comment++) {
      commentsMassive.push({
        id: commentsIdRandomArray[comment + counter],
        avatar: `img/avatar-${getRandomNumber(RANGE_NUMBERS.avatarFirst, RANGE_NUMBERS.avatarLast)}.svg`,
        message: getRandomArrayElement(MESSEGE_VALUES),
        name: getRandomArrayElement(COMMENTATOR_NAMES)
      });
      counter++;
    }

    return commentsMassive;
  };

  for (let card = 0; card < RANGE_NUMBERS.photoLast; card++) {
    const photoCard = {
      id: card + 1,
      url: `photos/${card + 1}.jpg`,
      description: getRandomArrayElement(DESCRIPTION_VALUES),
      likes: getRandomNumber(RANGE_NUMBERS.likeFirst, RANGE_NUMBERS.likeLast),
      comments: getCommentsMassive(getRandomNumber(RANGE_NUMBERS.commentsNumberFirst, RANGE_NUMBERS.commentsNumberLast))
    };

    photoAlbum[card] = photoCard;
  }

  return photoAlbum;
};

const checkCommentLength = (phrase, maxLength) => phrase.length <= maxLength;

// Временный вызов фукций для Lint
getRandomNumber(1, 2);
checkCommentLength('Комментарий', 80);
createPhotoAlbum();
