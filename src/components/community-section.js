import { getUsers } from '../js/server-requests.js';
import * as constants from '../constants/constants.js';
import { WebsiteSection } from './section.js';

export class CommunitySection extends WebsiteSection {
  // eslint-disable-next-line
  constructor() {
    super();
  }

  customize() {
    this.classList = constants.COMMUNITY_SECTION_CLASS_LIST;
    this.innerHTML = constants.COMMUNITY_SECTION_CONTENT;
    this.renderUsers();
  }

  addUsers(users) {
    const usersContainer = document.querySelector('.app-section__users');
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
