import {showAlert, showSendFormMessage} from './message.js';

const DATA_LOAD_ERROR = 'Для получения данных оплатите обращение к серверу';
const KEKSTAGRAM_SERVER = 'https://26.javascript.pages.academy/kekstagram';

const getPhotos = (onSuccess, onFail) => {
  fetch(`${KEKSTAGRAM_SERVER}/data`)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail(showAlert(DATA_LOAD_ERROR));
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    KEKSTAGRAM_SERVER,
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
