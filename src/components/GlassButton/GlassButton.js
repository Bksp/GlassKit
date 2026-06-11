import styles from './GlassButton.css?inline';

export class GlassButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['variant', 'disabled'];
  }

  connectedCallback() {
    this.render();
    this.buttonEl = this.shadowRoot.querySelector('button');
    
    // Si queremos propagar clics desde el botón interno al componente
    this.buttonEl.addEventListener('click', (e) => {
      if (this.hasAttribute('disabled')) {
        e.stopPropagation();
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.buttonEl) {
      this.render();
    }
  }

  render() {
    const variant = this.getAttribute('variant') || 'secondary';
    const disabled = this.hasAttribute('disabled') ? 'disabled' : '';
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <button class="${variant}" ${disabled}>
        <slot></slot>
      </button>
    `;
    
    if (this.buttonEl) {
      this.buttonEl = this.shadowRoot.querySelector('button');
    }
  }
}

customElements.define('gk-button', GlassButton);
