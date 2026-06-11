export class GlassCard extends HTMLElement {
  connectedCallback() {
    this.classList.add('glass-card', 'p-4', 'd-block');
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('gk-glass-card')) {
  customElements.define('gk-glass-card', GlassCard);
}
