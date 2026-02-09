/* ============================================
   NEUROPLASTIC LABS — Website Scripts
   Scroll animations, nav behavior, mobile menu
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Nav scroll behavior ---
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            nav.classList.add('is-scrolled');
        } else {
            nav.classList.remove('is-scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // --- Mobile menu ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-open');
        mobileMenu.classList.toggle('is-open');
        document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav__mobile-link, .nav__mobile-cta').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-open');
            mobileMenu.classList.remove('is-open');
            document.body.style.overflow = '';
        });
    });

    // --- Scroll-triggered animations ---
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseFloat(el.dataset.delay) || 0;

                setTimeout(() => {
                    el.classList.add('is-visible');
                }, delay * 1000);

                observer.unobserve(el);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Parallax on hero background ---
    const heroBg = document.querySelector('.hero__bg');

    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            heroBg.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }

    // --- Active nav link highlighting ---
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav__link').forEach(link => link.classList.remove('is-active'));
                    navLink.classList.add('is-active');
                }
            }
        });
    }, { passive: true });
});
