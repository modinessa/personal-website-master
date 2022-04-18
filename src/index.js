// import { SectionCreator } from './components/join-us-section.js';
import { WebsiteSection } from './components/section.js';
import { JoinSection } from './components/join-us-section.js';
import { CommunitySection } from './components/community-section.js';
import * as constants from './constants/constants.js';

import './styles/style.css';

function addSection(section) {
  const mainNode = document.querySelector('main');
  const footerNode = mainNode.querySelector('footer');
  mainNode.insertBefore(section, footerNode);
}

customElements.define('web-section', WebsiteSection);
customElements.define('community-section', CommunitySection);
customElements.define('join-section', JoinSection);

const hereSection = document.createElement('web-section');
addSection(hereSection);
hereSection.classList.add(...constants.HERE_SECTION_CLASS_LIST);
hereSection.innerHTML = constants.HERE_SECTION_CONTENT;

const headlineSection = document.createElement('web-section');
addSection(headlineSection);
headlineSection.innerHTML = constants.HEADLINE_SECTION_CONTENT;

// eslint-disable-next-line
const communitySection = document.createElement('community-section');
addSection(communitySection);
communitySection.customize();

const cultureSection = document.createElement('web-section');
addSection(cultureSection);
cultureSection.classList.add(constants.CULTURE_SECTION_CLASS_LIST);
cultureSection.innerHTML = constants.CULTURE_SECTION_CONTENT;

const joinSection = document.createElement('join-section');
addSection(joinSection);
joinSection.customize('standart');
