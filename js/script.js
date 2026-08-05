/* ============================================================
   Dr. Dieison Dahmer | Odontologia Estética — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hidden'), 300);
  });
  // Fallback in case 'load' already fired or takes too long
  setTimeout(() => loader && loader.classList.add('hidden'), 1500);

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  const closeMenu = () => {
    header.classList.remove('nav-open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    io.observe(el);
  });

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  const onScrollTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScrollTop, { passive: true });
  onScrollTop();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
