window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // 0. Movimiento sutil de las luces del fondo ambiental (Contra-parallax)
    const orb1 = document.getElementById('orb-1');
    const orb2 = document.getElementById('orb-2');
    if (orb1 && orb2) {
        orb1.style.transform = `translate(${scrolled * 0.05}px, ${scrolled * 0.08}px)`;
        orb2.style.transform = `translate(${scrolled * -0.03}px, ${scrolled * -0.05}px)`;
    }

    // 1. Efecto Parallax en el Fondo del Hero Principal
    const heroBg = document.querySelector('.parallax-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
    }

    // 2. Desvanecimiento Cinemático por Secciones Completas
    const secciones = document.querySelectorAll('.row-luxury, .soul-content, .texture-grid, .sales-card');
    
    secciones.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const secCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;

        const distance = Math.abs(screenCenter - secCenter);
        const fadeRange = 550; 
        
        let opacity = 1 - (distance / fadeRange);
        
        if (opacity < 0) opacity = 0;
        if (opacity > 1) opacity = 1;

        if (rect.top < windowHeight && rect.bottom > 0) {
            sec.style.opacity = opacity;
            const translateY = (screenCenter - secCenter) * 0.04;
            sec.style.transform = `translateY(${translateY}px)`;
        }
    });
});

// Animación de entrada exclusiva para el título al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1.6s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// LÓGICA DE LA PANTALLA DE INTRO CON VIDEO
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('intro-preloader');
    const btnEntrar = document.getElementById('btn-entrar');

    // Bloqueamos el scroll del cuerpo al cargar para congelar la pantalla trasera
    document.body.classList.add('no-scroll');

    if (btnEntrar && preloader) {
        btnEntrar.addEventListener('click', () => {
            // Ejecuta la animación de desvanecimiento y zoom en el CSS
            preloader.classList.add('fade-out');

            // Permitimos el scroll de nuevo una vez que la intro desaparece
            document.body.classList.remove('no-scroll');
        });
    }
});