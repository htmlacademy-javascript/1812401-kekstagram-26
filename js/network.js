import {showAlert, showSendFormMessage} from './message.js';

const dataLoadError = 'Для получения данных оплатите обращение к серверу';

const getPhotos = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail(showAlert(dataLoadError));
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        showSendFormMessage('success');
      } else {
        onFail(showSendFormMessage('notsuccess'));
      }
    })
    .catch(() => {
      onFail(showSendFormMessage('notsuccess'));
    });
};


export {getPhotos, sendData};
