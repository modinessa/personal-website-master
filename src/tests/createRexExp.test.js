import { expect } from 'chai';
import { createRegExp } from '../js/email-validator.js';

describe('createRegExp() testing', () => {
  it('should return correct regexp for provided array of email endings', () => {
    const expected = /outlook.com$/gi;
    const actual = createRegExp(['outlook.com']);
    expect(actual).to.be.deep.equal(expected);
  });

  it('should return correct regexp for provided array of email endings', () => {
    const expected = /gmail.com$|outlook.com$|yandex.ru$/gi;
    const actual = createRegExp(['gmail.com', 'outlook.com', 'yandex.ru']);
    expect(actual).to.be.deep.equal(expected);
  });
});
