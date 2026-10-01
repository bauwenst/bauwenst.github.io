/**
 * Click-to-enlarge for article images: dimmed overlay, centered image, fade-in.
 * Re-binds after HydeJack hy-push-state navigations.
 */
(function () {
  "use strict";

  var overlay = null;
  var panelImg = null;
  var closeTimer = null;

  function ensureOverlay() {
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.className = "image-lightbox";
    overlay.hidden = true;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Enlarged image");
    overlay.innerHTML =
      '<button type="button" class="image-lightbox-close" aria-label="Close">&times;</button>' +
      '<div class="image-lightbox-frame">' +
      '<img class="image-lightbox-img" alt="" />' +
      "</div>";

    overlay.addEventListener("click", function (event) {
      if (
        event.target === overlay ||
        event.target.classList.contains("image-lightbox-close")
      ) {
        closeLightbox();
      }
    });

    document.body.appendChild(overlay);
    panelImg = overlay.querySelector(".image-lightbox-img");
    return overlay;
  }

  function openLightbox(src, alt) {
    ensureOverlay();
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }

    panelImg.alt = alt || "";
    overlay.classList.remove("is-open");
    overlay.hidden = false;
    document.documentElement.classList.add("image-lightbox-open");

    // Force layout while still in the pre-fade state (hidden→shown skips
    // transitions unless we paint one frame at opacity 0 first).
    void overlay.offsetWidth;

    function reveal() {
      requestAnimationFrame(function () {
        overlay.classList.add("is-open");
      });
    }

    function showWhenReady() {
      if (overlay.hidden) return;
      if (typeof panelImg.decode === "function") {
        panelImg.decode().then(reveal).catch(reveal);
      } else {
        reveal();
      }
    }

    panelImg.onload = showWhenReady;
    panelImg.src = src;
    if (panelImg.complete) showWhenReady();
  }

  function closeLightbox() {
    if (!overlay || overlay.hidden) return;

    overlay.classList.remove("is-open");
    document.documentElement.classList.remove("image-lightbox-open");

    closeTimer = setTimeout(function () {
      overlay.hidden = true;
      panelImg.removeAttribute("src");
      panelImg.alt = "";
      closeTimer = null;
    }, 220);
  }

  function isLightboxable(img) {
    if (!img || img.tagName !== "IMG") return false;
    if (img.closest(".image-lightbox")) return false;
    if (img.closest("a[href]")) return false; // keep real links
    if (img.closest(".sidebar, .nav-btn-bar, .site-search")) return false;
    // Content images only
    return !!(img.closest("article") || img.closest(".content"));
  }

  function bindImages(root) {
    var scope = root || document;
    var images = scope.querySelectorAll("article img, .content img");

    for (var i = 0; i < images.length; i++) {
      var img = images[i];
      if (!isLightboxable(img)) continue;
      if (img.dataset.lightboxBound === "1") continue;

      img.dataset.lightboxBound = "1";
      img.classList.add("image-lightbox-trigger");
      img.addEventListener("click", onImageClick);
    }
  }

  function onImageClick(event) {
    var img = event.currentTarget;
    openLightbox(img.currentSrc || img.src, img.alt);
  }

  function onKeydown(event) {
    if (event.key === "Escape") closeLightbox();
  }

  function init() {
    bindImages(document);
    document.addEventListener("keydown", onKeydown);

    var pushState = document.getElementById("_pushState");
    if (pushState) {
      pushState.addEventListener("hy-push-state-after", function () {
        bindImages(document);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
