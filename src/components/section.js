export class WebsiteSection extends HTMLElement {
  // eslint-disable-next-line
  constructor() {
    super();
  }

  connectedCallback() {
		this.title = 'web section';
    this.classList = 'app-section';
    this.description = 'Project websection';
    this.innerHTML = '<p>Bla-bla</p>';
    console.log(`Website Section "${this.title}" connected to page`);
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
}
