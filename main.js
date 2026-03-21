/**
 * WinIT — Main front-end behaviour
 * Sticky header · mobile nav · contact form · scroll reveal
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
    var ticking = false;
    function updateScrolled() {
      ticking = false;
      if (window.scrollY > 48) HEADER.classList.add('is-scrolled');
      else HEADER.classList.remove('is-scrolled');
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrolled);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrolled();
  }

  /* ------------------------------------------------------------------
     Mobile nav toggle
  ------------------------------------------------------------------ */
  function initMobileMenu() {
    if (!BTN_MENU || !NAV_MOBILE) return;

    var firstLink = NAV_MOBILE.querySelector('a');

    function open() {
      BTN_MENU.setAttribute('aria-expanded', 'true');
      BTN_MENU.setAttribute('aria-label', 'Close menu');
      NAV_MOBILE.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (firstLink) firstLink.focus();
    }

    function close() {
      if (BTN_MENU.getAttribute('aria-expanded') !== 'true') return;
      BTN_MENU.setAttribute('aria-expanded', 'false');
      BTN_MENU.setAttribute('aria-label', 'Open menu');
      NAV_MOBILE.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      BTN_MENU.focus();
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
    var errMsg     = document.getElementById('error-message');
    var errConsent = document.getElementById('error-consent');

    function setError(el, msg) { if (el) el.textContent = msg || ''; }

    function validate() {
      var ok = true;
      setError(errName, ''); setError(errEmail, ''); setError(errMsg, ''); setError(errConsent, '');

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
      if (!consentEl || !consentEl.checked) {
        setError(errConsent, 'Please agree to the privacy policy so we can contact you.');
        ok = false;
      }
      return ok;
    }

    CONTACT_FORM.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      CONTACT_FORM.reset();
      setError(errName, ''); setError(errEmail, ''); setError(errMsg, ''); setError(errConsent, '');
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
