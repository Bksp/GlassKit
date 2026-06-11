import styles from './Sidebar.css?inline';

export class Sidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || 'GlassKit';
    const subtitle = this.getAttribute('subtitle') || '';

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <nav class="sidebar-wrapper">
        <header class="sidebar-header">
          <h4 style="margin:0; font-weight:bold; color:var(--textColor)">${title}</h4>
          ${subtitle ? `<small style="color: rgba(255,255,255,0.5)">${subtitle}</small>` : ''}
        </header>
        <div class="sidebar-content">
          <slot></slot>
        </div>
      </nav>
    `;
  }
}

customElements.define('gk-sidebar', Sidebar);
