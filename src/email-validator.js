import * as constants from './constants.js';

const validate = email => {
  
  const regExp = new RegExp(
    constants.VALID_EMAIL_ENDINGS.map(element => `${element}$`)
      .toString()
      .replace(/,/g, '|'),
    'gi',
  );
  return regExp.test(email);
};

export default validate;
