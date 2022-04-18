import * as constants from '../constants/constants.js';
import { WebsiteSection } from './section.js';
import { validate } from '../js/email-validator.js';
import { subscribe, unsubscribe } from '../js/server-requests.js';

// export class SectionCreator {
//  // eslint-disable-next-line
//  create(type) {
//    // eslint-disable-next-line
//    switch (type) {
//      case constants.STANDART_TYPE:
//        return new JoinSection(
//          constants.SUBSCRIBE_TITLE_STANDART, constants.SUBSCRIBE,
//        );
//      case constants.ADVANCED_TYPE:
//        return new JoinSection(
//          constants.SUBSCRIBE_TITLE_ADVANCED, constants.SUBSCRIBE_ADVANCED,
//        );
//    }
//  }
// }

export class JoinSection extends WebsiteSection {
  // eslint-disable-next-line
  constructor() {
    super();
  }

  customize(sectionType) {
    this.className = 'app-section app-section--image-joun-us';
    this.title = sectionType;

    const section = this.title === constants.JOIN_SECTION_ADVANCED.type
      ? constants.JOIN_SECTION_ADVANCED
      : constants.JOIN_SECTION_STANDART;

    this.innerHTML = localStorage.getItem('page_html')
|| `<h2 class="app-title">
      ${section.title}
    </h2>
    <h3 class="app-subtitle">
      Sed do eiusmod tempor incididunt <br /> ut labore et dolore magna aliqua.
    </h3>
    <form class="app-section--form-join-us ${section.type}" name="EmailForm">
    </form>`;

    const subForm = document.querySelector('.app-section--form-join-us');
    subForm.innerHTML = localStorage.getItem('Join Section form') ? localStorage.getItem('Join Section form') : `<input class="app-section--email-join-us" type="email" id="user-email" name="email" placeholder="Email">
      <button type="submit" class="app-section__button app-section__join-us--button" id="subBtn">
			${section.btn}
			</button>`;

    const userEmail = subForm.querySelector('#user-email');
    userEmail.value = localStorage.getItem('userEmail') || '';
    const subButton = document.querySelector('#subBtn');

    userEmail.addEventListener('input', (inp) => {
      inp.preventDefault();
      localStorage.setItem('userEmail', userEmail.value);
    });

    subButton.addEventListener('click', (buttonEvent) => {
      buttonEvent.preventDefault();
      const isSubscribed = localStorage.getItem('isSubscribed') === 'true';

      if (validate(userEmail.value)) {
        subButton.disabled = true;
        if (!isSubscribed) {
          subscribe(userEmail.value)
            .then((response) => {
              if (!response.ok) {
                response.json()
                  .then((error) => {
                    window.alert(error.error);
                  });
                subButton.disabled = false;
              }
              return response.json();
            })
            .then(() => {
              subButton.disabled = false;
							subForm.classList.add(constants.UNSUBSCRIBE);
              buttonEvent.target.innerHTML = constants.UNSUBSCRIBE;
              localStorage.setItem('isSubscribed', 'true');
              localStorage.setItem('Join Section form', subForm.innerHTML);
            });
        } else {
          unsubscribe()
            .then(() => {
              subButton.disabled = false;
							subForm.classList.remove(constants.UNSUBSCRIBE);
              userEmail.value = '';
              buttonEvent.target.innerHTML = constants.SUBSCRIBE;
              localStorage.setItem('isSubscribed', 'false');
              localStorage.setItem('Join Section form', subForm.innerHTML);
            });
        }
      } else {
        alert(`Email "${userEmail.value}" is invalid! Enter correct email adress, please!`);
      }
    });
  }

  remove() {
    if (!this.joinSection) {
      return;
    }
    this.joinSection.remove();
    this.joinSection = null;
  }
}
