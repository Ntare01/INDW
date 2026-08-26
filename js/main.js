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
    // Determine backend endpoint. If you're serving the static site with
    // Live Server (typically at :5500) use the local contact server at
    // port 3000. Otherwise post to the same origin.
    const origin = window.location.origin;
    let backend = origin;
    if (origin.includes(':5500') || origin.includes(':5501')) {
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
        alert('Failed to send message. Please try again later.');
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
