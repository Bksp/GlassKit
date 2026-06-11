import './styles/main.css';
import { ThemeManager } from './utils/theme-manager.js';
import mermaid from 'mermaid';

// 1. Inyección de dependencias automáticas
function injectDependencies() {
  if (typeof document === 'undefined') return;

  if (!document.querySelector('link[href*="bootstrap.min.css"]')) {
    const bsCSS = document.createElement('link');
    bsCSS.rel = 'stylesheet';
    bsCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    document.head.appendChild(bsCSS);
  }

  if (!document.querySelector('link[href*="bootstrap-icons.css"]')) {
    const iconCSS = document.createElement('link');
    iconCSS.rel = 'stylesheet';
    iconCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css';
    document.head.appendChild(iconCSS);
  }

  if (!window.hljs && !document.querySelector('script[src*="highlight.min.js"]')) {
    const hljsCSS = document.createElement('link');
    hljsCSS.rel = 'stylesheet';
    hljsCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.min.css';
    document.head.appendChild(hljsCSS);

    const hljsScript = document.createElement('script');
    hljsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
    hljsScript.onload = () => {
      document.querySelectorAll('pre code').forEach((el) => {
        window.hljs.highlightElement(el);
      });
    };
    document.head.appendChild(hljsScript);
  }
}

// 2. Definición de Web Components Light DOM
class GlassCard extends HTMLElement {
  connectedCallback() {
    this.classList.add('glass-card', 'p-4', 'd-block');
  }
}

class Sidebar extends HTMLElement {
  connectedCallback() {
    this.classList.add('sidebar', 'd-flex', 'flex-column');
  }
}

class Navbar extends HTMLElement {
  connectedCallback() {
    this.classList.add('glass-nav', 'p-3', 'px-4', 'd-flex', 'justify-content-between', 'align-items-center', 'd-block');
  }
}

class GlassButton extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'secondary';
    this.classList.add('btn', `btn-glass-${variant}`, 'd-inline-flex', 'align-items-center');
  }
}

function initCustomSelects() {
  if (typeof document === 'undefined') return;
  
  document.querySelectorAll('.form-select').forEach(select => {
    // Avoid double initialization
    if (select.parentNode && select.parentNode.classList.contains('custom-select-wrapper')) return;

    select.style.display = 'none';

    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select-wrapper position-relative';

    const trigger = document.createElement('div');
    trigger.className = 'form-select custom-select-trigger d-flex justify-content-between align-items-center';
    trigger.style.cursor = 'pointer';

    const triggerText = document.createElement('span');
    const selectedOption = select.options[select.selectedIndex];
    triggerText.textContent = selectedOption ? selectedOption.textContent : '';
    trigger.appendChild(triggerText);

    const arrow = document.createElement('i');
    arrow.className = 'bi bi-chevron-down ms-2 text-white';
    arrow.style.transition = 'transform 0.2s ease';
    trigger.appendChild(arrow);

    wrapper.appendChild(trigger);

    const dropdown = document.createElement('div');
    dropdown.className = 'custom-select-dropdown glass-card position-absolute w-100 mt-1 d-none p-2';

    Array.from(select.options).forEach((option, index) => {
      const item = document.createElement('div');
      item.className = 'custom-select-option px-3 py-2 rounded-2 mb-1';
      if (index === select.options.length - 1) {
        item.className = 'custom-select-option px-3 py-2 rounded-2';
      }
      item.textContent = option.textContent;

      if (index === select.selectedIndex) {
        item.classList.add('active');
      }

      item.addEventListener('click', (e) => {
        e.stopPropagation();
        select.selectedIndex = index;
        select.dispatchEvent(new Event('change', { bubbles: true }));

        triggerText.textContent = option.textContent;

        dropdown.querySelectorAll('.custom-select-option').forEach((opt, idx) => {
          if (idx === index) {
            opt.classList.add('active');
          } else {
            opt.classList.remove('active');
          }
        });

        dropdown.classList.add('d-none');
        arrow.style.transform = 'rotate(0deg)';
      });

      dropdown.appendChild(item);
    });

    wrapper.appendChild(dropdown);

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !dropdown.classList.contains('d-none');
      document.querySelectorAll('.custom-select-dropdown').forEach(d => d.classList.add('d-none'));
      document.querySelectorAll('.custom-select-trigger i').forEach(a => a.style.transform = 'rotate(0deg)');

      if (!isOpen) {
        dropdown.classList.remove('d-none');
        arrow.style.transform = 'rotate(180deg)';
      }
    });

    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-dropdown').forEach(d => d.classList.add('d-none'));
    document.querySelectorAll('.custom-select-trigger i').forEach(a => a.style.transform = 'rotate(0deg)');
  });
}

