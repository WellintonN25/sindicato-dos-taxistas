document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SPA Navigation Logic ---
    const navigateTo = (targetId) => {
        // Esconde todas as páginas
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        // Mostra a página alvo
        const targetPage = document.getElementById(targetId);
        if (targetPage) targetPage.classList.add('active');

        // Atualiza menu ativo
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-target') === targetId);
        });

        // Fecha menu mobile se estiver aberto
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Event Listener Global para cliques (Event Delegation)
    document.body.addEventListener('click', (e) => {
        // Verifica se clicou em algo que tem "data-target"
        const targetLink = e.target.closest('[data-target]');
        if (targetLink) {
            e.preventDefault();
            const pageId = targetLink.getAttribute('data-target');
            navigateTo(pageId);
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // --- 3. Form Handling ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const successMsg = document.getElementById('successMessage');
            contactForm.style.display = 'none';
            successMsg.classList.add('active');

            // Reset após 3 segundos
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMsg.classList.remove('active');
            }, 3000);
        });
    }
});
