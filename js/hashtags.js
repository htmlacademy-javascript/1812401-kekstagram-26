import {hashtagsInputElement, submitButtonElement} from './form.js';

const HASHTAG_AMOUNT = 5;
const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const getHashtags = () => hashtagsInputElement.value.toLowerCase().split(' ');

const validateHashtags = () => {
  const hashtagsItems = getHashtags();
  const verifyHashtagAmount = () => hashtagsItems.length > HASHTAG_AMOUNT;
  const searchSameHashtag = () => hashtagsItems.some((tag, index) => hashtagsItems.indexOf(tag) !== index);
  const verifySpaceIsFirst = () => hashtagsItems[0] === '' && hashtagsItems.length > 1;
  const searchHashtagGrammarError = () => hashtagsItems[0] !== '' && hashtagsItems.some((tag) => !RE.test(tag));

  if (verifyHashtagAmount() ||
    searchSameHashtag() ||
    verifySpaceIsFirst() ||
    searchHashtagGrammarError()) {
    submitButtonElement.disabled = true;
    return false;
  }

  submitButtonElement.disabled = false;
  return true;
};

export {validateHashtags};
