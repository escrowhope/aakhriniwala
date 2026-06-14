/* ============================================================
   AKHRI NIWALA — Site behaviour
   Vanilla JS only. No libraries, no build step.
   Handles: language toggle (EN/UR + RTL + Urdu numerals),
   scroll reveal, mobile menu, FAQ accordion, PDP selector.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 0. IMAGE LIBRARY ----------
     All photography lives here in ONE place. To swap in your own photo,
     just change the URL for that key (or point it at /assets/your-photo.webp).
     Applied to any element with data-img="key" via the --img CSS variable.
     Current photos are free-license Unsplash placeholders — replace with
     photos of YOUR food before serious marketing. */
  var U = function (id) { return "url('https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=900&q=80')"; };
  var AN_IMAGES = {
    hero:        U("1728910156510-77488f19b152"),
    story:       U("1556911073-52527ac43761"),
    /* category cards */
    "cat-baked":  U("1606983340126-99ab4feaa64a"),
    "cat-mains":  U("1603496987351-f84a3ba5ec85"),
    "cat-breads": U("1668357530437-72a12c660f94"),
    "cat-kebabs": U("1532636875304-0c89119d9b4d"),
    "cat-achar":  U("1601702538934-efffab67ab65"),
    "cat-gifts":  U("1508899203029-1c9eb493c9bd"),
    /* baked */
    "brownie":         U("1636743715220-d8f8dd900b87"),
    "brownie-fudge":   U("1606313564200-e75d5e30476c"),
    "brownie-walnut":  U("1636743715220-d8f8dd900b87"),
    "brownie-cream":   U("1624353365286-3f8d62daad51"),
    "brownie-caramel": U("1605190557072-1fe6a230ee65"),
    "cake":     U("1606983340126-99ab4feaa64a"),
    "cupcake":  U("1588195538326-c5b1e9f80a1b"),
    "cookie":   U("1517427294546-5aa121f68e8a"),
    "mixed-baked": U("1602351447937-745cb720612f"),
    /* desi mains */
    "karahi":   U("1603496987351-f84a3ba5ec85"),
    "karahi2":  U("1694579740719-0e601c5d2437"),
    "nihari":   U("1585937421612-70a008356fbe"),
    "biryani":  U("1589302168068-964664d93dc0"),
    "paya":     U("1612700722193-f0410adb8949"),
    "pulao":    U("1631515243349-e0cb75fb8d3a"),
    "daal":     U("1585417791023-a5a6164b2646"),
    "haleem":   U("1577186912275-4f74c57458ef"),
    "gosht":    U("1631292784640-2b24be784d5d"),
    /* breads */
    "paratha":       U("1668357530437-72a12c660f94"),
    "paratha-plain": U("1683533743190-89c9b19f9ea6"),
    "naan":          U("1580064003296-29deb3521370"),
    "puri":          U("1707424963059-6a7a559cae28"),
    /* kebabs */
    "seekh":  U("1532636875304-0c89119d9b4d"),
    "shami":  U("1599487488170-d11ec9c172f0"),
    "tikka":  U("1629117407975-d3bdfd26aa86"),
    "samosa": U("1599307767316-776533bb941c"),
    /* achar */
    "achar":         U("1617854307432-13950e24ba07"),
    "achar-mixed":   U("1601702538934-efffab67ab65"),
    "achar-lemon":   U("1623207485293-fc768c6575fa"),
    "achar-chutney": U("1633383718081-22ac93e3db65"),
    /* gift boxes */
    "gift-eid":     U("1508899203029-1c9eb493c9bd"),
    "gift-ramadan": U("1668127039852-0e7c8b3a1601"),
    "gift-dawat":   U("1728910156510-77488f19b152"),
    "gift-corp":    U("1664849173063-8d8244ac3933"),
    "gift-baby":    U("1649789093457-3a973148fa27")
  };
  function initImages() {
    document.querySelectorAll("[data-img]").forEach(function (el) {
      var url = AN_IMAGES[el.getAttribute("data-img")];
      if (url) el.style.setProperty("--img", url);
    });
  }

  /* ---------- 1. LANGUAGE TOGGLE ---------- */
  var I18N = window.AN_I18N || { en: {}, ur: {} };
  var toUrdu = window.AN_toUrduDigits || function (s) { return s; };
  var KEY = "an_lang";

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.en;
    var html = document.documentElement;

    html.setAttribute("lang", lang === "ur" ? "ur" : "en");
    html.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    document.body.classList.toggle("urdu-mode", lang === "ur");

    /* swap every translatable string */
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });

    /* placeholders (forms) */
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
    });

    /* prices & phone numbers: store original in data-num, render digits per locale */
    document.querySelectorAll("[data-num]").forEach(function (el) {
      var raw = el.getAttribute("data-num");
      el.textContent = (lang === "ur") ? toUrdu(raw) : raw;
    });

    /* reflect toggle state */
    document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang-btn") === lang);
    });

    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  function initLang() {
    var saved = "en";
    try { saved = localStorage.getItem(KEY) || "en"; } catch (e) {}
    applyLang(saved);
    document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang-btn")); });
    });
  }

  /* ---------- 2. SCROLL REVEAL (Intersection Observer) ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 3. MOBILE MENU ---------- */
  function initMenu() {
    var btn = document.querySelector(".menu-btn");
    var links = document.querySelector(".nav-links");
    if (!btn || !links) return;
    btn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 4. FAQ ACCORDION ---------- */
  function initFaq() {
    document.querySelectorAll(".faq-q").forEach(function (q) {
      q.addEventListener("click", function () {
        var open = q.getAttribute("aria-expanded") === "true";
        q.setAttribute("aria-expanded", open ? "false" : "true");
        var ans = q.nextElementSibling;
        ans.style.maxHeight = open ? null : ans.scrollHeight + "px";
      });
    });
  }

  /* ---------- 5. PDP SIZE/PORTION SELECTOR ---------- */
  function initSelector() {
    document.querySelectorAll(".selector").forEach(function (group) {
      group.addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn) return;
        group.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        /* update visible price if the option carries one */
        var price = btn.getAttribute("data-price");
        var out = document.querySelector("[data-price-out]");
        if (price && out) { out.setAttribute("data-num", price);
          var lang = document.body.classList.contains("urdu-mode") ? "ur" : "en";
          out.textContent = lang === "ur" ? toUrdu(price) : price;
        }
      });
    });
  }

  /* ---------- INIT ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initImages();
    initLang();
    initReveal();
    initMenu();
    initFaq();
    initSelector();
  });
})();
