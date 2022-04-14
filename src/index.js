import { SectionCreator } from './join-us-section.js';
// import { createCommunitySection } from './big-community-section.js';
import * as constants from './constants.js';

import './styles/style.css';

const sectionCreator = new SectionCreator();
sectionCreator.create(constants.STANDART_TYPE);
// createCommunitySection();
