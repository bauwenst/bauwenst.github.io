/**
 * Navbar share control: overlay with Copy link, WhatsApp, Instagram DM,
 * Twitter/X, and BibTeX. Mirrors site-search overlay patterns.
 */
(function () {
  "use strict";

  var cfg = window.SiteShareConfig || {};
  var strings = cfg.strings || {};
  var authorName = cfg.author || "Thomas Bauwens";

  var root = null;
  var statusEl = null;
  var open = false;
  var statusTimer = null;

  var BIB_ICON =
    '<svg class="site-share-bib-icon" viewBox="0 0 24 24" width="1.15em" height="1.15em" aria-hidden="true" focusable="false">' +
    '<text x="12" y="16.5" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" font-size="11" font-weight="700" fill="currentColor">{B}</text>' +
    "</svg>";

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fa(code) {
    return (
      "<span class='site-share-fa' style='font-family: FontAwesome' aria-hidden='true'>" +
      code +
      "</span>"
    );
  }

  function pageUrl() {
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href) return canonical.href;
    return window.location.href;
  }

  function pageTitle() {
    var og = document.querySelector('meta[property="og:title"]');
    if (og && og.content) return og.content.trim();
    var t = document.title || "";
    var parts = t.split(/\s*[|\u2013\u2014-]\s*/);
    if (parts.length > 1) return parts[0].trim();
    return t.trim();
  }

  function pageAuthor() {
    var meta = document.querySelector('meta[name="author"]');
    if (meta && meta.content) return meta.content.trim();
    return authorName;
  }

  function pageDate() {
    var time = document.querySelector("time[datetime]");
    if (time && time.getAttribute("datetime")) {
      var d = new Date(time.getAttribute("datetime"));
      if (!isNaN(d.getTime())) return d;
    }
    return new Date();
  }

  function bibtexEscape(s) {
    return String(s)
      .replace(/\\/g, "\\textbackslash{}")
      .replace(/[{}]/g, function (c) {
        return "\\" + c;
      })
      .replace(/[&%$#_]/g, function (c) {
        return "\\" + c;
      });
  }

  function authorBibtex(name) {
    var parts = name.trim().split(/\s+/);
    if (parts.length < 2) return name.trim();
    var last = parts.pop();
    return last + ", " + parts.join(" ");
  }

  function citeKey(author, year, title) {
    var last = author.trim().split(/\s+/).pop().toLowerCase().replace(/[^a-z0-9]/g, "");
    var words = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .join("");
    return (last || "ref") + year + (words || "page");
  }

  function monthBibtex(date) {
    var months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec"
    ];
    return months[date.getMonth()];
  }

  function accessDate() {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var day = d.getDate();
    return (
      y +
      "-" +
      (m < 10 ? "0" : "") +
      m +
      "-" +
      (day < 10 ? "0" : "") +
      day
    );
  }

  function buildBibtex() {
    var title = pageTitle();
    var author = pageAuthor();
    var url = pageUrl();
    var date = pageDate();
    var year = date.getFullYear();
    var key = citeKey(author, year, title);
    return (
      "@misc{" +
      key +
      ",\n" +
      "  author       = {" +
      bibtexEscape(authorBibtex(author)) +
      "},\n" +
      "  title        = {" +
      bibtexEscape(title) +
      "},\n" +
      "  year         = {" +
      year +
      "},\n" +
      "  month        = " +
      monthBibtex(date) +
      ",\n" +
      "  url          = {" +
      url +
      "},\n" +
      "  howpublished = {\\url{" +
      url +
      "}},\n" +
      "  note         = {Accessed: " +
      accessDate() +
      "}\n" +
      "}\n"
    );
  }

  function setStatus(msg, isError) {
    if (!statusEl) return;
    if (statusTimer) {
      clearTimeout(statusTimer);
      statusTimer = null;
    }
    if (!msg) {
      statusEl.hidden = true;
      statusEl.textContent = "";
      statusEl.classList.remove("is-error");
      return;
    }
    statusEl.hidden = false;
    statusEl.textContent = msg;
    statusEl.classList.toggle("is-error", !!isError);
    statusTimer = setTimeout(function () {
      setStatus("");
    }, 2500);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        if (!document.execCommand("copy")) throw new Error("copy failed");
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  function openExternal(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function isLikelyMobile() {
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "")) {
      return true;
    }
    try {
      return (
        navigator.maxTouchPoints > 1 &&
        window.matchMedia("(max-width: 64em)").matches
      );
    } catch (err) {
      return false;
    }
  }

  // Unofficial but widely used: opens the Instagram app share sheet (Send/DM,
  // Stories, etc.) when the app is installed. No official DM-prefill web API.
  function openInstagramShareSheet(text) {
    var deep =
      "instagram://sharesheet?text=" + encodeURIComponent(text || pageUrl());
    var web = "https://www.instagram.com/direct/new/";

    if (!isLikelyMobile()) {
      openExternal(web);
      return;
    }

    var cancelled = false;
    var timer = window.setTimeout(function () {
      if (cancelled || document.hidden) return;
      openExternal(web);
    }, 1200);

    function cancelFallback() {
      if (document.hidden) {
        cancelled = true;
        window.clearTimeout(timer);
        document.removeEventListener("visibilitychange", cancelFallback);
      }
    }
    document.addEventListener("visibilitychange", cancelFallback);

    // location.href is more reliable for custom schemes than window.open.
    window.location.href = deep;
  }

  function shareText() {
    var title = pageTitle();
    var url = pageUrl();
    return title ? title + "\n" + url : url;
  }

  function actions() {
    return [
      {
        id: "copy",
        label: strings.copyLink || "Copy link",
        icon: fa("\uf0c1"),
        run: function () {
          return copyText(pageUrl()).then(function () {
            setStatus(strings.copied || "Copied to clipboard");
          });
        }
      },
      {
        id: "whatsapp",
        label: strings.whatsapp || "WhatsApp",
        icon: fa("\uf232"),
        run: function () {
          openExternal(
            "https://wa.me/?text=" + encodeURIComponent(shareText())
          );
          setStatus("");
          closeShare();
        }
      },
      {
        id: "instagram",
        label: strings.instagram || "Instagram DM",
        icon: fa("\uf16d"),
        run: function () {
          var text = shareText();
          // Always copy as backup — sharesheet may not prefill on all builds,
          // and desktop has no deep link at all.
          return copyText(pageUrl()).then(function () {
            openInstagramShareSheet(text);
            setStatus(
              isLikelyMobile()
                ? strings.instagramHintMobile ||
                    "Link copied — pick a chat in Instagram if needed"
                : strings.instagramHint ||
                    "Link copied — paste it in Instagram"
            );
            if (isLikelyMobile()) closeShare();
          });
        }
      },
      {
        id: "twitter",
        label: strings.twitter || "Twitter / X",
        icon: fa("\uf099"),
        run: function () {
          // Single `text` param (title + newline + URL). Passing `url` separately
          // often puts the link on the same line as the title.
          openExternal(
            "https://twitter.com/intent/tweet?text=" +
              encodeURIComponent(shareText())
          );
          setStatus("");
          closeShare();
        }
      },
      {
        id: "bibtex",
        label: strings.bibtex || "Copy BibTeX",
        icon: BIB_ICON,
        run: function () {
          return copyText(buildBibtex()).then(function () {
            setStatus(strings.bibtexCopied || "BibTeX copied to clipboard");
          });
        }
      }
    ];
  }

  function ensureDom() {
    if (root) return;

    root = document.createElement("div");
    root.id = "site-share";
    root.className = "site-share";
    root.hidden = true;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", strings.share || "Share");

    var items = actions()
      .map(function (a) {
        return (
          '<li><button type="button" class="site-share-action" data-share-action="' +
          a.id +
          '">' +
          a.icon +
          '<span class="site-share-action-label">' +
          escapeHtml(a.label) +
          "</span></button></li>"
        );
      })
      .join("");

    root.innerHTML =
      '<div class="site-share-backdrop" data-site-share-close></div>' +
      '<div class="site-share-panel">' +
      '  <h2 class="site-share-title">' +
      escapeHtml(strings.share || "Share") +
      "</h2>" +
      '  <ul class="site-share-actions">' +
      items +
      "</ul>" +
      '  <p class="site-share-status" id="site-share-status" hidden></p>' +
      "</div>";

    document.body.appendChild(root);
    statusEl = root.querySelector("#site-share-status");

    root.addEventListener("click", function (e) {
      if (e.target && e.target.hasAttribute("data-site-share-close")) {
        closeShare();
        return;
      }
      var btn = e.target.closest && e.target.closest("[data-share-action]");
      if (!btn) return;
      var id = btn.getAttribute("data-share-action");
      var action = actions().filter(function (a) {
        return a.id === id;
      })[0];
      if (!action) return;
      e.preventDefault();
      Promise.resolve()
        .then(action.run)
        .catch(function () {
          setStatus(strings.copyFailed || "Could not copy", true);
        });
    });

    var pushState = document.getElementById("_pushState");
    if (pushState) {
      pushState.addEventListener("hy-push-state-start", closeShare);
    }
  }

  function openShare() {
    ensureDom();
    if (window.SiteSearch && typeof window.SiteSearch.close === "function") {
      window.SiteSearch.close();
    }
    open = true;
    root.hidden = false;
    document.documentElement.classList.add("site-share-open");
    setStatus("");
  }

  function closeShare() {
    if (!root) return;
    open = false;
    root.hidden = true;
    document.documentElement.classList.remove("site-share-open");
    setStatus("");
  }

  function toggleShare() {
    if (open) closeShare();
    else openShare();
  }

  function addShareButton() {
    if (document.getElementById("_siteshare")) return true;
    var parent = document.querySelector(".nav-btn-bar");
    if (!parent) return false;

    var btn = document.createElement("button");
    btn.id = "_siteshare";
    btn.type = "button";
    btn.className = "nav-btn no-hover";
    btn.setAttribute("aria-label", strings.share || "Share");
    btn.innerHTML =
      "<span class='sr-only'>" +
      escapeHtml(strings.share || "Share") +
      "</span> <span style='font-family: FontAwesome; font-size: 14pt;'>\uf1e0</span>";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      toggleShare();
    });

    // Prefer immediately left of search; else after .nav-span (search will sit after us).
    var search = document.getElementById("_sitesearch");
    var span = parent.querySelector(".nav-span");
    if (search) {
      parent.insertBefore(btn, search);
    } else if (span && span.nextSibling) {
      parent.insertBefore(btn, span.nextSibling);
    } else if (span) {
      parent.appendChild(btn);
    } else {
      parent.appendChild(btn);
    }
    return true;
  }

  function ensureShareButton(attempts) {
    if (addShareButton()) return;
    if (attempts <= 0) return;
    window.setTimeout(function () {
      ensureShareButton(attempts - 1);
    }, 100);
  }

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    ensureShareButton(20);
  });

  var pushStateEl = document.getElementById("_pushState");
  if (pushStateEl) {
    pushStateEl.addEventListener("hy-push-state-load", function () {
      ensureShareButton(5);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && open) {
      closeShare();
    }
  });

  window.SiteShare = {
    open: openShare,
    close: closeShare,
    toggle: toggleShare
  };
})();
