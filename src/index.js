import { createJoinSection } from './join-us-section.js';
import { submit } from './sub-ubsub-handler.js';
import { createCommunitySection } from './big-community-section.js';
import * as constants from './constants.js';

import './styles/normalize.css';
import './styles/style.css';

// Factory ----

class SectionCreator {
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

// Abstract Product ----
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
    const footerNode = document.querySelector('footer');

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

const sectionCreator = new SectionCreator();
sectionCreator.create(constants.STANDART_TYPE);
createCommunitySection();
