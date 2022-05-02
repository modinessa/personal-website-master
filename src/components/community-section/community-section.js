import { getUsers } from '../../js/server-requests.js';
import * as constants from '../../constants/constants.js';
import componentStyle from './community-section.component.css';

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

	let template = document.getElementById('community-section-template');
	let style = document.createElement('style');
	style.innerHTML = componentStyle.toString();
	
	shadowRoot.appendChild(template.content.cloneNode(true));
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
