/* ============================================================
   AKHRI NIWALA — Site behaviour
   Vanilla JS only. No libraries, no build step.
   Handles: language toggle (EN/UR + RTL + Urdu numerals),
   scroll reveal, mobile menu, FAQ accordion, PDP selector.
   ============================================================ */
(function () {
  "use strict";

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
    initLang();
    initReveal();
    initMenu();
    initFaq();
    initSelector();
  });
})();
