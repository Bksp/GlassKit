import styles from './CodeViewer.css?inline';

export class CodeViewer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['code', 'language'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get code() {
    return this.getAttribute('code') || '';
  }

  set code(val) {
    this.setAttribute('code', val);
  }

  escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  render() {
    const code = this.getAttribute('code') || this.innerHTML.trim();
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.min.css">
      <div class="code-container">
        <pre><code class="language-javascript">${this.escapeHtml(code)}</code></pre>
      </div>
    `;

    // Try to highlight if hljs is available globally
    if (window.hljs) {
      const codeBlock = this.shadowRoot.querySelector('code');
      window.hljs.highlightElement(codeBlock);
    }
  }
}

customElements.define('gk-code-viewer', CodeViewer);
