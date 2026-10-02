(function () {

  /* ── NAV + FOOTER INJECTION ── */
  function inject() {
    var isIndex = !!document.getElementById('services');
    function href(hash) { return isIndex ? hash : 'index.html' + hash; }

    var navHTML =
      '<nav>' +
      '<a href="' + (isIndex ? '#' : 'index.html') + '" class="logo">GENS<span class="logo-n">O</span></a>' +
      '<ul class="nav-links">' +
      '<li><a href="' + href('#services') + '">サービス</a></li>' +
      '<li><a href="' + href('#brands') + '">ブランド</a></li>' +
      '<li><a href="shiryou.html">金額はこちら</a></li>' +
      '<li><a href="about.html">GENSOについて</a></li>' +
      '<li><a href="contact.html" class="nav-cta nav-cta-outline">お問い合わせ</a></li>' +
      '<li><a href="shiryou.html" class="nav-cta">資料請求</a></li>' +
      '</ul></nav>';

    var footerHTML =
      '<footer>' +
      '<a href="' + (isIndex ? '#' : 'index.html') + '" class="back-link">← GENSOトップへ</a>' +
      '<p>© 2026 GENSO</p>' +
      '</footer>';

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    var ft = document.getElementById('site-footer');
    if (ft) ft.outerHTML = footerHTML;
  }

  /* ── SCROLL FADE-IN ANIMATIONS ── */
  function initAnimations() {
    if (!window.IntersectionObserver) return;

    /* CSS: hidden state → visible state */
    var style = document.createElement('style');
    style.textContent =
      '.gsn{opacity:0;will-change:opacity,transform;transition:opacity .75s cubic-bezier(.25,.46,.45,.94),transform .75s cubic-bezier(.25,.46,.45,.94);}' +
      '.gsn.gsn-u{transform:translateY(56px);}' +
      '.gsn.gsn-l{transform:translateX(-72px);}' +
      '.gsn.gsn-r{transform:translateX(72px);}' +
      '.gsn.gsn-in{opacity:1!important;transform:none!important;}';
    document.head.appendChild(style);

    /* IntersectionObserver */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var delay = parseInt(el.dataset.gd) || 0;
        setTimeout(function () { el.classList.add('gsn-in'); }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    /* Mark helper */
    function mark(el, dir, delay) {
      if (!el || el.classList.contains('gsn')) return;
      el.classList.add('gsn', 'gsn-' + dir);
      if (delay) el.dataset.gd = String(delay);
      io.observe(el);
    }

    /* Slight randomness: ~20% of elements use 'u' instead of l/r */
    function rd(defaultDir) {
      return Math.random() < 0.2 ? 'u' : defaultDir;
    }

    /* Run after inject() has inserted nav */
    setTimeout(function () {
      var heroFound = false;

      Array.from(document.body.children).forEach(function (section) {
        var tag = section.tagName;
        if (tag === 'NAV' || tag === 'FOOTER' || tag === 'SCRIPT' || tag === 'STYLE' || tag === 'LINK') return;
        if (section.id === 'site-footer') return;
        if (section.classList.contains('ticker-strip')) return;

        /* Hero: mark as boundary, skip */
        if (section.classList.contains('hero')) { heroFound = true; return; }
        if (!heroFound) return;

        /* ── #services: 3 panels stagger up ── */
        if (section.id === 'services') {
          Array.from(section.children).forEach(function (p, i) {
            mark(p, 'u', i * 130);
          });
          return;
        }

        /* ── #ceo / .ceo-section: photo from left, content from right ── */
        if (section.id === 'ceo' || section.classList.contains('ceo-section')) {
          Array.from(section.children).forEach(function (k, i) {
            mark(k, rd(i % 2 === 0 ? 'l' : 'r'), i * 120);
          });
          return;
        }

        /* ── #brands: heading up, cards stagger ── */
        if (section.id === 'brands') {
          var bh = section.querySelector('.brands-heading');
          if (bh) mark(bh, 'u', 0);
          Array.from(section.querySelectorAll('.brand-card')).forEach(function (c, i) {
            mark(c, 'u', 120 + i * 110);
          });
          return;
        }

        /* ── #contact: whole section up ── */
        if (section.id === 'contact') { mark(section, 'u', 0); return; }

        /* ── .cta-band ── */
        if (section.classList.contains('cta-band')) { mark(section, 'u', 0); return; }

        /* ── sections with 2-column grids ── */
        var grid = section.querySelector('.content-grid, .info-grid, .about-grid');
        if (grid) {
          var lbl = section.querySelector('.section-label, .message-lead');
          if (lbl) mark(lbl, 'u', 0);
          Array.from(grid.children).forEach(function (k, i) {
            mark(k, rd(i % 2 === 0 ? 'l' : 'r'), 80 + i * 130);
          });
          return;
        }

        /* ── photo rows ── */
        var prow = section.querySelector('.photo-row');
        if (prow) {
          Array.from(prow.children).forEach(function (p, i) {
            mark(p, rd(i === 0 ? 'l' : 'r'), i * 110);
          });
          return;
        }

        /* ── shiryou: doc items ── */
        var docs = section.querySelectorAll('.doc-item');
        if (docs.length) {
          Array.from(docs).forEach(function (d, i) { mark(d, 'u', i * 100); });
          return;
        }

        /* ── forms ── */
        if (section.classList.contains('form-section')) { mark(section, 'u', 0); return; }

        /* ── default: fade up ── */
        mark(section, 'u', 0);
      });

      /* Feature-list items: stagger from right (if not already marked) */
      document.querySelectorAll('.feature-list li').forEach(function (li, i) {
        mark(li, rd('r'), i * 70);
      });

      /* Info table rows */
      document.querySelectorAll('.info-table tr').forEach(function (tr, i) {
        mark(tr, rd('r'), i * 60);
      });

    }, 0);
  }

  /* ── BOOT ── */
  function boot() { inject(); initAnimations(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
