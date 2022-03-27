// eslint-disable-next-line
import createSection from './join-us-section.js';
// eslint-disable-next-line
import validate from './email-validator.js';

import './styles/normalize.css';
import './styles/style.css';

const SUBSCRIBE_TITLE_ADVANCED = 'Join Our Advanced Program';
const SUBSCRIBE_TITLE_STANDART = 'Join Our Program';
const SUBSCRIBE_BTN = 'subscribe';
const UNSUBSCRIBE_BTN = 'unsubscribe';
const SUBSCRIBE_BTN_ADVANCED = 'subscribe to Advanced Program';
const STANDART_TYPE = 'standart';
const ADVANCED_TYPE = 'advanced';
const HIDDEN = 'hidden';


// Factory ----

class SectionCreator {
  create(type) {
    // factoryMethod()
    switch (type) {
      case STANDART_TYPE:
        return new JoinSection(SUBSCRIBE_TITLE_STANDART, SUBSCRIBE_BTN);
      case ADVANCED_TYPE:
        return new JoinSection(SUBSCRIBE_TITLE_ADVANCED, SUBSCRIBE_BTN_ADVANCED);
    }
  }
}

// Abstract Product ----
class JoinSection {
  joinSection = null;

  constructor(title, subButton) {
    this.title = title;
    this.subButton = subButton;
    this.joinSection = this.render();
  }

  render() {
    const joinSection = document.createElement('section');
    const parentNode = document.querySelector('main');
    const footerNode = document.querySelector('footer');
	
    joinSection.className = 'app-section app-section--image-joun-us';
		
		

		//Check what type of setion to create
		const adv = this.title === SUBSCRIBE_TITLE_ADVANCED ? ADVANCED_TYPE : STANDART_TYPE;

		if (localStorage.getItem('page_html')) {
			//Get Join Section content from LocalStorage
			joinSection.innerHTML = localStorage.getItem('page_html')
		} else {
			//Creating Join Section
    	joinSection.innerHTML = createSection(this.title, this.subButton, adv);
		}

		parentNode.insertBefore(joinSection, footerNode);

		const userEmail = joinSection.querySelector('#user-email');

		userEmail.addEventListener('change', (inp) => {
			inp.preventDefault();
			localStorage.setItem('userEmail', userEmail.value);
		});

    joinSection.querySelector('#subBtn').addEventListener('click', button => {
      button.preventDefault();

			let isSubscribed = localStorage.getItem('isSubscribed') === 'true';

			if (isSubscribed) {
				userEmail.classList.remove(HIDDEN);
				document.querySelector('.app-section--form-join-us').classList.remove(UNSUBSCRIBE_BTN);
				button.target.innerHTML = SUBSCRIBE_BTN;
				userEmail.value = '';
				localStorage.removeItem(`userEmail`);
				localStorage.setItem('page_html', joinSection.innerHTML);
				isSubscribed = false;
				localStorage.setItem('isSubscribed', isSubscribed);
			} else {
			  if (validate(userEmail.value)) {
					userEmail.classList.add(HIDDEN);
					button.target.innerHTML = UNSUBSCRIBE_BTN;
					document.querySelector('.app-section--form-join-us').classList.add(UNSUBSCRIBE_BTN);
					localStorage.setItem('page_html', joinSection.innerHTML);
					isSubscribed = true;
					localStorage.setItem('isSubscribed', isSubscribed);
				} else {
					alert('Enter correct email adress, please!');
				}
			}
    });

    return joinSection;
  }

  remove() {
    if (!this.joinSection) {
      return;
    }
    this.joinSection.remove();
    this.joinSection = null;
  }
}

const sectionCreator = new SectionCreator();
sectionCreator.create(STANDART_TYPE);
//localStorage.clear();