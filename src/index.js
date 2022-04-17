import { SectionCreator } from './join-us-section.js';
import { WebsiteSection } from './components/section.js';
import { createCommunitySection } from './big-community-section.js';
import * as constants from './constants.js';

import './styles/style.css';

const mainNode = document.querySelector('main');
const footerNode = mainNode.querySelector('footer');

function addSection(section) {
  mainNode.insertBefore(section, footerNode);
}

customElements.define('web-section', WebsiteSection);

const hereSection = document.createElement('web-section');
addSection(hereSection);
hereSection.classList.add(...constants.HERE_SECTION_CLASS_LIST);
hereSection.innerHTML = constants.HERE_SECTION_CONTENT;

const headlineSection = document.createElement('web-section');
addSection(headlineSection);
headlineSection.innerHTML = constants.HEADLINE_SECTION_CONTENT;

const cultureSection = document.createElement('web-section');
addSection(cultureSection);
cultureSection.classList.add(constants.CULTURE_SECTION_CLASS_LIST);
cultureSection.innerHTML = constants.CULTURE_SECTION_CONTENT;

createCommunitySection();
const sectionCreator = new SectionCreator();
sectionCreator.create(constants.STANDART_TYPE);
