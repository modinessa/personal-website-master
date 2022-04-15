import { validate } from './email-validator.js';
import { unable, disable } from './ubable-disable.js';
import * as constants from './constants.js';

export function submit(button, userEmail, joinSection) {
  const isSubscribed = localStorage.getItem('isSubscribed') === 'true';
  const submitForm = joinSection.querySelector('.app-section--form-join-us');
  const url = isSubscribed ? 'http://localhost:3000/unsubscribe' : 'http://localhost:3000/subscribe';

  if (validate(userEmail.value)) {
    subscribeHandler(url, userEmail, isSubscribed, submitForm, button, joinSection);
  } else {
    alert('Enter correct email adress, please!');
  }
}

function handlerErrors(response, button) {
  if (!response.ok) {
    unable(button);
    return response.json().then(errorJson => {
      throw new Error(errorJson.error);
    });
  }
  return response.json();
}

function succeed(userEmail, isSubscribed, submitForm, button, joinSection) {
  if (isSubscribed) {
    alert('You are unsubscribed! We will miss you! :(');
    unsubUpdateUI(submitForm, userEmail, button, isSubscribed, joinSection);
  } else {
    alert('You are subscribed! Happy to see you! :)');
    subUpdateUI(submitForm, userEmail, button, isSubscribed, joinSection);
  }
}

function subscribeHandler(url, userEmail, isSubscribed, submitForm, button, joinSection) {
  disable(button);
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email: `${userEmail.value}`,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => handlerErrors(response, button))
    .then(() => {
      succeed(userEmail, isSubscribed, submitForm, button, joinSection);
      unable(button);
    })
    .catch((error) => alert((error)));
}

function unsubUpdateUI(submitForm, userEmail, button, isSubscribed, joinSection) {
  userEmail.classList.remove(constants.HIDDEN);
  submitForm.classList.remove(constants.UNSUBSCRIBE_BTN);
  button.target.textContent = constants.SUBSCRIBE_BTN;
  userEmail.value = '';
  localStorage.removeItem('userEmail');
  unable(button);
  localStorage.setItem('page_html', joinSection.innerHTML);
  isSubscribed = false;
  localStorage.setItem('isSubscribed', isSubscribed);
}

function subUpdateUI(submitForm, userEmail, button, isSubscribed, joinSection) {
  userEmail.classList.add(constants.HIDDEN);
  button.target.textContent = constants.UNSUBSCRIBE_BTN;
  submitForm.classList.add(constants.UNSUBSCRIBE_BTN);
  unable(button);
  localStorage.setItem('page_html', joinSection.innerHTML);
  isSubscribed = true;
  localStorage.setItem('isSubscribed', isSubscribed);
}
