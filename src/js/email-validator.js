// eslint-disable-next-line
import * as constants from '../constants/constants.js';

export function validate(email) {
  const regExp = createRegExp(constants.VALID_EMAIL_ENDINGS);
  return regExp.test(email);
}

export function validateAsync(email) {
  const regExp = createRegExp(constants.VALID_EMAIL_ENDINGS);
  const promise = new Promise(() => regExp.test(email));
  return promise;
}

export function validateWithThrow(email) {
  const regExp = createRegExp(constants.VALID_EMAIL_ENDINGS);

  if (regExp.test(email)) {
    return true;
  }
  throw new Error('Provided email is invalid!');
}

export function validateWithLog(email) {
  const regExp = createRegExp(constants.VALID_EMAIL_ENDINGS);
  return regExp.test(email);
}

export function createRegExp(endingArray) {
  const regExp = new RegExp(
    endingArray.map(element => `${element}$`)
      .toString()
      .replace(/,/g, '|'),
    'gi',
  );
  return regExp;
}
