export class GlassButton extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'secondary';
    this.classList.add('btn', `btn-glass-${variant}`, 'd-inline-flex', 'align-items-center');
    
    // Add semantic ARIA role and keyboard focusability
    this.setAttribute('role', 'button');
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    // Support trigger on Enter or Space keypresses
    this.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.click();
      }
    });
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('gk-button')) {
  customElements.define('gk-button', GlassButton);
}
