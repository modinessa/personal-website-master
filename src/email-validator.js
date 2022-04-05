// eslint-disable-next-line
import * as constants from './constants.js';

export function validate(email) {
  const regExp = new RegExp(
    constants.VALID_EMAIL_ENDINGS.map(element => `${element}$`)
      .toString()
      .replace(/,/g, '|'),
    'gi',
  );
  return regExp.test(email);
}
