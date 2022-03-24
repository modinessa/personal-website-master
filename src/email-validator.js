const validate = email => {
    const VALID_EMAIL_ENDINGS = ['gmail.com', 'outlook.com', 'yandex.ru'];
    const rule = [];

    for (const element of VALID_EMAIL_ENDINGS) {
        rule.push(`${element}$`);
    }

    const regExp = new RegExp(rule.toString().replace(/,/g, '|'), 'gi');
    return regExp.test(email);
};

export default validate;
