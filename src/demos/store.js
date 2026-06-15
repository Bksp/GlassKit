import html from './store.html?raw';

export function init(container) {
    container.innerHTML = html;

    window.setStoreView = function(mode, btn) {
        // Update active button
        const btnGroup = btn.closest('.btn-group');
        if (btnGroup) {
            btnGroup.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }

        const grid = document.getElementById('store-products-grid');
        if (!grid) return;
        
        const cards = grid.querySelectorAll('.glass-card');
        const cols = grid.querySelectorAll('[class*="col-"]');
        
        if (mode === 'grid-lg') {
            cols.forEach(col => col.className = 'col-sm-6 col-md-4 col-xl-3');
            cards.forEach(card => {
                card.classList.remove('flex-row');
                card.classList.add('flex-column');
                const imgDiv = card.querySelector('.bg-dark');
                if (imgDiv) {
                    imgDiv.style.height = '180px';
                    imgDiv.style.width = '100%';
                    imgDiv.classList.remove('border-end');
                    imgDiv.classList.add('border-bottom');
                }
                const bodyDiv = card.querySelector('.flex-column.flex-grow-1');
                if (bodyDiv) {
                    bodyDiv.classList.remove('justify-content-center');
                }
            });
        } else if (mode === 'grid-sm') {
            cols.forEach(col => col.className = 'col-6 col-sm-4 col-md-3 col-xl-2');
            cards.forEach(card => {
                card.classList.remove('flex-row');
                card.classList.add('flex-column');
                const imgDiv = card.querySelector('.bg-dark');
                if (imgDiv) {
                    imgDiv.style.height = '120px';
                    imgDiv.style.width = '100%';
                    imgDiv.classList.remove('border-end');
                    imgDiv.classList.add('border-bottom');
                }
                const bodyDiv = card.querySelector('.flex-column.flex-grow-1');
                if (bodyDiv) {
                    bodyDiv.classList.remove('justify-content-center');
                }
            });
        } else if (mode === 'list') {
            cols.forEach(col => col.className = 'col-12');
            cards.forEach(card => {
                card.classList.remove('flex-column');
                card.classList.add('flex-row');
                const imgDiv = card.querySelector('.bg-dark');
                if (imgDiv) {
                    imgDiv.style.height = 'auto';
                    imgDiv.style.width = '200px';
                    imgDiv.classList.remove('border-bottom');
                    imgDiv.classList.add('border-end');
                }
                const bodyDiv = card.querySelector('.flex-column.flex-grow-1');
                if (bodyDiv) {
                    bodyDiv.classList.add('justify-content-center');
                }
            });
        }
    }
}