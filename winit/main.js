/**
 * WinIT — Main front-end behavior
 * Sticky header, mobile nav, search, FAQ accordion, form validation, case slider, scroll reveal
 */
(function () {
  'use strict';

  var ROOT = document.documentElement;
  var HEADER = document.getElementById('site-header');
  var BTN_MENU = document.getElementById('btn-menu');
  var BTN_SEARCH = document.getElementById('btn-search');
  var SEARCH_OVERLAY = document.getElementById('search-overlay');
  var SEARCH_FORM = document.getElementById('search-form');
  var SEARCH_INPUT = document.getElementById('search-input');
  var NAV_MOBILE = document.getElementById('nav-mobile');
  var CONTACT_FORM = document.getElementById('contact-form');
  var CASE_TRACK = document.getElementById('case-track');
  var CASE_PREV = document.getElementById('case-prev');
  var CASE_NEXT = document.getElementById('case-next');
  var YEAR_EL = document.getElementById('year');

  /**
   * Sticky header: add class when scrolled (optional visual tweak)
   */
  function initHeader() {
    if (!HEADER) return;
    var lastY = 0;
    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      if (y > 60) HEADER.classList.add('is-scrolled');
      else HEADER.classList.remove('is-scrolled');
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /**
   * Mobile menu toggle
   */
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
    function toggle() {
      var open = BTN_MENU.getAttribute('aria-expanded') === 'true';
      if (open) close();
      else open();
    }
    BTN_MENU.addEventListener('click', toggle);
    NAV_MOBILE.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /**
   * Search overlay
   */
  function initSearch() {
    if (!BTN_SEARCH || !SEARCH_OVERLAY || !SEARCH_INPUT) return;
    function open() {
      SEARCH_OVERLAY.setAttribute('aria-hidden', 'false');
      SEARCH_INPUT.focus();
      document.body.style.overflow = 'hidden';
    }
    function close() {
      SEARCH_OVERLAY.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      SEARCH_INPUT.value = '';
    }
    BTN_SEARCH.addEventListener('click', open);
    SEARCH_OVERLAY.addEventListener('click', function (e) {
      if (e.target === SEARCH_OVERLAY) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
    if (SEARCH_FORM) {
      SEARCH_FORM.addEventListener('submit', function (e) {
        e.preventDefault();
        var q = (SEARCH_INPUT.value || '').trim();
        if (q) {
          // Placeholder: redirect to search page or trigger client-side search
          window.location.href = '/search?q=' + encodeURIComponent(q);
        }
        close();
      });
    }
  }

  /**
   * FAQ accordion
   */
  function initFaq() {
    var triggers = document.querySelectorAll('.faq-trigger');
    triggers.forEach(function (btn) {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var id = btn.getAttribute('aria-controls');
      var panel = id ? document.getElementById(id) : null;
      if (!panel) return;
      btn.addEventListener('click', function () {
        expanded = !expanded;
        btn.setAttribute('aria-expanded', expanded);
        if (expanded) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      });
    });
  }

  /**
   * Contact form validation
   */
  function initContactForm() {
    if (!CONTACT_FORM) return;
    var name = document.getElementById('contact-name');
    var email = document.getElementById('contact-email');
    var message = document.getElementById('contact-message');
    var consent = document.getElementById('contact-consent');
    var errName = document.getElementById('error-name');
    var errEmail = document.getElementById('error-email');
    var errMessage = document.getElementById('error-message');

    function setError(el, msg) {
      if (!el) return;
      el.textContent = msg || '';
    }

    function validate() {
      var valid = true;
      setError(errName, '');
      setError(errEmail, '');
      setError(errMessage, '');

      if (!name || !name.value.trim()) {
        setError(errName, 'Please enter your name.');
        valid = false;
      }
      if (!email || !email.value.trim()) {
        setError(errEmail, 'Please enter your email.');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        setError(errEmail, 'Please enter a valid email address.');
        valid = false;
      }
      if (!message || !message.value.trim()) {
        setError(errMessage, 'Please enter a message.');
        valid = false;
      }
      if (!consent || !consent.checked) {
        valid = false;
      }
      return valid;
    }

    CONTACT_FORM.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      // Placeholder: submit via fetch or form action
      CONTACT_FORM.reset();
      setError(errName, '');
      setError(errEmail, '');
      setError(errMessage, '');
      if (CONTACT_FORM.querySelector('[type="submit"]')) {
        var btn = CONTACT_FORM.querySelector('[type="submit"]');
        var orig = btn.textContent;
        btn.textContent = 'Sent — we’ll be in touch.';
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = orig;
          btn.disabled = false;
        }, 3000);
      }
    });
  }

  /**
   * Case studies slider (scroll by one card)
   */
  function initCaseSlider() {
    if (!CASE_TRACK || !CASE_PREV || !CASE_NEXT) return;
    var cards = CASE_TRACK.querySelectorAll('.case-card');
    if (cards.length === 0) return;
    var cardWidth = cards[0].offsetWidth;
    var gap = 32;
    var step = cardWidth + gap;

    function scrollTo(index) {
      var max = Math.max(0, cards.length - 1);
      index = Math.max(0, Math.min(index, max));
      CASE_TRACK.scrollTo({ left: index * step, behavior: 'smooth' });
    }

    CASE_PREV.addEventListener('click', function () {
      var index = Math.round(CASE_TRACK.scrollLeft / step) - 1;
      scrollTo(index);
    });
    CASE_NEXT.addEventListener('click', function () {
      var index = Math.round(CASE_TRACK.scrollLeft / step) + 1;
      scrollTo(index);
    });
  }

  /**
   * Footer year
   */
  function initYear() {
    if (YEAR_EL) YEAR_EL.textContent = new Date().getFullYear();
  }

  /**
   * Scroll reveal (Intersection Observer)
   */
  function initReveal() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    var els = document.querySelectorAll('.reveal');
    if (els.length === 0) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
    );
    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * Run on DOM ready
   */
  function init() {
    initHeader();
    initMobileMenu();
    initSearch();
    initFaq();
    initContactForm();
    initCaseSlider();
    initYear();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
