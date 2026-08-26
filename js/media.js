/* ==========================================================================
   media.js
   Renders the Instagram-Discover-style grid from MEDIA_ITEMS (see
   media-data.js) and drives the filter chips + lightbox viewer.
   ========================================================================== */

(function () {
  // Debug: report media-data load status
  try {
    console.info("media.js initializing. MEDIA_ITEMS defined:", typeof MEDIA_ITEMS !== 'undefined');
    if (typeof MEDIA_ITEMS !== 'undefined') console.info("MEDIA_ITEMS length:", MEDIA_ITEMS.length);
  } catch (e) {
    console.error("media.js debug check failed:", e);
  }
  let filteredItems = [];
  let lightboxIndex = 0;

  const grid = document.getElementById("discover-grid");
  const emptyState = document.getElementById("media-empty");

  const lightbox = document.getElementById("lightbox");
  const lightboxStage = document.getElementById("lightbox-stage");
  const lightboxCaption = document.getElementById("lightbox-caption");

  function iconPlay() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>`;
  }
  function iconVideoBadge() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 10l5-3v10l-5-3"/><rect x="1" y="6" width="14" height="12" rx="2"/></svg>`;
  }

  function getItems() {
    return MEDIA_ITEMS || [];
  }

  function renderGrid() {
    try {
      filteredItems = getItems();
    } catch (e) {
      console.error('Error filtering MEDIA_ITEMS:', e);
      const err = document.createElement('div');
      err.style.color = 'red';
      err.textContent = 'Media load error — check console for details.';
      grid.parentNode.insertBefore(err, grid);
      return;
    }
    grid.innerHTML = "";

    if (!filteredItems.length) {
      emptyState.style.display = "block";
      return;
    }
    emptyState.style.display = "none";

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const tile = entry.target;
          const media = tile.querySelector('img[data-src], video[data-src]');
          if (media) {
            const dataSrc = media.getAttribute('data-src');
            if (media.tagName === 'IMG') {
              media.src = dataSrc;
              media.removeAttribute('data-src');
              media.decode && media.decode().catch(()=>{});
            } else if (media.tagName === 'VIDEO') {
              media.src = dataSrc;
              media.removeAttribute('data-src');
              media.load();
            }
          }
          obs.unobserve(tile);
        });
      },
      { root: null, rootMargin: '200px', threshold: 0.1 }
    );

    filteredItems.forEach((item, index) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "tile" + (item.big ? " big" : "");
      tile.setAttribute("aria-label", item.caption || "Open media");

      const thumbSrc = item.src;
      // Use data-src so we only start loading when the tile intersects
      const mediaTag = item.type === "video"
        ? `<video data-src="${item.src}" muted playsinline preload="metadata"></video>`
        : `<img data-src="${thumbSrc}" alt="${item.caption || ""}" loading="lazy">`;

      tile.innerHTML = `
        ${mediaTag}
        ${item.type === "video" ? `<span class="tile-icon">${iconVideoBadge()}</span>` : ""}
        ${item.type === "video" ? `<span class="tile-play">${iconPlay()}</span>` : ""}
        <span class="tile-caption-hint"><span>${item.caption || ""}</span></span>
      `;

      // Play preview on hover (desktop) to reduce CPU/network load.
      if (item.type === "video") {
        const onEnter = (e) => {
          try { const v = tile.querySelector('video'); if (v && v.paused) { v.play().catch(()=>{}); } } catch (err) {}
        };
        const onLeave = (e) => {
          try { const v = tile.querySelector('video'); if (v && !v.paused) { v.pause(); v.currentTime = 0; } } catch (err) {}
        };
        tile.addEventListener('mouseenter', onEnter);
        tile.addEventListener('mouseleave', onLeave);
        // For touch devices, don't autoplay — open lightbox on click/tap
      }

      tile.addEventListener("click", () => openLightbox(index));
      grid.appendChild(tile);
      // Observe the tile so its media loads when it comes near the viewport
      observer.observe(tile);
    });
    console.info('media.js rendered items:', filteredItems.length);
  }

  function openLightbox(index) {
    lightboxIndex = index;
    renderLightbox();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxStage.innerHTML = "";
    document.body.style.overflow = "";
  }

  function renderLightbox() {
    const item = filteredItems[lightboxIndex];
    if (!item) return;

    lightboxStage.innerHTML =
      item.type === "video"
        ? `<video src="${item.src}" controls autoplay playsinline></video>`
        : `<img src="${item.src}" alt="${item.caption || ""}">`;

    lightboxCaption.textContent = item.caption || "";
  }

  function step(delta) {
    if (!filteredItems.length) return;
    lightboxIndex = (lightboxIndex + delta + filteredItems.length) % filteredItems.length;
    renderLightbox();
  }

  // No filter chips in simple gallery

  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev").addEventListener("click", () => step(-1));
  document.getElementById("lightbox-next").addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  if (typeof window.onPartialsReady === "function") {
    window.onPartialsReady(renderGrid);
  } else {
    renderGrid();
  }
})();
