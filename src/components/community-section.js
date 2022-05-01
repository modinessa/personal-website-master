import { getUsers } from '../js/server-requests.js';
import * as constants from '../constants/constants.js';

export class CommunitySection extends HTMLElement {
  // eslint-disable-next-line
  constructor() {
    super();
  }

	connectedCallback() {
    console.log(`Community Section connected to page`);
 		let shadowRoot = this.attachShadow({mode: 'open'});

		this.title = 'community section';
    this.description = 'Project websection component';
    shadowRoot.innerHTML = constants.COMMUNITY_SECTION_CONTENT;

		const style = document.createElement('style');
		style.innerHTML =
		`:host{
			font: normal 16px 'Source Sans Pro', sans-serif, Arial;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			background: white;
			height: 800px;
			max-width: 100%;
			color: #464547;
		}

		h1, h2, h3, button {
			font-family: 'Oswald', sans-serif;
		}
		
		.app-title {
		font-size: 3.25rem;
		line-height: 4rem;
		text-align: center;
		margin-top: 90px;
		margin-bottom: 10px;
	}

		.app-subtitle {
		font-size: 1.5rem;
		line-height: 1.625rem;
		font-weight: 300;
		text-align: center;
		font-family: 'Source Sans Pro', sans-serif, Arial;
	}
	
	.app-section__members {
	display: flex;
}

.app-section__member-card {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 8px;
	padding: 30px 40px 25px 30px;
	margin-top: 50px;
	margin-left: 10px;
	margin-right: 10px;
	margin-bottom: 70px;
	width: 315px;
	text-align: center;
}

.app-section__member-card:hover {
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
}

.app-section__member-img {
	align-self: center;
	height: 150px;
	width: 150px;
	z-index: 10;
}

.app-section__member-review {
	min-height: 100px;
	max-width: 230px;
}

.app-section__member-name {
	color: #464547;
	font-style: normal;
	font-weight: 700;
	font-size: 12px;
	line-height: 18px;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	margin-bottom: 0;
}

.app-section__member-position {
	align-self: center;
	width: 110px;
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	margin-top: 10px;
	line-height: 16px;
	color: #666666;
}

@media only screen and (max-width: 768px) {
	div.app-section__members>:not(:first-child) {
		display: none;
	}
}
	`;
	
		shadowRoot.appendChild(style);

		this.renderUsers();
  }

  disconnectedCallback() {
    console.log(`Website Section "${this.title}" removed from page`);
  }

  adoptedCallback() {
    console.log(`Website Section "${this.title}" moved to new page`);
  }

  // eslint-disable-next-line
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[attrName] = this.hasAttribute(attrName);
    }
    console.log(`Website Section "${this.title}" attributes changed`);
  }

  addUsers(users) {
    const usersContainer = this.shadowRoot.querySelector('.app-section__users');
    usersContainer.classList = constants.USER_CONTAINER_CLASS;
    // eslint-disable-next-line
    users.map((user) => {
      const userCard = document.createElement('div');
      userCard.classList = constants.USER_CARD_CLASS;

      const review = user.review || constants.USER_REVIEW;
      userCard.innerHTML = `<img src='${user.avatar}' class="app-section__member-img" alt="User photo"/>
<p class="app-section__member-review">
${review}
</p>
<div class="app-section__member-name">
${user.firstName} ${user.lastName}
</div>
<div class="app-section__member-position">
${user.position}
</div>`;
      usersContainer.appendChild(userCard);
    });
  }

  renderUsers() {
		performance.mark("fetchStartTime");
    getUsers()
		.then((response) => {
			performance.mark("fetchEndTime");
			return response.json()
			})
      .then((users) => this.addUsers(users))
      .catch((error) => { throw new Error(error); });
  }
}
