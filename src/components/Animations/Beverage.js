import styles from './Beverage.css?inline';

export class BeverageAnimation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['color'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'color') {
        const liquid = this.shadowRoot.querySelector('.beverage-liquid');
        if (liquid) liquid.style.setProperty('--liquidColor', newValue);
      }
    }
  }

  fill() {
    const liquid = this.shadowRoot.querySelector('.beverage-liquid');
    if (liquid) liquid.classList.add('fill');
  }

  empty() {
    const liquid = this.shadowRoot.querySelector('.beverage-liquid');
    if (liquid) liquid.classList.remove('fill');
  }

  render() {
    const color = this.getAttribute('color');
    const colorStyle = color ? `style="--liquidColor: ${color}"` : '';

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="beverage-cup">
        <div class="beverage-liquid" ${colorStyle}></div>
      </div>
    `;
  }
}

customElements.define('gk-beverage', BeverageAnimation);
