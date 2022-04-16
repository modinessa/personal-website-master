export class WebsiteSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log(`Website Section "${this.title}" connected to page`);
    this.title = 'web section';
    this.classList = 'app-section';
    this.description = 'Project websection';
    this.innerHTML = '<p>Bla-bla</p>';
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
