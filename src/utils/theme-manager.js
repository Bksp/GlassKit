export class ThemeManager {
    static init() {
        if (!document.documentElement.style.getPropertyValue('--bg-color')) {
            this.setTheme('default');
        }
    }

    static setTheme(themeName) {
        const root = document.documentElement.style;
        // Quitar clase activa de todos los botones de tema
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('border-primary'));

        switch (themeName) {
            case 'cyberpunk':
                // GlassKit Base
                root.setProperty('--bg-color', '#090a0f');
                root.setProperty('--grad1-color', 'rgba(15, 20, 40, 1)');
                root.setProperty('--grad2-color', 'rgba(30, 10, 40, 1)');
                root.setProperty('--grad3-color', 'rgba(10, 30, 40, 1)');
                root.setProperty('--orb-color', 'rgba(0, 255, 255, 0.15)');
                
                // Bootstrap Overrides (Hex and RGB)
                root.setProperty('--bs-primary', '#00f0ff');
                root.setProperty('--bs-primary-rgb', '0, 240, 255');
                root.setProperty('--bs-secondary', '#ff00ff');
                root.setProperty('--bs-secondary-rgb', '255, 0, 255');
                root.setProperty('--bs-success', '#00ffaa');
                root.setProperty('--bs-success-rgb', '0, 255, 170');
                root.setProperty('--bs-warning', '#ffff00');
                root.setProperty('--bs-warning-rgb', '255, 255, 0');
                root.setProperty('--bs-danger', '#ff003c');
                root.setProperty('--bs-danger-rgb', '255, 0, 60');
                root.setProperty('--bs-info', '#00e5ff');
                root.setProperty('--bs-info-rgb', '0, 229, 255');
                break;
                
            case 'nature':
                // GlassKit Base
                root.setProperty('--bg-color', '#0a120d');
                root.setProperty('--grad1-color', 'rgba(15, 30, 20, 1)');
                root.setProperty('--grad2-color', 'rgba(10, 40, 15, 1)');
                root.setProperty('--grad3-color', 'rgba(10, 25, 15, 1)');
                root.setProperty('--orb-color', 'rgba(40, 167, 69, 0.12)');
                
                // Bootstrap Overrides
                root.setProperty('--bs-primary', '#28a745');
                root.setProperty('--bs-primary-rgb', '40, 167, 69');
                root.setProperty('--bs-secondary', '#8b5a2b');
                root.setProperty('--bs-secondary-rgb', '139, 90, 43');
                root.setProperty('--bs-success', '#20c997');
                root.setProperty('--bs-success-rgb', '32, 201, 151');
                root.setProperty('--bs-warning', '#ffc107');
                root.setProperty('--bs-warning-rgb', '255, 193, 7');
                root.setProperty('--bs-danger', '#d9534f');
                root.setProperty('--bs-danger-rgb', '217, 83, 79');
                root.setProperty('--bs-info', '#17a2b8');
                root.setProperty('--bs-info-rgb', '23, 162, 184');
                break;
                
            case 'ubuntu':
                // GlassKit Base (Aubergine)
                root.setProperty('--bg-color', '#2c001e');
                root.setProperty('--grad1-color', 'rgba(119, 33, 111, 0.8)');
                root.setProperty('--grad2-color', 'rgba(44, 0, 30, 0.9)');
                root.setProperty('--grad3-color', 'rgba(94, 39, 80, 0.8)');
                root.setProperty('--orb-color', 'rgba(233, 84, 32, 0.15)');
                
                // Bootstrap Overrides
                root.setProperty('--bs-primary', '#e95420'); // Yaru Orange
                root.setProperty('--bs-primary-rgb', '233, 84, 32');
                root.setProperty('--bs-secondary', '#77216f'); // Aubergine Light
                root.setProperty('--bs-secondary-rgb', '119, 33, 111');
                root.setProperty('--bs-success', '#38b44a'); // Yaru Green
                root.setProperty('--bs-success-rgb', '56, 180, 74');
                root.setProperty('--bs-warning', '#e9b949');
                root.setProperty('--bs-warning-rgb', '233, 185, 73');
                root.setProperty('--bs-danger', '#c7162b'); // Yaru Red
                root.setProperty('--bs-danger-rgb', '199, 22, 43');
                root.setProperty('--bs-info', '#19b6ee');
                root.setProperty('--bs-info-rgb', '25, 182, 238');
                break;

            default: // Original
                // GlassKit Base
                root.setProperty('--bg-color', '#0f1115');
                root.setProperty('--grad1-color', 'rgba(25, 30, 45, 1)');
                root.setProperty('--grad2-color', 'rgba(20, 25, 40, 1)');
                root.setProperty('--grad3-color', 'rgba(15, 20, 30, 1)');
                root.setProperty('--orb-color', 'rgba(240, 13, 210, 0.08)');
                
                // Bootstrap Overrides (Restablecer a por defecto)
                root.setProperty('--bs-primary', '#0d6efd');
                root.setProperty('--bs-primary-rgb', '13, 110, 253');
                root.setProperty('--bs-secondary', '#6c757d');
                root.setProperty('--bs-secondary-rgb', '108, 117, 125');
                root.setProperty('--bs-success', '#198754');
                root.setProperty('--bs-success-rgb', '25, 135, 84');
                root.setProperty('--bs-warning', '#ffc107');
                root.setProperty('--bs-warning-rgb', '255, 193, 7');
                root.setProperty('--bs-danger', '#dc3545');
                root.setProperty('--bs-danger-rgb', '220, 53, 69');
                root.setProperty('--bs-info', '#0dcaf0');
                root.setProperty('--bs-info-rgb', '13, 202, 240');
                break;
        }

        // Leer los colores actuales para enviarlos a otros componentes
        const computedStyle = getComputedStyle(document.documentElement);
        
        window.dispatchEvent(new CustomEvent('glasskit-theme-changed', {
            detail: { 
                theme: themeName,
                primary: root.getPropertyValue('--bs-primary') || '#0d6efd',
                secondary: root.getPropertyValue('--bs-secondary') || '#6c757d',
                success: root.getPropertyValue('--bs-success') || '#198754'
            }
        }));

        console.log(`[ThemeManager] Tema cambiado a: ${themeName} (Bootstrap Colors Sobrescritos)`);

        // Resaltar botón activo si existe
        const activeBtn = document.querySelector(`.theme-btn[data-theme="${themeName}"]`);
        if (activeBtn) activeBtn.classList.add('border-primary');
    }
}
