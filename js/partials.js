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
        <a href="index.html" class="logo">Indinzi <span>Troupe</span></a>
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
            <div class="social-row" style="margin-top:16px;">
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1z"/></svg>
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
            <a href="mailto:hello@indinzitroupe.rw">hello@indinzitroupe.rw</a>
            <a href="tel:+250780000000">+250 780 000 000</a>
            <p>Kigali, Rwanda</p>
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
    const headerMount = document.getElementById("site-header");
    const footerMount = document.getElementById("site-footer");
    if (headerMount) headerMount.outerHTML = buildHeader();
    if (footerMount) footerMount.outerHTML = buildFooter();
    signalPartialsReady();
  });
})();
