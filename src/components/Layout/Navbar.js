import styles from './Navbar.css?inline';

export class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || 'Dashboard';
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <header class="glass-nav">
        <h5 class="nav-title">
          <slot name="icon"></slot>
          <span>${title}</span>
        </h5>
        <div class="nav-actions">
          <slot name="actions"></slot>
        </div>
      </header>
    `;
  }
}

customElements.define('gk-navbar', Navbar);
