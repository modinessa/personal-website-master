import { WebsiteSection } from './components/section.js';
import { JoinSection } from './components/join-us-section.js';
import { CommunitySection } from './components/community-section.js';
import { getPerfomanceMetrics } from './js/perfomance-metrics.js';
import { postMetrics } from './js/server-requests.js';

import './styles/style.css';

function addSection(section) {
  const mainNode = document.querySelector('main');
  const footerNode = mainNode.querySelector('footer');
  mainNode.insertBefore(section, footerNode);
}

customElements.define('web-section', WebsiteSection);
customElements.define('community-section', CommunitySection);
customElements.define('join-section', JoinSection);

window.addEventListener("load", function() {
	const report = getPerfomanceMetrics();

	if(postMetrics(report)) {
		console.log('Report was posted!', report);
	};
})
