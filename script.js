/* ==========================================================================
   ARGA ARQUITECTOS - INTERACTIVIDAD Y LÓGICA JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Menú Hamburguesa para Móviles
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });

    // 2. Efecto Header al hacer Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Galería Lightbox (Ampliación de imágenes)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-src');
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.style.display = 'flex';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });

    // 4. Calculadora Interactiva de Presupuesto / Cotizador
    const serviceSelect = document.getElementById('service-type');
    const areaInput = document.getElementById('area');
    const qualitySelect = document.getElementById('quality');
    const totalPriceEl = document.getElementById('total-price');
    const btnSendQuote = document.getElementById('btn-send-quote');

    // Tarifas base estimadas por m² (MXN)
    const rates = {
        diseno: { estandar: 350, media: 550, alta: 900 },
        construccion: { estandar: 7500, media: 11500, alta: 17000 },
        remodelacion: { estandar: 3500, media: 6000, alta: 9500 },
        mantenimiento: { estandar: 1200, media: 2200, alta: 3800 }
    };

    function calculateEstimate() {
        const service = serviceSelect.value;
        const area = parseFloat(areaInput.value) || 0;
        const quality = qualitySelect.value;

        if (area <= 0) {
            totalPriceEl.textContent = '$0.00 MXN';
            return;
        }

        const unitRate = rates[service][quality];
        const total = area * unitRate;

        // Formatear a Moneda MXN
        const formatted = new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(total);

        totalPriceEl.textContent = formatted;
    }

    serviceSelect.addEventListener('change', calculateEstimate);
    areaInput.addEventListener('input', calculateEstimate);
    qualitySelect.addEventListener('change', calculateEstimate);

    // Inicializar cálculo inicial
    calculateEstimate();

    // Enviar Cotización directamente a WhatsApp de la empresa (33 1409 6890)
    btnSendQuote.addEventListener('click', () => {
        const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
        const areaVal = areaInput.value;
        const qualityText = qualitySelect.options[qualitySelect.selectedIndex].text;
        const estimatedTotal = totalPriceEl.textContent;

        const message = `Hola ARGA Arquitectos, me interesa solicitar una cotización formal.%0A%0A` +
            `*Detalles del Proyecto:*%0A` +
            `- Servicio: ${serviceText}%0A` +
            `- Superficie: ${areaVal} m²%0A` +
            `- Gama de Acabados: ${qualityText}%0A` +
            `- Estimación Automática: ${estimatedTotal}%0A%0A` +
            `Quedo en espera de su respuesta para agendar una cita o revisión.`;

        const whatsappUrl = `https://wa.me/523314096890?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });

    // 5. Envío de Formulario de Contacto
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Muchas gracias por contactar a ARGA Arquitectos! Nos comunicaremos contigo a la brevedad.');
        contactForm.reset();
    });
});