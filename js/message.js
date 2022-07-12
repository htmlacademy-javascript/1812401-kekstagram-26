import {bodyElement} from './big-photo.js';

const ALERT_SHOW_TIME = 8000;

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-container');
  alertContainer.style.zIndex = '10';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#FA8072';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const onMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape' && bodyElement.querySelector('.success')) {
    evt.preventDefault();
    closeMessageModal();
  }
};

const onCloseButtonClick = () => {
  closeMessageModal();
};

const onMessageOutAreaClick = (evt) => {
  if (evt.target === bodyElement.querySelector('.message-modal')) {
    closeMessageModal();
  }
};

const showMessageModal = (message) => {
  let messageElement;
  if (message === 'success') {
    messageElement = successTemplate.cloneNode(true);
    document.addEventListener('keydown', onMessageEscKeydown);
  } else {
    messageElement = errorTemplate.cloneNode(true);
  }
  document.addEventListener('click', onMessageOutAreaClick);
  messageElement.querySelector('button').addEventListener('click', onCloseButtonClick);

  bodyElement.append(messageElement);
};

function closeMessageModal () {
  const sendSuccessElement = bodyElement.querySelector('.success');
  const sendErrorElement = bodyElement.querySelector('.error');

  if (sendSuccessElement) {
    sendSuccessElement.remove();
  } else {
    sendErrorElement.remove();
  }

  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onMessageOutAreaClick);
}

export {showAlert, showMessageModal};
