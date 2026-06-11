import styles from './GlassCard.css?inline';

export class GlassCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="glass-card">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('gk-glass-card', GlassCard);
