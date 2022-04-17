import { submit } from './sub-ubsub-handler.js';
import * as constants from './constants.js';

export function createJoinSection(title, subButton, formClass) {
  const sectionContent = `<h2 class="app-title">
      ${title}
    </h2>
    
    <h3 class="app-subtitle">
      Sed do eiusmod tempor incididunt <br /> ut labore et dolore magna aliqua.
    </h3>

    <form class="app-section--form-join-us ${formClass}" name="EmailForm">
 
      <input class="app-section--email-join-us" type="email" id="user-email" name="email" placeholder="Email">
      </div>
      
      <button type="submit" class="app-section__button app-section__join-us--button" id="subBtn">${subButton}</button>

    </form>`;

  return sectionContent;
}

export class SectionCreator {
  // eslint-disable-next-line
  create(type) {
    // eslint-disable-next-line
    switch (type) {
      case constants.STANDART_TYPE:
        return new JoinSection(
          constants.SUBSCRIBE_TITLE_STANDART, constants.SUBSCRIBE_BTN,
        );
      case constants.ADVANCED_TYPE:
        return new JoinSection(
          constants.SUBSCRIBE_TITLE_ADVANCED, constants.SUBSCRIBE_BTN_ADVANCED,
        );
    }
  }
}

class JoinSection {
  // eslint-disable-next-line
  constructor(title, subButtonText) {
    this.title = title;
    this.subButtonText = subButtonText;
    this.joinSection = this.render();
  }

  render() {
    const joinSection = document.createElement('section');
    const parentNode = document.querySelector('main');
    const footerNode = parentNode.querySelector('footer');

    joinSection.className = 'app-section app-section--image-joun-us';

    // Check what type of setion to create
    const adv = this.title === constants.SUBSCRIBE_TITLE_ADVANCED
      ? constants.ADVANCED_TYPE
      : constants.STANDART_TYPE;

    joinSection.innerHTML = localStorage.getItem('page_html')
|| createJoinSection(this.title, this.subButtonText, adv);

    parentNode.insertBefore(joinSection, footerNode);

    const userEmail = joinSection.querySelector('#user-email');
    userEmail.value = localStorage.getItem('userEmail') || '';
    const subButton = joinSection.querySelector('#subBtn');

    userEmail.addEventListener('input', (inp) => {
      inp.preventDefault();
      localStorage.setItem('userEmail', userEmail.value);
    });

    subButton.addEventListener('click', (button) => {
      button.preventDefault();
      submit(button, userEmail, joinSection);
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
