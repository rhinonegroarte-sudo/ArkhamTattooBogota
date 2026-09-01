/* =========================================================================
   main.js — Arkham Tattoo Bogotá
   Vanilla JS + GSAP/ScrollTrigger (CDN). No framework, no build step —
   the file opens directly or deploys to any static host.
   ========================================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- NAV: solid-on-scroll + mobile panel ---------------- */
  function initNav() {
    const nav = document.querySelector(".site-nav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const burger = document.querySelector(".nav-burger");
    const panel = document.querySelector(".mobile-panel");
    if (burger && panel) {
      burger.addEventListener("click", () => {
        panel.classList.toggle("is-open");
        burger.classList.toggle("is-open");
      });
      panel.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          panel.classList.remove("is-open");
          burger.classList.remove("is-open");
        })
      );
    }
  }

  /* ---------------- Signature: needle scroll-progress rail ---------------- */
  function initNeedle() {
    const rail = document.querySelector(".needle-rail");
    if (!rail) return;
    const fill = rail.querySelector(".fill");
    const tip = rail.querySelector(".tip");
    let lastZone = -1;

    function update() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      fill.style.height = progress * 100 + "%";
      tip.style.top = progress * 100 + "%";

      const zone = Math.floor(progress * 12);
      if (zone !== lastZone) {
        lastZone = zone;
        tip.classList.remove("is-buzz");
        void tip.offsetWidth;
        tip.classList.add("is-buzz");
      }
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---------------- Generic scroll reveals ---------------- */
  function initReveals() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".reveal-up").forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: reduceMotion ? 0.01 : 0.9,
        ease: "power3.out",
        delay: (i % 4) * 0.05,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray(".reveal-mask").forEach((mask) => {
      const inner = mask.querySelector(":scope > *");
      if (!inner) return;
      gsap.to(inner, {
        y: "0%",
        duration: reduceMotion ? 0.01 : 1,
        ease: "power4.out",
        scrollTrigger: { trigger: mask, start: "top 92%", once: true },
      });
    });

    // Staggered children reveal (rails, grids)
    gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
      const items = group.children;
      gsap.from(items, {
        opacity: 0,
        y: 24,
        duration: reduceMotion ? 0.01 : 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: group, start: "top 85%", once: true },
      });
    });
  }

  /* ---------------- Hero cinematic scroll scene (Home only) ---------------- */
  function initHeroScene() {
    const stage = document.querySelector(".hero-stage");
    if (!stage || !window.gsap || !window.ScrollTrigger) return;

    const bg = stage.querySelector(".hero-bg");
    const scenes = gsap.utils.toArray(".hero-scene-line");
    const counter = document.querySelector(".hero-frame-count b");
    const titleLines = gsap.utils.toArray(".hero-title .line span");
    const logo = document.querySelector(".hero-logo");
    const kicker = document.querySelector(".hero-kicker");
    const sub = document.querySelector(".hero-sub");
    const cue = document.querySelector(".hero-scroll-cue");
    const heroInner = stage.querySelector(".hero-inner");

    const tlIn = gsap.timeline({ delay: reduceMotion ? 0 : 0.15 });
    tlIn
      .to(logo, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0)
      .to(kicker, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.15)
      .to(titleLines, { y: "0%", duration: 1, ease: "power4.out", stagger: 0.08 }, 0.2)
      .to(sub, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.55)
      .to(cue, { opacity: 1, duration: 0.6 }, 0.8);
    gsap.set([kicker, sub, cue], { opacity: 0, y: 14 });
    gsap.set(logo, { y: 14 });

    ScrollTrigger.create({
      trigger: stage,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(bg, { scale: 1.12 + p * 0.18, y: p * -40 });
        if (counter) counter.textContent = String(Math.min(3, Math.floor(p * 3) + 1)).padStart(2, "0");

        // The title/subtitle own the opening beat only — recede early so
        // the scene captions (which share the same lower-left anchor) never
        // collide with them as the pinned scroll continues.
        if (heroInner) {
          const fadeP = Math.min(1, p / 0.13);
          heroInner.style.opacity = String(1 - fadeP);
          heroInner.style.transform = `translateY(${-fadeP * 36}px)`;
          heroInner.style.pointerEvents = fadeP > 0.6 ? "none" : "auto";
        }

        const segment = 1 / scenes.length;
        scenes.forEach((line, i) => {
          const start = i * segment;
          const end = start + segment;
          const local = (p - start) / segment;
          let opacity = 0, y = 18;
          if (p >= start && p < end) {
            const inOut = local < 0.15 ? local / 0.15 : local > 0.85 ? (1 - local) / 0.15 : 1;
            opacity = Math.max(0, Math.min(1, inOut));
            y = 18 * (1 - Math.max(0, Math.min(1, inOut)));
          } else if (p >= end && i === scenes.length - 1) {
            opacity = 1; y = 0;
          }
          line.style.opacity = opacity;
          line.style.transform = `translateY(${y}px)`;
        });
      },
    });
  }

  /* ---------------- Rails (carousel) — drag + buttons ---------------- */
  function initRails() {
    document.querySelectorAll("[data-rail]").forEach((rail) => {
      const container = rail;
      const prev = rail.parentElement.querySelector('[data-rail-prev]');
      const next = rail.parentElement.querySelector('[data-rail-next]');
      const step = () => container.querySelector(".rail-card")?.getBoundingClientRect().width + 28 || 300;

      prev?.addEventListener("click", () => container.scrollBy({ left: -step(), behavior: "smooth" }));
      next?.addEventListener("click", () => container.scrollBy({ left: step(), behavior: "smooth" }));

      let isDown = false, startX = 0, scrollLeft = 0;
      container.addEventListener("pointerdown", (e) => {
        isDown = true;
        container.setPointerCapture(e.pointerId);
        startX = e.clientX;
        scrollLeft = container.scrollLeft;
      });
      container.addEventListener("pointermove", (e) => {
        if (!isDown) return;
        container.scrollLeft = scrollLeft - (e.clientX - startX);
      });
      ["pointerup", "pointerleave", "pointercancel"].forEach((ev) =>
        container.addEventListener(ev, () => (isDown = false))
      );
    });
  }

  /* ---------------- Copy-to-clipboard (UEFN island code) ---------------- */
  function initCopyCode() {
    const btn = document.querySelector("[data-copy-code]");
    if (!btn) return;
    const codeEl = document.querySelector("[data-code-value]");
    btn.addEventListener("click", async () => {
      const value = codeEl ? codeEl.textContent.trim() : "";
      try {
        await navigator.clipboard.writeText(value);
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = value;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      const lang = window.ArkhamI18n ? window.ArkhamI18n.getLang() : "es";
      const label = btn.querySelector("span");
      const original = label.textContent;
      label.textContent = window.ArkhamI18n ? window.ArkhamI18n.dict["vg.copied"][lang] : "Copied!";
      btn.classList.add("is-copied");
      setTimeout(() => {
        label.textContent = original;
        btn.classList.remove("is-copied");
      }, 1800);
    });
  }

  /* ---------------- Active nav link highlight ---------------- */
  function initActiveLink() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a, .mobile-panel a").forEach((a) => {
      const href = a.getAttribute("href").split("#")[0] || "index.html";
      if (href === path || (path === "" && href === "index.html")) a.classList.add("is-active");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initNeedle();
    initRails();
    initCopyCode();
    initActiveLink();

    // Only switch on the scroll-driven hidden states (CSS gated behind
    // html.js-scroll-ready) once GSAP + ScrollTrigger are confirmed present.
    // If the CDN is blocked/slow/ad-blocked, the page stays fully visible
    // and simply skips the motion layer instead of hiding real content.
    if (window.gsap && window.ScrollTrigger) {
      document.documentElement.classList.add("js-scroll-ready");
      initReveals();
      initHeroScene();
    }
  });
})();
