import * as constants from '../constants/constants.js';
import { validate } from '../js/email-validator.js';
import { subscribe, unsubscribe } from '../js/server-requests.js';


export class JoinSection extends HTMLElement {
  // eslint-disable-next-line
  constructor() {
    super();
  }

	connectedCallback() {
    console.log(`Join us Section connected to page`);
 		let shadowRoot = this.attachShadow({mode: 'open'});

		this.title = 'join us section';
		this.classList ='app-section--image-joun-us';
    this.description = 'Project websection component';
		const section = this.title === constants.JOIN_SECTION_ADVANCED.type
      ? constants.JOIN_SECTION_ADVANCED
      : constants.JOIN_SECTION_STANDART;

		const style = document.createElement('style');
		style.innerHTML = `
		:host {
			background: linear-gradient(to top, rgba(5, 17, 18, 0.5), rgba(5, 17, 18, 0.5)),
		url(../assets/images/your-image-join.png) no-repeat center;
			font: normal 16px 'Source Sans Pro', sans-serif, Arial;
			display: flex;
			align-items: center;
			flex-direction: column;
			box-sizing: border-box;
			color: white;
			justify-content: space-between;
			height: 435px;
			max-width: 100%;
			padding-bottom: 90px;
			padding-top: 35px;
		}

		h1, h2, h3, button {
			font-family: 'Oswald', sans-serif;
		}

		.app-title {
		font-size: 3.25rem;
		line-height: 4rem;
		text-align: center;
	}
		.app-subtitle {
		font-size: 1.5rem;
		line-height: 1.625rem;
		font-weight: 300;
		text-align: center;
		font-family: 'Source Sans Pro', sans-serif, Arial;
	}
	.app-section--form-join-us {
	width: 600px;
	display: flex;
	justify-content: space-between;
	margin-left: 27%;
	margin-right: 32%;
}

.unsubscribe {
	justify-content: center;
}

.unsubscribe input {
	display: none;
}

.advanced {
	width: 645px;
	margin-left: 27%;
	margin-right: 27%;
}

.app-section--image-joun-us h3 {
	color: rgba(255, 255, 255, 0.7);
	margin-top: 0px;
}

.app-section--form-join-us>* {
	align-self: center;
}

#user-email {
	border:none;
	box-sizing: border-box;
	background: rgba(255, 255, 255, 0.15);
	padding: 14px 50px 14px 10px;
	color: white;
	width: 400px;
}

.app-section--email-join-us::placeholder {
	color: white;
}

.app-section__join-us--button {
	background-color: #55c2d8;
	border: none;
	color: white;
	cursor: pointer;
	outline: none;
	border-radius: 26px;
	font-size: 14px;
	height: 46px;
	letter-spacing: 1.2px;
	text-transform: uppercase;
	width: 110px;
}

.app-section__join-us--button:disabled {
	opacity: 0.5;
}

.advanced button {
	width: 190px;
}

@media only screen and (max-width: 768px) {
:host {
	background: linear-gradient(to top, rgba(5, 17, 18, 0.5), rgba(5, 17, 18, 0.5)),
			url(../assets/images/your-image-join_mob.png) no-repeat center/cover;
		height: 523px;
		width: 100%;
		justify-content: flex-start;
}

	.app-section--form-join-us {
		margin: 25px 0 0 0;
		flex-direction: column;
		justify-content: space-between;
	}

	.unsubscribe>button {
		margin-top: 91px;
	}

	.app-section--submit-join-us {
		margin: 55px 0 0 0;
		height: 48px;
		width: 420px;
	}

	.app-section__join-us--button {
		margin-top: 45px;
		margin-bottom: 0;
	}
}
		`;

		
    shadowRoot.innerHTML = localStorage.getItem('page_html')
|| `<h2 class="app-title">
      ${section.title}
    </h2>
    <h3 class="app-subtitle">
      Sed do eiusmod tempor incididunt <br /> ut labore et dolore magna aliqua.
    </h3>
    <form class="app-section--form-join-us ${section.type}" name="EmailForm">
    </form>`;

    const subForm = shadowRoot.querySelector('.app-section--form-join-us');
    subForm.innerHTML = localStorage.getItem('Join Section form') ? localStorage.getItem('Join Section form') : `<input class="app-section--email-join-us" type="email" id="user-email" name="email" placeholder="Email">
      <button type="submit" class="app-section__button app-section__join-us--button" id="subBtn">
			${section.btn}
			</button>`;

    const userEmail = subForm.querySelector('#user-email');
    userEmail.value = localStorage.getItem('userEmail') || '';
    const subButton = shadowRoot.querySelector('#subBtn');

    userEmail.addEventListener('input', (inp) => {
      inp.preventDefault();
      localStorage.setItem('userEmail', userEmail.value);
    });

		const worker = new Worker('worker.js', { type: 'module'});

		worker.addEventListener('message', (event) => {
			console.log(event.data);
		})
		
		userEmail.addEventListener('click', (inputEvent) => {
      inputEvent.preventDefault();
			worker.postMessage({message: 'user'});
		});

    subButton.addEventListener('click', (buttonEvent) => {
      buttonEvent.preventDefault();
			
			worker.postMessage({message: 'user'});

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
		shadowRoot.appendChild(style);
  }

  remove() {
    if (!this.shadowRoot) {
      return;
    }
    this.shadowRoot.remove();
    this.shadowRoot = null;
  }
}
