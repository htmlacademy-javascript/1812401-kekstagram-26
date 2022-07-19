import {hashtagsInputElement, submitButtonElement} from './form.js';

const HASHTAG_AMOUNT = 5;
const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const getHashtags = () => hashtagsInputElement.value.toLowerCase().split(' ');

const verifyHashtagAmount = (hashtags) => hashtags.length > HASHTAG_AMOUNT;
const searchSameHashtag = (hashtags) => hashtags.some((tag, index) => hashtags.indexOf(tag) !== index);
const verifySpaceIsFirst = (hashtags) => hashtags[0] === '' && hashtags.length > 1;
const searchHashtagGrammarError = (hashtags) => hashtags[0] !== '' && hashtags.some((tag) => !RE.test(tag));

const validateHashtags = () => {
  const hashtagsItems = getHashtags();

  const isInvalid = verifyHashtagAmount(hashtagsItems) ||
    searchSameHashtag(hashtagsItems) ||
    verifySpaceIsFirst(hashtagsItems) ||
    searchHashtagGrammarError(hashtagsItems);

  submitButtonElement.disabled = isInvalid;

  return !isInvalid;
};

export {validateHashtags};
