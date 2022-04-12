import sinon from 'sinon';
import { expect } from 'chai'; 
import { validate, validateAsync, validateWithThrow, validateWithLog } from '../../email-validator.js';
 
describe('validate() testing', () => { 
  it('should return false for empty string', () => {
		const expected = false;
		const actual = validate('');
    expect(actual).to.equal(expected);
  });

	it('should return true for email ending with "gmail.com"', () => {
		const expected = true;
		const actual = validate('mail@gmail.com');
		expect(actual).to.equal(expected);
	});

	it('should return true for email ending with "outlook.com"', () => {
		const expected = true;
		const actual = validate('mail@outlook.com');
		expect(actual).to.equal(expected);
	});

	it('should return true for email ending with "yandex.ru"', () => {
		const expected = true;
		const actual = validate('mail@yandex.ru');
		expect(actual).to.equal(expected);
	});

	it('should return false for any email is not ending with "gmail.com", "yandex.ru" or "outlook.com"', () => {
		const expected = false;
		const actual = validate('mail@mail.ru') || validate('mail@gmail') || validate('mail@google.com') || validate('mail@blabla.com');
		expect(actual).to.equal(expected);
	});
}); 

describe('validateAsync() testing', () => {
	it('should return false for empty string', () => {
		const expected = false;
		validateAsync('')
		.then((res) => {
			expect(res).to.equal(expected);
		})
		.catch(err => done(err));
	});

	it('should return true for email ending with "gmail.com"', () => {
		const expected = true;
		validateAsync('mail@gmail.com')
		.then((res) => {
			expect(res).to.equal(expected);
		})
		.catch(err => done(err));
	});

	it('should return true for email ending with "outlook.com"', () => {
		const expected = true;
		validateAsync('mail@outlook.com')
		.then((res) => {
			expect(res).to.equal(expected);
		})
		.catch(err => done(err));
	});

	it('should return true for email ending with "yandex.ru"', () => {
		const expected = true;
		validateAsync('mail@yandex.ru')
		.then((res) => {
			expect(res).to.equal(expected);
		})
		.catch(err => done(err));
	});

	it('should return false for any email is not ending with "gmail.com", "yandex.ru" or "outlook.com"', () => {
		const expected = false;
		validateAsync('mail@blabla.com')
		.then((res) => {
			expect(res).to.equal(expected);
		})
		.catch(err => done(err));
	});
});

describe('validateWithThrow() testing', () => {
	it('should throw an error if an email is an empty string', () => {
		expect(() => validateWithThrow('').to.throw('Provided email is invalid!'))
	});

	it('should not throw an error for email ending with "gmail.com"', () => {
		expect(() => validateWithThrow('mail@gmail.com').to.not.throw('Provided email is invalid!'))
	});

	it('should not throw an error for email ending with "outlook.com"', () => {
		expect(() => validateWithThrow('mail@outlook.com').to.not.throw('Provided email is invalid!'))
	});

	it('should not throw an error for email ending with "yandex.ru"', () => {
		expect(() => validateWithThrow('mail@yandex.ru').to.not.throw('Provided email is invalid!'))
	});

	it('should throw an error for any email is not ending with "gmail.com", "yandex.ru" or "outlook.com"', () => {
		expect(() => validateWithThrow('bla-bla.com').to.throw('Provided email is invalid!'))
	});
});

describe('validateWithLog() testing', () => {

  afterEach(function() {
    console.log.restore();
  });

	it('should concole log false for empty string', () => {
		const log = sinon.spy(console, 'log');
		validateWithLog('');
		if(!log.calledOnceWith(false)) {
			throw new Error('Log was not called')
		}
	});

	it('should concole log true for email ending with "gmail.com"', () => {
		const log = sinon.spy(console, 'log');
		validateWithLog('mail@gmail.com');
		if(!log.calledOnceWith(true)) {
			throw new Error('Log was not called')
		}
	});

	it('should concole log true for email ending with "yandex.ru"', () => {
		const log = sinon.spy(console, 'log');
		validateWithLog('mail@yandex.ru');
		if(!log.calledOnceWith(true)) {
			throw new Error('Log was not called')
		}
	});

	it('should concole log true for email ending with "outlook.com"', () => {
		const log = sinon.spy(console, 'log');
		validateWithLog('mail@outlook.com');
		if(!log.calledOnceWith(true)) {
			throw new Error('Log was not called')
		}
	});

	it('should concole log false for any email is not ending with "gmail.com", "yandex.ru" or "outlook.com"', () => {
		const log = sinon.spy(console, 'log');
		validateWithLog('bla-bla.com');
		if(!log.calledOnceWith(false)) {
			throw new Error('Log was not called')
		}
	});

});
