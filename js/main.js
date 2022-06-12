const RANGE_NUMBERS = {
  photoFirst: 1,
  photoLast: 25,
  likeFirst: 15,
  likeLast: 200,
  avatarFirst: 1,
  avatarLast: 6,
  commentatorNumber: 1000
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

const getIntNormalArray = (arrayLength) => {
  const intArray = [];

  for (let i = 0; i < arrayLength; i++) {
    intArray[i] = i + 1;
  }

  return intArray;
};

const getIntRandomArray = (arrayLength) => {
  const randomArray = getIntNormalArray(arrayLength);

  for (let i = 0; i < arrayLength; i++) {
    const swap = randomArray[i];
    const randomIndex = getRandomNumber(0, arrayLength - 1);
    randomArray[i] = randomArray[randomIndex];
    randomArray[randomIndex] = swap;
  }

  return randomArray;
};

const createPhotoAlbum = () => {
  const idRandomArray = getIntRandomArray(RANGE_NUMBERS.photoLast);
  const urlRandomArray = getIntRandomArray(RANGE_NUMBERS.photoLast);
  const commentsIdRandomArray = getIntRandomArray(RANGE_NUMBERS.commentatorNumber);
  const photoAlbum = [];

  for (let i = 0; i < RANGE_NUMBERS.photoLast; i++) {
    const photoCard = {
      id: idRandomArray[i],
      url: `photos/${urlRandomArray[i]}.jpg`,
      description: getRandomArrayElement(DESCRIPTION_VALUES),
      likes: getRandomNumber(RANGE_NUMBERS.likeFirst, RANGE_NUMBERS.likeLast),
      comments: {
        id: commentsIdRandomArray[i],
        avatar: `img/avatar-${getRandomNumber(RANGE_NUMBERS.avatarFirst, RANGE_NUMBERS.avatarLast)}.svg`,
        message: getRandomArrayElement(MESSEGE_VALUES),
        name: getRandomArrayElement(COMMENTATOR_NAMES)
      }
    };

    photoAlbum[i] = photoCard;
  }

  return photoAlbum;
};


const checkCommentLength = (phrase, maxLength) => phrase.length <= maxLength;

// Временный вызов фукций для Lint
getRandomNumber(1, 2);
checkCommentLength('Комментарий', 80);
createPhotoAlbum();
