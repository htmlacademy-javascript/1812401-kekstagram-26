const Effect = {
  chrome: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    FILTER: 'grayscale'
  },
  sepia: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    FILTER: 'sepia'
  },
  marvin: {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    FILTER: 'invert'
  },
  phobos: {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    FILTER: 'blur'
  },
  heat: {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    FILTER: 'brightness'
  },
};

const formElement = document.querySelector('.img-upload__form');
const effectsListElement =  formElement.querySelector('.effects__list');
const sliderContainerElement = formElement.querySelector('.img-upload__effect-level');
const sliderElement = formElement.querySelector('.effect-level__slider');
const sliderValueElement = formElement.querySelector('.effect-level__value');
const previewImageElement = formElement.querySelector('.img-upload__preview').querySelector('img');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value;
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const onEffectClick = (evt) => {
  previewImageElement.removeAttribute('class');
  if (evt.target.id === 'effect-none') {
    sliderContainerElement.classList.add('hidden');
    previewImageElement.style.filter = 'none';
  } else {
    const effectName = evt.target.id.replace(/effect-/, '');
    const effectStyle = Effect[effectName].FILTER;

    sliderElement.noUiSlider.on('update', () => {
      sliderValueElement.value = sliderElement.noUiSlider.get();
      if (effectName === 'marvin') {
        previewImageElement.style.filter = `${effectStyle}(${sliderValueElement.value}%)`;
      } else if (effectName === 'phobos') {
        previewImageElement.style.filter = `${effectStyle}(${sliderValueElement.value}px)`;
      } else {
        previewImageElement.style.filter = `${effectStyle}(${sliderValueElement.value})`;
      }
    });

    previewImageElement.removeAttribute('class');
    previewImageElement.classList.add(`effects__preview--${effectName}`);
    sliderContainerElement.classList.remove('hidden');
    previewImageElement.style.filter = `${effectStyle}(${Effect[effectName].MAX})`;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: Effect[effectName].MIN,
        max: Effect[effectName].MAX
      },
      start: Effect[effectName].MAX,
      step: Effect[effectName].STEP
    });
  }
};

const changeEffect = () => effectsListElement.addEventListener('change', onEffectClick);

const resetEffects = () => {
  effectsListElement.removeEventListener('change', onEffectClick);
  sliderContainerElement.classList.add('hidden');
  previewImageElement.removeAttribute('class');
};

export {changeEffect, resetEffects};