function openZoomModal(element) {
  if (typeof document === 'undefined') return;
  if (document.getElementById('zoom-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'zoom-modal';
  modal.className = 'zoom-modal';
  
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'zoom-modal-content';

  let clone = element.cloneNode(true);
  // Conservamos el ID si es un SVG para que los estilos scoped internos de Mermaid sigan funcionando
  if (clone.id && clone.tagName.toLowerCase() !== 'svg') {
    clone.removeAttribute('id');
  }
  
  // Preservar estilos de Mermaid envolviendo en el contenedor original
  const mermaidParent = element.closest('.mermaid');
  if (mermaidParent) {
    const mermaidWrap = document.createElement('div');
    mermaidWrap.className = mermaidParent.className;
    mermaidWrap.style.cssText = mermaidParent.style.cssText;
    mermaidWrap.style.width = '100%';
    mermaidWrap.style.height = '100%';
    mermaidWrap.style.display = 'flex';
    mermaidWrap.style.justifyContent = 'center';
    mermaidWrap.style.alignItems = 'center';
    
    const svgEl = clone.tagName.toLowerCase() === 'svg' ? clone : clone.querySelector('svg');
    if (svgEl) {
      svgEl.removeAttribute('width');
      svgEl.removeAttribute('height');
      svgEl.style.width = '100%';
      svgEl.style.height = 'auto';
      svgEl.style.maxWidth = '90vw';
      svgEl.style.maxHeight = '80vh';
    }
    
    mermaidWrap.appendChild(clone);
    clone = mermaidWrap;
  } else if (clone.tagName.toLowerCase() === 'svg') {
    clone.removeAttribute('width');
    clone.removeAttribute('height');
    clone.style.width = '100%';
    clone.style.height = 'auto';
    clone.style.maxWidth = '90vw';
    clone.style.maxHeight = '80vh';
  }

  contentWrapper.appendChild(clone);
  modal.appendChild(contentWrapper);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'zoom-modal-close';
  closeBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
  modal.appendChild(closeBtn);

  const caption = document.createElement('div');
  caption.className = 'zoom-modal-caption';
  caption.textContent = 'Scroll para zoom · Arrastrar para mover · Clic fuera para cerrar';
  modal.appendChild(caption);

  document.body.appendChild(modal);

  // Estado del Zoom y Arrastre
  let currentScale = 1;
  let isDragging = false;
  let startX = 0, startY = 0;
  let translateX = 0, translateY = 0;

  const updateTransform = () => {
    contentWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
  };

  requestAnimationFrame(() => {
    modal.classList.add('active');
    contentWrapper.classList.add('active');
  });

  // Zoom con la rueda del ratón (Wheel)
  modal.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    currentScale = Math.min(Math.max(1, currentScale + delta), 6); // Rango 1x - 6x
    
    if (currentScale === 1) {
      translateX = 0;
      translateY = 0;
      contentWrapper.style.cursor = 'zoom-out';
    } else {
      contentWrapper.style.cursor = 'grab';
    }
    
    contentWrapper.style.transition = 'transform 0.15s ease-out';
    updateTransform();
  }, { passive: false });

  // Arrastre con el ratón
  contentWrapper.addEventListener('mousedown', (e) => {
    if (currentScale <= 1) return;
    e.preventDefault();
    isDragging = true;
    contentWrapper.style.transition = 'none'; // Sin retardo al arrastrar
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    contentWrapper.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      contentWrapper.style.transition = 'transform 0.15s ease-out';
      contentWrapper.style.cursor = 'grab';
    }
  });

  // Cerrar modal al hacer clic fuera
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('.zoom-modal-close')) {
      closeZoomModal(modal, contentWrapper);
    }
  });

  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeZoomModal(modal, contentWrapper);
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

function closeZoomModal(modal, contentWrapper) {
  modal.classList.remove('active');
  contentWrapper.classList.remove('active');
  setTimeout(() => {
    if (modal.parentNode) {
      modal.parentNode.removeChild(modal);
    }
  }, 300);
}

