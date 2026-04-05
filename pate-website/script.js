/* ============================================
   PATÉ — Premium Interactions & Animations
   ============================================ */

(function () {
  'use strict';

  // --- Loader ---
  const loader = document.getElementById('loader');
  const progress = loader?.querySelector('.loader__progress');
  let loadProgress = 0;

  function advanceLoader() {
    loadProgress += Math.random() * 30 + 10;
    if (loadProgress > 100) loadProgress = 100;
    if (progress) progress.style.width = loadProgress + '%';
    if (loadProgress < 100) {
      setTimeout(advanceLoader, 200 + Math.random() * 300);
    }
  }
  advanceLoader();

  window.addEventListener('load', function () {
    if (progress) progress.style.width = '100%';
    setTimeout(function () {
      if (loader) loader.classList.add('is-hidden');
      document.body.style.overflow = '';
      animateHero();
    }, 600);
  });

  document.body.style.overflow = 'hidden';

  // --- Custom Cursor ---
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');
    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
    });

    (function moveCursor() {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      if (cursor) cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      requestAnimationFrame(moveCursor);
    })();

    // Hover detection
    var hoverTargets = 'a, button, input, [role="button"], .product-card, .collection-card';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverTargets)) cursor.classList.add('is-hovering');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverTargets)) cursor.classList.remove('is-hovering');
    });
  }

  // --- Navigation scroll effect ---
  var nav = document.getElementById('nav');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    if (nav) {
      if (scrollY > 80) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }
    lastScroll = scrollY;
  }, { passive: true });

  // --- Mobile Menu ---
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.contains('is-open');
      mobileMenu.classList.toggle('is-open');
      menuToggle.classList.toggle('is-active');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on link click
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Hero entrance animation ---
  function animateHero() {
    var reveals = document.querySelectorAll('.hero .reveal');
    reveals.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('is-visible');
      }, 200 + i * 150);
    });
  }

  // --- Scroll Reveal ---
  var revealElements = document.querySelectorAll('.reveal:not(.hero .reveal)');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // --- Collections Horizontal Scroll ---
  var scroller = document.getElementById('collectionsScroller');
  var scrollPrev = document.getElementById('scrollPrev');
  var scrollNext = document.getElementById('scrollNext');
  var scrollProgressBar = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    if (!scroller || !scrollProgressBar) return;
    var max = scroller.scrollWidth - scroller.clientWidth;
    var pct = max > 0 ? (scroller.scrollLeft / max) * 100 : 0;
    scrollProgressBar.style.width = Math.max(10, pct) + '%';
  }

  if (scroller) {
    scroller.addEventListener('scroll', updateScrollProgress, { passive: true });

    if (scrollPrev) {
      scrollPrev.addEventListener('click', function () {
        scroller.scrollBy({ left: -400, behavior: 'smooth' });
      });
    }

    if (scrollNext) {
      scrollNext.addEventListener('click', function () {
        scroller.scrollBy({ left: 400, behavior: 'smooth' });
      });
    }
  }

  // --- Stat Counter Animation ---
  var statNumbers = document.querySelectorAll('.story__stat-number');

  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(function (el) {
    statObserver.observe(el);
  });

  function animateNumber(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1500;
    var start = performance.now();

    function update(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // --- Smooth anchor scrolling ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Newsletter form interaction ---
  var newsletterForm = document.querySelector('.newsletter__form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = this.querySelector('.newsletter__input');
      var btn = this.querySelector('.newsletter__submit-text');
      if (input && input.value && btn) {
        btn.textContent = 'Subscribed';
        input.value = '';
        input.placeholder = 'Welcome to the inner circle.';
        setTimeout(function () {
          btn.textContent = 'Subscribe';
          input.placeholder = 'Enter your email';
        }, 3000);
      }
    });
  }

  // --- Parallax-like subtle movement on hero ---
  var heroContent = document.querySelector('.hero__content');
  if (heroContent && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 8;
      var y = (e.clientY / window.innerHeight - 0.5) * 5;
      heroContent.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });
  }

})();
