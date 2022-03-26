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
		
		//Ckeck if subscribe btn
		let subBtnMode = true;


		//Check what type of setion to create
		let adv;
    if (this.title === 'Join Our Advanced Program') {
      adv = 'advanced';
    } else {
			adv = 'standart';
		}

    joinSection.innerHTML = createSection(this.title, this.subButton, adv);
    parentNode.insertBefore(joinSection, footerNode);

		const userEmail = joinSection.querySelector('#user-email');

    joinSection.querySelector('#subBtn').addEventListener('click', button => {
      button.preventDefault();

			if (subBtnMode) {
				//Check if e-maile is valid
			const valid = validate(userEmail.value);

			 if (valid) {
        localStorage.setItem(`userEmail`, userEmail.value);
				userEmail.classList.add('hidden');
				button.target.innerHTML = 'Unsubscribe'
				document.querySelector('.app-section--form-join-us').classList.add('unsubscribe');
				subBtnMode = false;
			} else {
				alert('Enter correct email adress, please!')
			}
			
			} else {
		  		userEmail.classList.remove('hidden');
					document.querySelector('.app-section--form-join-us').classList.remove('unsubscribe');
					button.target.innerHTML = 'Subscribe';
					userEmail.value = '';
					localStorage.removeItem(`userEmail`);
					subBtnMode = true;

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
