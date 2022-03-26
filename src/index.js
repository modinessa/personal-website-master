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
		
		//Ckeck subscribe/unsubscribe btn
		let subBtnMode;
		if (localStorage.getItem('subBtnMode'))
			{
				subBtnMode = localStorage.getItem('subBtnMode');
			} else {
				subBtnMode = true;
			}
		

		//Check what type of setion to create
		let adv;
    if (this.title === 'Join Our Advanced Program') {
      adv = 'advanced';
    } else {
			adv = 'standart';
		}

		if (localStorage.getItem('page_html')) {
			//Get Join Section content from LocalStorage
			joinSection.innerHTML = localStorage.getItem('page_html')
		} else {
			//Creating Join Section
    	joinSection.innerHTML = createSection(this.title, this.subButton, adv);
		}

		parentNode.insertBefore(joinSection, footerNode);

		const userEmail = joinSection.querySelector('#user-email');

    joinSection.querySelector('#subBtn').addEventListener('click', button => {
      button.preventDefault();


			if (subBtnMode) {
				//Check if e-maile is valid
			const valid = validate(userEmail.value);

			 if (valid) {
					userEmail.classList.add('hidden');
					button.target.innerHTML = 'Unsubscribe'
					document.querySelector('.app-section--form-join-us').classList.add('unsubscribe');
					subBtnMode = false;
					localStorage.setItem(`userEmail`, userEmail.value);
					localStorage.setItem('page_html', joinSection.innerHTML);
					localStorage.setItem('subBtnMode', subBtnMode);
			} else {
				alert('Enter correct email adress, please!')
			}
			
			} else {
		  		userEmail.classList.remove('hidden');
					document.querySelector('.app-section--form-join-us').classList.remove('unsubscribe');
					button.target.innerHTML = 'Subscribe';
					userEmail.value = '';
					subBtnMode = true;
					localStorage.removeItem(`userEmail`);
					localStorage.setItem('page_html', joinSection.innerHTML);
					localStorage.setItem('subBtnMode', subBtnMode);
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
//localStorage.clear();
const sectionCreator = new SectionCreator();
sectionCreator.create('standart');
