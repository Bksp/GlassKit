import styles from './Receipt.css?inline';

export class ReceiptAnimation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  show() {
    const paper = this.shadowRoot.querySelector('.receipt-paper');
    if (paper) paper.classList.add('show');
  }

  hide() {
    const paper = this.shadowRoot.querySelector('.receipt-paper');
    if (paper) paper.classList.remove('show');
  }

  render() {
    const title = this.getAttribute('title') || 'TICKET';
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="receipt-paper">
        <div class="title">${title}</div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('gk-receipt', ReceiptAnimation);
