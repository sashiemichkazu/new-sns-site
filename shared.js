(function () {
  function inject() {
    // Detect if we are on the main page by checking for the #services section
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
