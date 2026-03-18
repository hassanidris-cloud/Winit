/**
 * WinIT — Main front-end behaviour
 * Sticky header · mobile nav · contact form · testimonial carousel · scroll reveal
 */
(function () {
  'use strict';

  var HEADER       = document.getElementById('site-header');
  var BTN_MENU     = document.getElementById('btn-menu');
  var NAV_MOBILE   = document.getElementById('nav-mobile');
  var CONTACT_FORM = document.getElementById('contact-form');
  var YEAR_EL      = document.getElementById('year');

  /* ------------------------------------------------------------------
     Sticky header
  ------------------------------------------------------------------ */
  function initHeader() {
    if (!HEADER) return;
    function onScroll() {
      if (window.scrollY > 48) HEADER.classList.add('is-scrolled');
      else HEADER.classList.remove('is-scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------
     Mobile nav toggle
  ------------------------------------------------------------------ */
  function initMobileMenu() {
    if (!BTN_MENU || !NAV_MOBILE) return;

    function open() {
      BTN_MENU.setAttribute('aria-expanded', 'true');
      NAV_MOBILE.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      BTN_MENU.setAttribute('aria-expanded', 'false');
      NAV_MOBILE.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    BTN_MENU.addEventListener('click', function () {
      BTN_MENU.getAttribute('aria-expanded') === 'true' ? close() : open();
    });

    NAV_MOBILE.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ------------------------------------------------------------------
     Contact form validation
  ------------------------------------------------------------------ */
  function initContactForm() {
    if (!CONTACT_FORM) return;

    var nameEl    = document.getElementById('contact-name');
    var emailEl   = document.getElementById('contact-email');
    var messageEl = document.getElementById('contact-message');
    var consentEl = document.getElementById('contact-consent');
    var errName   = document.getElementById('error-name');
    var errEmail  = document.getElementById('error-email');
    var errMsg    = document.getElementById('error-message');

    function setError(el, msg) { if (el) el.textContent = msg || ''; }

    function validate() {
      var ok = true;
      setError(errName, ''); setError(errEmail, ''); setError(errMsg, '');

      if (!nameEl || !nameEl.value.trim()) {
        setError(errName, 'Please enter your name.');
        ok = false;
      }
      if (!emailEl || !emailEl.value.trim()) {
        setError(errEmail, 'Please enter your email.');
        ok = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
        setError(errEmail, 'Please enter a valid email address.');
        ok = false;
      }
      if (!messageEl || !messageEl.value.trim()) {
        setError(errMsg, 'Please enter a message.');
        ok = false;
      }
      if (!consentEl || !consentEl.checked) ok = false;
      return ok;
    }

    CONTACT_FORM.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      CONTACT_FORM.reset();
      setError(errName, ''); setError(errEmail, ''); setError(errMsg, '');
      var submitBtn = CONTACT_FORM.querySelector('[type="submit"]');
      if (submitBtn) {
        var orig = submitBtn.textContent;
        submitBtn.textContent = 'Sent — we\'ll be in touch.';
        submitBtn.disabled = true;
        setTimeout(function () {
          submitBtn.textContent = orig;
          submitBtn.disabled = false;
        }, 3500);
      }
    });
  }

  /* ------------------------------------------------------------------
     Testimonial carousel
  ------------------------------------------------------------------ */
  function initTestiCarousel() {
    var carousel = document.getElementById('testi-carousel');
    var dots     = document.querySelectorAll('.testi-dot');
    if (!carousel || !dots.length) return;

    var slides  = carousel.querySelectorAll('.testi-slide');
    if (!slides.length) return;

    var current = 0;
    var timer;
    var AUTO_MS = 5500;

    function goTo(index) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      dots[current].setAttribute('aria-selected', 'false');

      current = (index + slides.length) % slides.length;

      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
      dots[current].setAttribute('aria-selected', 'true');
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(function () { goTo(current + 1); }, AUTO_MS);
    }

    function stopAuto() { clearInterval(timer); }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        stopAuto();
        goTo(i);
        startAuto();
      });
    });

    /* Pause on hover */
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    /* Keyboard support on carousel container */
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { stopAuto(); goTo(current + 1); startAuto(); }
      if (e.key === 'ArrowLeft')  { stopAuto(); goTo(current - 1); startAuto(); }
    });

    startAuto();
  }

  /* ------------------------------------------------------------------
     Footer year
  ------------------------------------------------------------------ */
  function initYear() {
    if (YEAR_EL) YEAR_EL.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------
     Scroll reveal (Intersection Observer)
  ------------------------------------------------------------------ */
  function initReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.08 }
    );

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------------------
     Init
  ------------------------------------------------------------------ */
  function init() {
    initHeader();
    initMobileMenu();
    initContactForm();
    initYear();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
