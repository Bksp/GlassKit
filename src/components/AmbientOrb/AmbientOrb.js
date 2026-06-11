import styles from './AmbientOrb.css?inline';

export class AmbientOrb extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  connectedCallback() {
    this.render();
    this.orbElement = this.shadowRoot.querySelector('.orb');
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  disconnectedCallback() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(e) {
    if (this.orbElement) {
      // Use requestAnimationFrame for performance
      requestAnimationFrame(() => {
        this.orbElement.style.left = `${e.clientX}px`;
        this.orbElement.style.top = `${e.clientY}px`;
      });
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="orb"></div>
    `;
  }
}

customElements.define('gk-ambient-orb', AmbientOrb);
