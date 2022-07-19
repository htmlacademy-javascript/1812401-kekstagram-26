import {formElement, previewImageElement} from './util.js';

const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const scaleValueElement = formElement.querySelector('.scale__control--value');
const scaleDownButtonElement = formElement.querySelector('.scale__control--smaller');
const scaleUpButtonElement = formElement.querySelector('.scale__control--bigger');

const getScaleValue = () => parseInt(scaleValueElement.value, 10);

const onScaleButtonClick = (evt) => {
  const scaleElement = evt.target;
  let scaleValue;
  if (scaleElement.classList.contains('scale__control--smaller')) {
    scaleUpButtonElement.disabled = false;
    scaleValue = getScaleValue() - Scale.STEP;
  } else {
    scaleDownButtonElement.disabled = false;
    scaleValue = getScaleValue() + Scale.STEP;
  }
  if (scaleValue < Scale.MIN || scaleValue > Scale.MAX) {
    scaleElement.disabled = true;
  } else {
    const transformScaleValue = scaleValue / 100;
    scaleElement.disabled = false;
    scaleValueElement.value = `${scaleValue}%`;
    previewImageElement.style.transform = `scale(${transformScaleValue})`;
  }
};

const initScale = () => {
  scaleDownButtonElement.addEventListener('click', onScaleButtonClick);
  scaleUpButtonElement.addEventListener('click', onScaleButtonClick);
};

const resetScale = () => {
  scaleDownButtonElement.removeEventListener('click', onScaleButtonClick);
  scaleUpButtonElement.removeEventListener('click', onScaleButtonClick);
  previewImageElement.removeAttribute('style');
};

export {initScale, resetScale};
