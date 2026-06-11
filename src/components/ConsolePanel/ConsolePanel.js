import styles from './ConsolePanel.css?inline';

export class ConsolePanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.panelEl = this.shadowRoot.querySelector('.console-panel');
  }

  /**
   * Añade una línea de texto a la consola
   * @param {string} message - El mensaje a mostrar
   * @param {string} type - Tipo (info, success, warning, danger, system)
   */
  addLog(message, type = 'system') {
    if (!this.panelEl) return;
    
    const line = document.createElement('div');
    line.className = `console-line ${type}`;
    line.textContent = message;
    
    this.panelEl.appendChild(line);
    this.panelEl.scrollTop = this.panelEl.scrollHeight; // Auto scroll
  }
  
  clear() {
    if (this.panelEl) {
      this.panelEl.innerHTML = '';
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="console-panel"></div>
    `;
  }
}

customElements.define('gk-console', ConsolePanel);
