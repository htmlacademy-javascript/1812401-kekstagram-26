import {getRandomNumber, getRandomElement, getRandomIntegers} from '/util.js';

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

let counter = 0;

const createComments = (items) => {
  const comments = [];
  for (let comment = 0; comment < getRandomNumber(Comment.MIN, Comment.MAX); comment++) {
    comments.push({
      id: items[comment + counter],
      avatar: `img/avatar-${getRandomNumber(Avatar.MIN, Avatar.MAX)}.svg`,
      message: getRandomElement(MESSAGES),
      name: getRandomElement(NAMES)
    });
    counter++;
  }

  return comments;
};

const commentsItems = getRandomIntegers(Comment.MAX * PHOTO_AMOUNT);
let index = 0;

const createPhoto = () => {
  index++;

  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomNumber(Like.MIN, Like.MAX),
    comments: createComments(commentsItems)
  };
};

const createPhotos = () => Array.from({length: PHOTO_AMOUNT}, createPhoto);

export {createPhotos};
