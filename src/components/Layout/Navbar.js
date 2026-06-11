export class Navbar extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Dashboard';
    const actionsHtml = this.innerHTML;
    
    // Configuración base del navbar
    this.classList.add('glass-nav', 'mb-4', 'p-3', 'px-4', 'd-flex', 'justify-content-between', 'align-items-center');
    this.classList.remove('d-block');
    
    // Semantics: Definir rol banner para el encabezado de navegación
    this.setAttribute('role', 'banner');

    this.innerHTML = `
      <div class="nav-brand d-flex align-items-center">
          <h2 class="h5 mb-0 text-white fw-bold text-truncate gk-navbar-title">${title}</h2>
      </div>
      
      <div class="nav-actions-container d-flex align-items-center">
          <div class="d-none d-sm-flex align-items-center me-3">
              ${actionsHtml}
          </div>
          
          <button class="nav-toggle-btn toggle-sidebar-btn d-lg-none" aria-label="Toggle Sidebar">
              <div class="hamburger-lines">
                  <span class="line line1"></span>
                  <span class="line line2"></span>
                  <span class="line line3"></span>
              </div>
          </button>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title') {
      const titleEl = this.querySelector('.gk-navbar-title');
      if (titleEl) {
        titleEl.textContent = newValue;
      }
    }
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('gk-navbar')) {
  customElements.define('gk-navbar', Navbar);
}
