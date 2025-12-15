document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. NAVEGAÇÃO SPA (Single Page Application)
       ========================================================================== */
    
    // Função principal que troca as telas
    const navigateTo = (targetId) => {
        // 1. Esconde todas as páginas (remove a classe 'active')
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // 2. Mostra a página alvo (adiciona a classe 'active')
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // 3. Atualiza o destaque no menu (classe 'active' no link)
        document.querySelectorAll('.nav-link').forEach(link => {
            // Verifica se o data-target do link é igual ao ID da página atual
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // 4. Se estiver no celular, fecha o menu após clicar
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }

        // 5. Rola suavemente para o topo da página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // "Porteiro" Global: Escuta cliques em qualquer lugar do site
    document.body.addEventListener('click', (e) => {
        // Verifica se o elemento clicado (ou o pai dele) tem o atributo 'data-target'
        const targetLink = e.target.closest('[data-target]');
        
        if (targetLink) {
            e.preventDefault(); // Evita comportamento padrão de link
            const pageId = targetLink.getAttribute('data-target');
            navigateTo(pageId); // Chama a função de navegação
        }
    });


    /* ==========================================================================
       2. MENU MOBILE (Hambúrguer)
       ========================================================================== */
    
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // Alterna a classe .active na lista de links (mostra/esconde)
            navLinks.classList.toggle('active');
        });
    }


    /* ==========================================================================
       3. FORMULÁRIO DE CONTATO (Simulação)
       ========================================================================== */
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento da página
            
            const successMsg = document.getElementById('successMessage');
            
            // Esconde o formulário
            contactForm.style.display = 'none';
            // Mostra mensagem de sucesso
            successMsg.classList.add('active');

            // Espera 3 segundos e reseta tudo
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMsg.classList.remove('active');
            }, 3000);
        });
    }


    /* ==========================================================================
       4. LÓGICA DE LOGIN (Modal e Autenticação Fictícia)
       ========================================================================== */
    
    const loginBtn = document.querySelector('.btn-login'); // Botão no Menu
    const modal = document.getElementById('loginModal');   // O Modal (janela)
    const closeModal = document.querySelector('.close-modal'); // O "X" para fechar
    const loginForm = document.getElementById('loginForm'); // O formulário dentro do modal

    // Abrir Modal ao clicar em "Login"
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    }

    // Fechar Modal ao clicar no "X"
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Fechar Modal ao clicar fora da caixinha (no fundo escuro)
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Simulação do envio do Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Pega os valores digitados
            const emailInput = loginForm.querySelector('input[type="email"]');
            const passInput = loginForm.querySelector('input[type="password"]');
            const submitButton = loginForm.querySelector('button');
            
            const email = emailInput.value;
            const password = passInput.value;
            const originalText = submitButton.innerText;

            // Efeito visual de "Carregando..."
            submitButton.innerText = "Verificando...";
            submitButton.style.opacity = "0.7";
            submitButton.disabled = true;

            // Simula um atraso de 1.5 segundos (como se fosse ao servidor)
            setTimeout(() => {
                // VERIFICAÇÃO DE TESTE (Credenciais: admin@stb.com / 123456)
                if (email === "admin@stb.com" && password === "123456") {
                    alert("Bem-vindo, Administrador!");
                    modal.classList.remove('active'); // Fecha modal
                    
                    // Altera o botão de login para parecer logado
                    loginBtn.innerText = "Olá, Admin";
                    loginBtn.style.background = "#4ade80"; // Verde
                    loginBtn.style.color = "#000";
                    
                    // (Opcional) Limpa o form
                    loginForm.reset();
                } else {
                    alert("Erro: Usuário ou senha incorretos!\n\nDica de teste:\nE-mail: admin@stb.com\nSenha: 123456");
                }

                // Restaura o botão
                submitButton.innerText = originalText;
                submitButton.style.opacity = "1";
                submitButton.disabled = false;
            }, 1500);
        });
    }

});
