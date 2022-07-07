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
const sliderElement = formElement.querySelector('.effect-level__slider');
const sliderValueElement = formElement.querySelector('.effect-level__value');
const previewImage = formElement.querySelector('.img-upload__preview').querySelector('img');

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
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const changeEffect = () => effectsListElement.addEventListener('change', onEffectIconClick);

function onEffectIconClick (evt) {
  previewImage.removeAttribute('class');
  if (evt.target.id === 'effect-none') {
    sliderElement.classList.add('hidden');
    previewImage.style.filter = 'none';
  } else {
    const effectName = evt.target.id.slice(7);
    const effectStyle = Effect[effectName].FILTER;

    sliderElement.noUiSlider.on('update', () => {
      sliderValueElement.value = sliderElement.noUiSlider.get();
      if (effectName === 'marvin') {
        previewImage.style.filter = `${effectStyle}(${sliderValueElement.value}%)`;
      } else if (effectName === 'phobos') {
        previewImage.style.filter = `${effectStyle}(${sliderValueElement.value}px)`;
      } else {
        previewImage.style.filter = `${effectStyle}(${sliderValueElement.value})`;
      }
    });

    previewImage.removeAttribute('class');
    previewImage.classList.add(`effects__preview--${effectName}`);
    previewImage.style.filter = `${effectStyle}(${Effect[effectName].MAX})`;
    sliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: Effect[effectName].MIN,
        max: Effect[effectName].MAX
      },
      start: Effect[effectName].MAX,
      step: Effect[effectName].STEP
    });
  }
}

const resetEffects = () => {
  effectsListElement.removeEventListener('change', onEffectIconClick);
  sliderElement.classList.add('hidden');
};

export {changeEffect, resetEffects};
