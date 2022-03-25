// eslint-disable-next-line
import createSection from './join-us-section.js';
// eslint-disable-next-line
import validate from './email-validator.js';

import './styles/normalize.css';
import './styles/style.css';

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

    let adv;
    if (this.title === 'Join Our Advanced Program') {
      adv = 'advanced';
    }

    joinSection.innerHTML = createSection(this.title, this.subButton, adv);
    parentNode.insertBefore(joinSection, footerNode);

    document.querySelector('.app-section__button--subscribe').addEventListener('click', button => {
      button.preventDefault();
      const userEmail = joinSection.querySelector('.app-section--email-join-us').value;
      const valid = validate(userEmail);

      if (valid) {
        alert(`(${valid}) Your email is valid.`);
        console.log(userEmail);
      } else {
        alert(`(${valid}) Your email is invalid.`);
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

// Factory ----

class SectionCreator {
  create(type) {
    // factoryMethod()
    switch (type) {
      case 'standart':
        return new JoinSection('Join Our Program', 'Subscribe');
      case 'advanced':
        return new JoinSection('Join Our Advanced Program', 'Subscribe to Advanced Program');
      default:
        console.log('There is no section created');
    }
  }
}

const sectionCreator = new SectionCreator();
sectionCreator.create('standart');
