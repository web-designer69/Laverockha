(function () {
    var s = document.getElementById('shutter');
    var t = document.getElementById('toggle');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var canObserve = 'IntersectionObserver' in window;
  
     /* ---------- shutter ---------- */
  function up() {
    s.classList.remove('down');
    t.textContent = 'Close shutter';
    t.setAttribute('aria-pressed', 'false');
    t.tabIndex = 0;
  }

  function down() {
    s.classList.add('down');
    t.textContent = 'Open shutter';
    t.setAttribute('aria-pressed', 'true');
    t.tabIndex = -1;
  }

  // Start closed, then roll up
  s.classList.add('down');
  t.tabIndex = -1;
  s.getBoundingClientRect();
  if (!reduce) setTimeout(up, 500);
  else s.classList.remove('down');

  s.addEventListener('click', up);
  t.addEventListener('click', function () {
    s.classList.contains('down') ? up() : down();
  });
  
    /* ---------- button press effect ---------- */
    if (!reduce) {
      document.querySelectorAll('.btn, .hero-toggle').forEach(function (button) {
        button.addEventListener('pointerdown', function () { button.classList.add('is-pressed'); });
        ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (type) {
          button.addEventListener(type, function () { button.classList.remove('is-pressed'); });
        });
      });
    }
  
    /* ---------- scroll reveal (footer deliberately excluded) ---------- */
    var revealItems = document.querySelectorAll('#about .wrap, #menu .wrap, #visit .wrap');
  
    if (!reduce && canObserve) {
      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.1 });
  
      revealItems.forEach(function (item) {
        item.classList.add('reveal');
        revealObserver.observe(item);
      });
    }
  
    /* ---------- menu card stagger ---------- */
    var menuCards = document.querySelectorAll('.col');
  
    if (!reduce && canObserve) {
      var menuObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('menu-revealed');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
  
      menuCards.forEach(function (card, index) {
        card.classList.add('menu-reveal');
        card.style.setProperty('--d', (index * 100) + 'ms');
        menuObserver.observe(card);
      });
    }
  
    /* ---------- hero entrance ---------- */
    if (!reduce) {
      var heroBody = document.querySelector('.hero-body');
      heroBody.classList.add('hero-load');
      heroBody.getBoundingClientRect();
      requestAnimationFrame(function () { heroBody.classList.add('hero-loaded'); });
    }
  })();