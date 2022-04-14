export function createCommunitySection() {
  window.addEventListener('load', () => {
    const communitySection = document.createElement('section');
    const parentNode = document.querySelector('main');
    const cultureSection = document.querySelector('.app-section--image-culture');
    communitySection.className = 'app-section app-section--big-community';

    parentNode.insertBefore(communitySection, cultureSection);

    communitySection.innerHTML = `<h2 class="app-title dark">
Big Community of<br>
People Like You
</h2>
<h3 class="app-subtitle dark">
We’re proud of our products, and we’re really excited<br> when we get feedback from our users.
</h3>
<div class="app-section__members">
</div>
`;
    const membersCardsParent = communitySection.querySelector('.app-section__members');
    sendRequest((members) => {
      const memberCardsHtml = renderMembersCards(members);

      // eslint-disable-next-line
			for (const member of memberCardsHtml) {
        membersCardsParent.appendChild(createCardNode(member));
      }
    });
  });
}

function sendRequest(callback) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'http://localhost:3000/community', true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
	// xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.send();
  // eslint-disable-next-line
	xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  });
}

function createCardNode(html) {
  const cardNode = document.createElement('div');
  cardNode.classList = 'app-section__member-card';
  cardNode.innerHTML = html;
  return cardNode;
}

function renderMembersCards(members) {
  members = JSON.parse(members);
  return members.map(member => createMemberCard(member));
}

function createMemberCard(member) {
  const review = member.review || 'PLACEHOLDER: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do incididunt ut labore et dolor.';
  const cardHtml = `
<img src='${member.avatar}' class="app-section__member-img"/>
<p class="app-section__member-review">
${review}
</p>
<div class="app-section__member-name">
${member.firstName} ${member.lastName}
</div>
<div class="app-section__member-position">
${member.position}
</div>`;
  return cardHtml;
}
