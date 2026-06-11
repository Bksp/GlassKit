export class Sidebar extends HTMLElement {
  connectedCallback() {
    this.classList.add('sidebar', 'd-flex', 'flex-column');
    this.setAttribute('role', 'navigation');
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('gk-sidebar')) {
  customElements.define('gk-sidebar', Sidebar);
}
