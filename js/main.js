// Manipulação do header no scroll
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('scrolled');
        } else if (currentScroll < lastScroll && currentScroll < 100) {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
});

// Manipulação do modal de contato
function openContactForm() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'block';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContactForm() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) {
        closeContactForm();
    }
}

// Manipulação do formulário
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Adiciona classe de loading no botão
    const submitButton = this.querySelector('.submit-button');
    submitButton.classList.add('button-loading');
    submitButton.textContent = '';

    // Simula envio do formulário
    setTimeout(() => {
        // Remove classe de loading
        submitButton.classList.remove('button-loading');
        submitButton.textContent = 'Enviado com sucesso!';
        
        // Reset do formulário após 2 segundos
        setTimeout(() => {
            this.reset();
            submitButton.textContent = 'Enviar';
            closeContactForm();
        }, 2000);
    }, 1500);
});

// Máscara para o campo de telefone
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 9) {
        value = `${value.slice(0, 9)}-${value.slice(9)}`;
    }
    
    e.target.value = value;
});

// Máscara para o campo de CPF/CNPJ
document.getElementById('document').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) { // CPF
        if (value.length > 9) {
            value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
        } else if (value.length > 6) {
            value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
        } else if (value.length > 3) {
            value = `${value.slice(0, 3)}.${value.slice(3)}`;
        }
    } else { // CNPJ
        if (value.length > 12) {
            value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}-${value.slice(12, 14)}`;
        } else if (value.length > 8) {
            value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8)}`;
        } else if (value.length > 5) {
            value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5)}`;
        } else if (value.length > 2) {
            value = `${value.slice(0, 2)}.${value.slice(2)}`;
        }
    }
    
    e.target.value = value;
});

// Animação suave do scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação dos números nas estatísticas
function animateStats() {
    const stats = document.querySelectorAll('.stat-card h3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'stat-number 1s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os itens
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Abre o item clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Inicializa as animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    animateStats();
});
