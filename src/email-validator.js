const validate = email => {
  const VALID_EMAIL_ENDINGS = ['gmail.com', 'outlook.com', 'yandex.ru'];

  const regExp = new RegExp(
    VALID_EMAIL_ENDINGS.map(el => `${el}$`)
      .toString()
      .replace(/,/g, '|'),
    'gi',
  );
  return regExp.test(email);
};

export default validate;
