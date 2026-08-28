/* ==========================================================================
   main.js — shared site interactions
   ========================================================================== */

// Scroll-reveal for elements with class "reveal"
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));

  // Safety net: if an element is never reported as intersecting (older/
  // quirky viewport engines), reveal it anyway after a short delay so
  // content is never stuck invisible.
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
  }, 1200);
}

// Contact form (front-end only — wire up to a backend / form service later)
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const successMsg = document.getElementById("form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.value,
      email: form.email.value,
      reason: form.reason.value,
      message: form.message.value,
    };
    // Allow overriding the backend at runtime by setting `window.BACKEND_URL`.
    // This makes it easy to point the site at the Render backend once deployed.
    const origin = window.location.origin;
    const BACKEND_URL = (typeof window !== 'undefined' && window.BACKEND_URL) ? window.BACKEND_URL : '';
    // Prefer a hosted backend (Render). If no BACKEND_URL set, default to Render service.
    let backend = BACKEND_URL || 'https://indw.onrender.com';
    // Local dev override when running on Live Server
    if (!BACKEND_URL && (origin.includes(':5500') || origin.includes(':5501'))) {
      backend = 'http://localhost:3000';
    }
    const endpoint = backend.replace(/\/$/, '') + '/send-contact';

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (r) => {
        if (!r.ok) {
          let msg = 'Send failed';
          try {
            const body = await r.json();
            if (body && body.error) msg = body.error;
          } catch (e) {}
          throw new Error(msg);
        }
        form.reset();
        if (successMsg) successMsg.classList.add('show');
      })
      .catch((err) => {
        console.error('Contact send error', err);
        const msg = err && err.message ? err.message : 'Failed to send message. Please try again later.';
        alert('Failed to send message: ' + msg);
      });
  });
}

if (typeof window.onPartialsReady === "function") {
  window.onPartialsReady(() => {
    initReveal();
    initContactForm();
  });
} else {
  // Fallback in case a page has no partials mount
  document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initContactForm();
  });
}
