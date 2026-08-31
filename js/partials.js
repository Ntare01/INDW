/* ==========================================================================
   partials.js
   Injects the shared header (desktop nav + mobile bottom tab bar) and
   footer into every page, and marks the current page as active.
   Edit the nav links here ONCE and every page updates.
   ========================================================================== */

/* Tiny cross-browser "ready" signal — avoids relying on the Event
   constructor (unsupported in some older WebViews). Other scripts call
   window.onPartialsReady(fn) instead of listening for a custom event. */
window.__partialsReadyCallbacks = [];
window.__partialsIsReady = false;
window.onPartialsReady = function (fn) {
  if (window.__partialsIsReady) fn();
  else window.__partialsReadyCallbacks.push(fn);
};
function signalPartialsReady() {
  window.__partialsIsReady = true;
  window.__partialsReadyCallbacks.forEach(function (fn) { fn(); });
  window.__partialsReadyCallbacks = [];
}

(function () {
  const NAV_LINKS = [
    { href: "index.html", label: "Home",
      icon: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>' },
    { href: "about.html", label: "About",
      icon: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>' },
    { href: "packages.html", label: "Packages",
      icon: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/>' },
    { href: "media.html", label: "Media",
      icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M9 9l6 3-6 3V9z" fill="currentColor" stroke="none"/>' },
    { href: "events.html", label: "Events",
      icon: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>' },
    { href: "contact.html", label: "Contact",
      icon: '<path d="M3 6l9 7 9-7"/><rect x="3" y="5" width="18" height="14" rx="2"/>' },
  ];

  function currentPage() {
    const path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function buildHeader() {
    const page = currentPage();
    const desktopLinks = NAV_LINKS.map(
      (l) =>
        `<a href="${l.href}" class="${l.href === page ? "active" : ""}">${l.label}</a>`
    ).join("");

    const tabLinks = NAV_LINKS.map(
      (l) => `
      <a href="${l.href}" class="tab-item ${l.href === page ? "active" : ""}">
        <svg viewBox="0 0 24 24">${l.icon}</svg>
        <span>${l.label}</span>
      </a>`
    ).join("");

    return `
    <header class="site-header">
      <div class="header-inner">
        <a href="index.html" class="logo"><img src="assets/images/logo.png" alt="Indinzi Cultural Troupe"></a>
        <nav class="nav-desktop" aria-label="Primary">${desktopLinks}</nav>
        <div class="header-cta">
          <a href="events.html" class="btn btn-outline" style="padding:10px 22px;">Upcoming Events</a>
        </div>
      </div>
    </header>
    <nav class="tab-bar" aria-label="Primary mobile">
      <div class="tab-bar-inner">${tabLinks}</div>
    </nav>`;
  }

  function buildFooter() {
    const year = new Date().getFullYear();
    return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <div class="footer-logo">Indinzi Cultural Troupe</div>
            <p style="max-width:34ch;">Keepers of rhythm, dance and story — carrying tradition into every performance.</p>
            <div class="social-icons-circle" style="margin-top:16px;">
              <a href="https://wa.me/250785038287" class="icon whatsapp" aria-label="WhatsApp" target="_blank" rel="noopener">
                <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
              </a>
              <a href="https://www.instagram.com/___indinziculturaltroupe___/" class="icon instagram" aria-label="Instagram" target="_blank" rel="noopener">
                <i class="fa-brands fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="https://www.tiktok.com/@indinzi_cultural_troupe" class="icon tiktok" aria-label="TikTok" target="_blank" rel="noopener">
                <i class="fa-brands fa-tiktok" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div class="footer-col">
            <h5>Explore</h5>
            <a href="about.html">About Us</a>
            <a href="media.html">Media</a>
            <a href="events.html">Events</a>
            <a href="contact.html">Contact</a>
          </div>
          <div class="footer-col">
              <h5>Get in touch</h5>
              <a href="mailto:indinziculturetroupe@gmail.com">indinziculturetroupe@gmail.com</a>
              <div style="display:flex;flex-direction:column;gap:6px; margin-top:8px; color:var(--ink-soft); font-size:0.95rem;">
                <span>+250 785 038 287</span>
                <span>+250 785 864 543</span>
                <span>+1 (520) 637-2966</span>
              </div>
              <p style="margin-top:8px;">Kigali, Rwanda</p>
            </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${year} Indinzi Cultural Troupe. All rights reserved.</span>
          <span>Built with care for tradition.</span>
        </div>
      </div>
    </footer>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Ensure Font Awesome stylesheet is present for brand icons (CDN fallback)
    (function ensureFontAwesome(){
      const href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      if (!document.querySelector('link[href="' + href + '"]')){
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = href;
        l.crossOrigin = 'anonymous';
        document.head.appendChild(l);
      }
    })();
    const headerMount = document.getElementById("site-header");
    const footerMount = document.getElementById("site-footer");
    if (headerMount) headerMount.outerHTML = buildHeader();
    if (footerMount) footerMount.outerHTML = buildFooter();
    signalPartialsReady();
  });
})();