// Registro
export function initGlassKitUI() {
  injectDependencies();
  ThemeManager.init();
  initCustomSelects();
  
  if (typeof customElements !== 'undefined') {
    if (!customElements.get('gk-glass-card')) customElements.define('gk-glass-card', GlassCard);
    if (!customElements.get('gk-sidebar')) customElements.define('gk-sidebar', Sidebar);
    if (!customElements.get('gk-navbar')) customElements.define('gk-navbar', Navbar);
    if (!customElements.get('gk-button')) customElements.define('gk-button', GlassButton);
  }

  // Caching DOM elements para mejor rendimiento
  const contentSections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.sidebar .nav-link');

  // Helper para actualizar el título del navbar
  const updateNavbarTitle = (titleText) => {
    const navbarTitle = document.getElementById('navbar-title');
    if (navbarTitle) {
      navbarTitle.textContent = titleText;
    }
  };

  // Inicializar título de navbar con la sección/página activa al cargar
  const activeLink = document.querySelector('.sidebar .nav-link.active');
  if (activeLink) {
    const titleSpan = activeLink.querySelector('span');
    if (titleSpan) {
      updateNavbarTitle(titleSpan.textContent.trim());
    }
  }

  // Inicialización de Mermaid base
  const mermaidNodes = document.querySelectorAll('.mermaid');
  const originalMermaidCodes = Array.from(mermaidNodes).map(node => node.textContent.trim());

  const renderMermaid = async (primaryColor) => {
      mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
              primaryColor: primaryColor,
              primaryTextColor: '#ffffff',
              primaryBorderColor: primaryColor,
              lineColor: '#ffffff',
              secondaryColor: 'rgba(255, 255, 255, 0.1)',
              tertiaryColor: 'rgba(255, 255, 255, 0.05)',
              nodeBorder: primaryColor,
              mainBkg: 'rgba(0, 0, 0, 0.2)',
          }
      });

      for (let i = 0; i < mermaidNodes.length; i++) {
          const node = mermaidNodes[i];
          const id = `mermaid-svg-${i}-${Date.now()}`;
          try {
              const { svg } = await mermaid.render(id, originalMermaidCodes[i]);
              node.innerHTML = svg;
          } catch (e) {
              console.error("Error rendering mermaid:", e);
          }
      }
  };

  // Escuchar cambios de tema
  window.addEventListener('glasskit-theme-changed', (e) => {
      const { primary } = e.detail;
      renderMermaid(primary);
  });

  // Render inicial con el tema default
  renderMermaid('#0d6efd');

  // Delegación de eventos global para navegación
  document.addEventListener('click', (e) => {
    // Zoom para imágenes y diagramas Mermaid
    const zoomTarget = e.target.closest('.mermaid svg, img:not(.no-zoom)');
    if (zoomTarget) {
      openZoomModal(zoomTarget);
      return;
    }

    const navLink = e.target.closest('.sidebar .nav-link');
    if (navLink) {
      // Activar visualmente el link
      navLinks.forEach(link => link.classList.remove('active'));
      navLink.classList.add('active');

      // Cambio de vista SPA (Lógica de páginas)
      const targetPageId = navLink.getAttribute('data-page');
      if (targetPageId) {
          document.querySelectorAll('.page-view').forEach(page => {
              page.classList.add('d-none');
          });
          const targetPage = document.getElementById(targetPageId);
          if (targetPage) {
              targetPage.classList.remove('d-none');
          }
      }

      // Cerrar sidebar en móviles tras hacer clic
      if (window.innerWidth < 992) {
        document.body.classList.remove('sidebar-mobile-open');
      }

      // Actualizar título del navbar basado en el link seleccionado
      const titleSpan = navLink.querySelector('span');
      if (titleSpan) {
        updateNavbarTitle(titleSpan.textContent.trim());
      }
    }

    // Toggle de la barra lateral (Desktop & Mobile)
    if (e.target.closest('.toggle-sidebar-btn')) {
      if (window.innerWidth >= 992) {
        document.body.classList.toggle('sidebar-collapsed');
      } else {
        document.body.classList.toggle('sidebar-mobile-open');
      }
    }

    // Cerrar sidebar si hacemos click en el overlay (Móviles)
    if (e.target.closest('.sidebar-overlay')) {
      document.body.classList.remove('sidebar-mobile-open');
    }
  });
  
  // Lógica de ScrollSpy (Highlight dinámico en Navbar)
  window.addEventListener('scroll', () => {
    if(document.getElementById('page-uikit') && document.getElementById('page-uikit').classList.contains('d-none')) return;
    
    let current = '';
    contentSections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 250)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');

        // Actualizar título del navbar basado en la sección visible
        const titleSpan = link.querySelector('span');
        if (titleSpan) {
          updateNavbarTitle(titleSpan.textContent.trim());
        }
      }
    });
  });

  console.log('🚀 GlassKit inicializado (Light DOM). Temas habilitados.');
}

// Auto-inicialización si se importa directamente en el navegador
if (typeof window !== 'undefined') {
  initGlassKitUI();
  // Exponer el ThemeManager a nivel global para que puedas llamarlo desde la consola o botones
  window.ThemeManager = ThemeManager;
}
