import {formElement, previewImageElement} from './util.js';

const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const scaleButtonsContainerElement = formElement.querySelector('.scale');
const scaleValueElement = formElement.querySelector('.scale__control--value');
const scaleDownButtonElement = formElement.querySelector('.scale__control--smaller');
const scaleUpButtonElement = formElement.querySelector('.scale__control--bigger');

const getScaleValue = () => parseInt(scaleValueElement.value, 10);

const checkScaleTarget = (element) => element.classList.contains('scale__control--value') || element.classList.contains('scale');

const onScaleButtonClick = (evt) => {
  const scaleElement = evt.target;

  if (checkScaleTarget(scaleElement)) {
    return;
  }

  const scaleValue = (scaleElement.classList.contains('scale__control--smaller')) ? getScaleValue() - Scale.STEP : getScaleValue() + Scale.STEP;

  if (scaleValue < Scale.MIN || scaleValue > Scale.MAX) {
    scaleElement.disabled = true;
  } else {
    const transformScaleValue = scaleValue / 100;
    scaleValueElement.value = `${scaleValue}%`;
    previewImageElement.style.transform = `scale(${transformScaleValue})`;
  }

  scaleUpButtonElement.disabled = false;
  scaleDownButtonElement.disabled = false;
};

const initScale = () => scaleButtonsContainerElement.addEventListener('click', onScaleButtonClick);

const resetScale = () => {
  scaleButtonsContainerElement.removeEventListener('click', onScaleButtonClick);
  previewImageElement.removeAttribute('style');
};

export {initScale, resetScale};
