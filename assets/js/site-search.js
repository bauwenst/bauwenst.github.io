(function () {
  "use strict";

  var cfg = window.SiteSearchConfig || {};
  var strings = cfg.strings || {};
  var INDEX_URL = cfg.indexUrl || "/assets/search-index.json";
  var MAX_RESULTS = 20;

  var STOPWORDS = {
    a: 1, an: 1, the: 1, and: 1, or: 1, but: 1, if: 1, then: 1, else: 1, when: 1,
    at: 1, by: 1, for: 1, with: 1, about: 1, against: 1, between: 1, into: 1,
    through: 1, during: 1, before: 1, after: 1, above: 1, below: 1, to: 1, from: 1,
    up: 1, down: 1, in: 1, out: 1, on: 1, off: 1, over: 1, under: 1, again: 1,
    further: 1, once: 1, here: 1, there: 1, all: 1, any: 1, both: 1, each: 1,
    few: 1, more: 1, most: 1, other: 1, some: 1, such: 1, no: 1, nor: 1, not: 1,
    only: 1, own: 1, same: 1, so: 1, than: 1, too: 1, very: 1, can: 1, will: 1,
    just: 1, don: 1, should: 1, now: 1, of: 1, is: 1, are: 1, was: 1, were: 1,
    be: 1, been: 1, being: 1, have: 1, has: 1, had: 1, do: 1, does: 1, did: 1,
    this: 1, that: 1, these: 1, those: 1, it: 1, its: 1, as: 1, i: 1, you: 1,
    he: 1, she: 1, we: 1, they: 1, me: 1, him: 1, her: 1, us: 1, them: 1, my: 1,
    your: 1, his: 1, our: 1, their: 1, what: 1, which: 1, who: 1, whom: 1, how: 1,
    why: 1
  };

  var FIELD_LABELS = {
    title: strings.fieldTitle || "Title",
    description: strings.fieldDescription || "Description",
    body: strings.fieldBody || "Body"
  };

  var index = null;
  var indexPromise = null;
  var open = false;
  var root = null;
  var input = null;
  var resultsEl = null;
  var statusEl = null;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function tokenize(query) {
    return String(query)
      .toLowerCase()
      .split(/[^a-z0-9]+/i)
      .filter(Boolean);
  }

  function prepareQuery(raw) {
    var trimmed = String(raw || "").trim();
    if (trimmed.length < 2) {
      return { ok: false, reason: "short" };
    }

    var tokens = tokenize(trimmed);
    if (!tokens.length) {
      return { ok: false, reason: "vague" };
    }

    // Stopwords only match in titles; description/body use content tokens only.
    var contentTokens = tokens.filter(function (t) {
      return !STOPWORDS[t];
    });

    return {
      ok: true,
      tokens: tokens,
      contentTokens: contentTokens
    };
  }

  function fieldHasToken(haystack, token) {
    return (haystack || "").toLowerCase().indexOf(token) !== -1;
  }

  function wordMatchInfo(text, tokens) {
    var words = String(text || "")
      .toLowerCase()
      .split(/[^a-z0-9]+/i)
      .filter(Boolean);

    var totalRem = 0;
    var earliestIndex = Infinity;
    var any = false;

    for (var t = 0; t < tokens.length; t++) {
      var token = tokens[t];
      var bestRem = Infinity;
      var bestIdx = Infinity;

      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (word.indexOf(token) === -1) continue;
        var rem = word.length - token.length;
        if (rem < bestRem || (rem === bestRem && i < bestIdx)) {
          bestRem = rem;
          bestIdx = i;
        }
      }

      if (bestRem === Infinity) {
        return { remainder: Infinity, index: Infinity };
      }

      totalRem += bestRem;
      if (bestIdx < earliestIndex) earliestIndex = bestIdx;
      any = true;
    }

    return any
      ? { remainder: totalRem, index: earliestIndex }
      : { remainder: Infinity, index: Infinity };
  }

  function highlightText(text, tokens) {
    if (!text) return "";
    if (!tokens || !tokens.length) return escapeHtml(text);

    var lower = text.toLowerCase();
    var ranges = [];
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (!token) continue;
      var from = 0;
      while (from < lower.length) {
        var idx = lower.indexOf(token, from);
        if (idx === -1) break;
        ranges.push([idx, idx + token.length]);
        from = idx + token.length;
      }
    }
    if (!ranges.length) return escapeHtml(text);

    ranges.sort(function (a, b) {
      return a[0] - b[0] || b[1] - a[1];
    });

    var merged = [];
    for (var r = 0; r < ranges.length; r++) {
      var cur = ranges[r];
      var last = merged[merged.length - 1];
      if (last && cur[0] <= last[1]) {
        last[1] = Math.max(last[1], cur[1]);
      } else {
        merged.push([cur[0], cur[1]]);
      }
    }

    var out = "";
    var cursor = 0;
    for (var m = 0; m < merged.length; m++) {
      var start = merged[m][0];
      var end = merged[m][1];
      out += escapeHtml(text.slice(cursor, start));
      out += "<mark>" + escapeHtml(text.slice(start, end)) + "</mark>";
      cursor = end;
    }
    out += escapeHtml(text.slice(cursor));
    return out;
  }

  function snippetAround(text, tokens) {
    if (!text) return "";
    var lower = text.toLowerCase();
    var best = -1;
    for (var i = 0; i < tokens.length; i++) {
      var idx = lower.indexOf(tokens[i]);
      if (idx !== -1 && (best === -1 || idx < best)) best = idx;
    }
    if (best === -1) return text.slice(0, 140);

    var start = Math.max(0, best - 40);
    var end = Math.min(text.length, best + 90);
    var snip = text.slice(start, end).trim();
    if (start > 0) snip = "…" + snip;
    if (end < text.length) snip = snip + "…";
    return snip;
  }

  function evaluateDoc(doc, tokens, contentTokens) {
    var title = doc.title || "";
    var description = doc.description || "";
    var content = doc.content || "";
    var titleL = title.toLowerCase();
    var descL = description.toLowerCase();
    var contentL = content.toLowerCase();

    // AND: stopwords only via title; content tokens via title, description, or body.
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (STOPWORDS[t]) {
        if (!fieldHasToken(titleL, t)) return null;
      } else if (
        !fieldHasToken(titleL, t) &&
        !fieldHasToken(descL, t) &&
        !fieldHasToken(contentL, t)
      ) {
        return null;
      }
    }

    var titleHitTokens = tokens.filter(function (t) {
      return fieldHasToken(titleL, t);
    });
    var hasTitleMatch = titleHitTokens.length > 0;

    var descHitTokens = contentTokens.filter(function (t) {
      return fieldHasToken(descL, t);
    });
    var bodyHitTokens = contentTokens.filter(function (t) {
      return fieldHasToken(contentL, t);
    });

    var matchedFields = [];
    if (hasTitleMatch) matchedFields.push("title");
    if (descHitTokens.length) matchedFields.push("description");
    if (bodyHitTokens.length) matchedFields.push("body");

    // Desc/body-only results need at least one non-stopword hit there.
    if (!hasTitleMatch && !descHitTokens.length && !bodyHitTokens.length) {
      return null;
    }

    var matchInfo;
    var hasSecondaryMatch = false;
    if (hasTitleMatch) {
      matchInfo = wordMatchInfo(title, titleHitTokens);
      hasSecondaryMatch = descHitTokens.length > 0 || bodyHitTokens.length > 0;
    } else if (descHitTokens.length) {
      matchInfo = wordMatchInfo(description, descHitTokens);
    } else {
      matchInfo = wordMatchInfo(content, bodyHitTokens);
    }

    var snippetSource = "";
    var snippetField = null;
    var highlightTokens = tokens;
    if (hasTitleMatch) {
      snippetField = "title";
      highlightTokens = titleHitTokens;
      if (bodyHitTokens.length) {
        snippetSource = snippetAround(content, bodyHitTokens);
        snippetField = "body";
        highlightTokens = tokens;
      } else if (descHitTokens.length) {
        snippetSource = snippetAround(description, descHitTokens);
        snippetField = "description";
        highlightTokens = tokens;
      }
    } else if (descHitTokens.length) {
      snippetSource = snippetAround(description, descHitTokens);
      snippetField = "description";
      highlightTokens = descHitTokens;
    } else {
      snippetSource = snippetAround(content, bodyHitTokens);
      snippetField = "body";
      highlightTokens = bodyHitTokens;
    }

    return {
      doc: doc,
      hasTitleMatch: hasTitleMatch,
      matchRemainder: matchInfo.remainder,
      matchIndex: matchInfo.index,
      hasSecondaryMatch: hasSecondaryMatch,
      matchedFields: matchedFields,
      snippetSource: snippetSource,
      snippetField: snippetField,
      highlightTokens: highlightTokens
    };
  }

  function loadIndex() {
    if (index) return Promise.resolve(index);
    if (indexPromise) return indexPromise;
    indexPromise = fetch(INDEX_URL)
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load search index");
        return res.json();
      })
      .then(function (data) {
        index = Array.isArray(data) ? data : [];
        return index;
      })
      .catch(function (err) {
        indexPromise = null;
        throw err;
      });
    return indexPromise;
  }

  function setStatus(msg) {
    if (!statusEl) return;
    statusEl.textContent = msg || "";
    statusEl.hidden = !msg;
  }

  function renderResults(hits, total) {
    resultsEl.innerHTML = "";
    if (!hits.length) {
      setStatus(strings.empty || "No matching posts");
      return;
    }
    setStatus("");
    var frag = document.createDocumentFragment();

    hits.forEach(function (hit) {
      var doc = hit.doc;
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = doc.url;
      a.className = "site-search-result";
      a.addEventListener("click", function (e) {
        e.preventDefault();
        closeSearch();
        navigate(doc.url);
      });

      var title = document.createElement("span");
      title.className = "site-search-result-title";
      if (hit.matchedFields.indexOf("title") !== -1) {
        title.innerHTML = highlightText(doc.title, hit.highlightTokens);
      } else {
        title.textContent = doc.title;
      }

      var meta = document.createElement("div");
      meta.className = "site-search-result-meta";

      var dateEl = document.createElement("span");
      dateEl.className = "site-search-result-date";
      dateEl.textContent = doc.date || "";

      var fields = document.createElement("span");
      fields.className = "site-search-result-fields";
      hit.matchedFields.forEach(function (field) {
        var badge = document.createElement("span");
        badge.className = "site-search-field-badge";
        badge.textContent = FIELD_LABELS[field] || field;
        fields.appendChild(badge);
      });

      if (doc.date) meta.appendChild(dateEl);
      if (hit.matchedFields.length) meta.appendChild(fields);

      a.appendChild(title);
      if (meta.childNodes.length) a.appendChild(meta);

      if (hit.snippetSource) {
        var snip = document.createElement("span");
        snip.className = "site-search-result-snippet";
        var tokensForSnip = hit.highlightTokens;
        if (hit.snippetField === "body" || hit.snippetField === "description") {
          tokensForSnip = hit.highlightTokens.filter(function (t) {
            return !STOPWORDS[t];
          });
          if (!tokensForSnip.length) tokensForSnip = hit.highlightTokens;
        }
        snip.innerHTML = highlightText(hit.snippetSource, tokensForSnip);
        a.appendChild(snip);
      }

      li.appendChild(a);
      frag.appendChild(li);
    });
    resultsEl.appendChild(frag);

    if (total > hits.length) {
      var more = document.createElement("li");
      more.className = "site-search-more";
      more.textContent = (strings.more || "…and <!--count--> more").replace(
        "<!--count-->",
        String(total - hits.length)
      );
      resultsEl.appendChild(more);
    }
  }

  function runSearch() {
    if (!input) return;
    var prepared = prepareQuery(input.value);

    if (!prepared.ok) {
      resultsEl.innerHTML = "";
      if (prepared.reason === "short") {
        setStatus(strings.hintShort || "Type at least 2 characters…");
      } else {
        setStatus(strings.hintVague || "Try a more specific query…");
      }
      return;
    }

    if (!index) {
      setStatus(strings.loading || "Loading search index…");
      loadIndex()
        .then(function () {
          runSearch();
        })
        .catch(function () {
          setStatus("Could not load search index.");
        });
      return;
    }

    var scored = [];
    for (var i = 0; i < index.length; i++) {
      var hit = evaluateDoc(
        index[i],
        prepared.tokens,
        prepared.contentTokens
      );
      if (hit) scored.push(hit);
    }

    scored.sort(function (a, b) {
      // 1. Any title match before description/body-only
      if (a.hasTitleMatch !== b.hasTitleMatch) {
        return a.hasTitleMatch ? -1 : 1;
      }
      // 2. Closer to a full-word match
      if (a.matchRemainder !== b.matchRemainder) {
        return a.matchRemainder - b.matchRemainder;
      }
      // 3. Earlier in the matching context
      if (a.matchIndex !== b.matchIndex) {
        return a.matchIndex - b.matchIndex;
      }
      // 4. Title + description/body over title-only (same closeness/earliness)
      if (a.hasSecondaryMatch !== b.hasSecondaryMatch) {
        return a.hasSecondaryMatch ? -1 : 1;
      }
      // 5. Newer date
      var dateA = a.doc.date || "";
      var dateB = b.doc.date || "";
      if (dateA !== dateB) return dateB.localeCompare(dateA);
      return (a.doc.title || "").localeCompare(b.doc.title || "");
    });

    var total = scored.length;
    renderResults(scored.slice(0, MAX_RESULTS), total);
  }

  function navigate(url) {
    var pushState = document.getElementById("_pushState");
    if (pushState && typeof pushState.assign === "function") {
      pushState.assign(url);
      return;
    }
    window.location.href = url;
  }

  function ensureDom() {
    if (root) return;

    root = document.createElement("div");
    root.id = "site-search";
    root.className = "site-search";
    root.hidden = true;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", strings.search || "Search");

    root.innerHTML =
      '<div class="site-search-backdrop" data-site-search-close></div>' +
      '<div class="site-search-panel">' +
      '  <label class="sr-only" for="site-search-input">' +
      escapeHtml(strings.search || "Search") +
      "</label>" +
      '  <input id="site-search-input" class="site-search-input" type="search" autocomplete="off" spellcheck="false" placeholder="' +
      escapeHtml(strings.placeholder || "Type something…") +
      '">' +
      '  <p class="site-search-status" id="site-search-status" hidden></p>' +
      '  <ul class="site-search-results" id="site-search-results"></ul>' +
      "</div>";

    // Mount on body so position:fixed is viewport-relative (hy-push-state
    // creates a containing block / overflow context that breaks this on mobile).
    document.body.appendChild(root);
    input = root.querySelector("#site-search-input");
    resultsEl = root.querySelector("#site-search-results");
    statusEl = root.querySelector("#site-search-status");

    root.addEventListener("click", function (e) {
      if (e.target && e.target.hasAttribute("data-site-search-close")) {
        closeSearch();
      }
    });

    input.addEventListener("input", runSearch);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeSearch();
      }
    });

    var pushState = document.getElementById("_pushState");
    if (pushState) {
      pushState.addEventListener("hy-push-state-start", closeSearch);
    }
  }

  function openSearch() {
    ensureDom();
    open = true;
    root.hidden = false;
    document.documentElement.classList.add("site-search-open");
    input.value = "";
    resultsEl.innerHTML = "";
    setStatus(strings.hintShort || "Type at least 2 characters…");
    // preventScroll avoids jumping to a wrongly-positioned input on mobile
    try {
      input.focus({ preventScroll: true });
    } catch (err) {
      input.focus();
    }
    loadIndex().catch(function () {
      /* shown on first query */
    });
  }

  function closeSearch() {
    if (!root) return;
    open = false;
    root.hidden = true;
    document.documentElement.classList.remove("site-search-open");
  }

  function toggleSearch() {
    if (open) closeSearch();
    else openSearch();
  }

  function addSearchButton() {
    if (document.getElementById("_sitesearch")) return true;
    var parent = document.querySelector(".nav-btn-bar");
    if (!parent) return false;

    var btn = document.createElement("button");
    btn.id = "_sitesearch";
    btn.type = "button";
    btn.className = "nav-btn no-hover";
    btn.setAttribute("aria-label", strings.search || "Search");
    btn.innerHTML =
      "<span class='sr-only'>" +
      escapeHtml(strings.search || "Search") +
      "</span> <span style='font-family: FontAwesome; font-size: 14pt;'>\uf002</span>";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      toggleSearch();
    });

    // Place after .nav-span so it sits on the right (dark mode is left of the span).
    var span = parent.querySelector(".nav-span");
    if (span && span.nextSibling) {
      parent.insertBefore(btn, span.nextSibling);
    } else if (span) {
      parent.appendChild(btn);
    } else {
      parent.appendChild(btn);
    }
    return true;
  }

  function ensureSearchButton(attempts) {
    if (addSearchButton()) return;
    if (attempts <= 0) return;
    window.setTimeout(function () {
      ensureSearchButton(attempts - 1);
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
    // PWA / late nav: retry if .nav-btn-bar is not ready yet
    ensureSearchButton(20);
  });

  // Re-add after theme chrome finishes inserting (e.g. dark-mode button)
  var pushStateEl = document.getElementById("_pushState");
  if (pushStateEl) {
    pushStateEl.addEventListener("hy-push-state-load", function () {
      ensureSearchButton(5);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && open) {
      closeSearch();
    }
  });

  window.SiteSearch = {
    open: openSearch,
    close: closeSearch,
    toggle: toggleSearch
  };
})();
