/* =========================================================================
   artist-data.js — placeholder roster for artista.html
   Replace the "es"/"en" bio strings and the monogram/texture image with the
   real artist's photo once available (see README.md).
   ========================================================================= */
(function () {
  "use strict";

  const ARTISTS = {
    andres: {
      monogram: "A",
      texture: "assets/img/IMAGEN_DE_FONDO.jpg",
      name: { es: "Andrés Castro", en: "Andrés Castro" },
      spec: { es: "Realismo & color", en: "Realism & color" },
      bio: [
        {
          es: "Andrés Castro lleva más de una década tatuando retratos y composiciones a color que parecen respirar sobre la piel. Su trabajo se reconoce por el contraste dramático y una paleta que nunca es accidental.",
          en: "Andrés Castro has spent over a decade tattooing portraits and color compositions that seem to breathe on skin. Their work is known for dramatic contrast and a palette that's never accidental."
        },
        {
          es: "Formado entre Bogotá y México, hoy lidera el área de realismo del estudio, con listas de espera de varios meses para piezas de gran formato.",
          en: "Trained between Bogotá and Mexico, they now lead the studio's realism practice, with multi-month waitlists for large-format pieces."
        }
      ]
    },
    gabriela: {
      monogram: "G",
      texture: "assets/img/SERVICIOS_ARTISTAS.jpg",
      name: { es: "Gabriela", en: "Gabriela" },
      spec: { es: "Blackwork & fine line", en: "Blackwork & fine line" },
      bio: [
        {
          es: "Gabriela trabaja el trazo fino como quien escribe una carta: lento, deliberado, sin margen de error. Su especialidad es el blackwork geométrico y el fine line botánico.",
          en: "Gabriela works fine line the way someone writes a letter: slow, deliberate, no margin for error. Their specialty is geometric blackwork and botanical fine line."
        },
        {
          es: "Cada diseño nace de una conversación previa con el cliente, casi siempre a mano alzada, antes de pasar a la piel.",
          en: "Every design starts with a conversation with the client, almost always sketched freehand before it ever touches skin."
        }
      ]
    },
    miko: {
      monogram: "M",
      texture: "assets/img/IMAGEN_DE_FONDO.jpg",
      name: { es: "Miko", en: "Miko" },
      spec: { es: "Neotradicional", en: "Neo-traditional" },
      bio: [
        {
          es: "Miko trae la fuerza del neotradicional: líneas gruesas, colores saturados y una narrativa detrás de cada pieza, desde criaturas mitológicas hasta iconografía pop.",
          en: "Miko brings the force of neo-traditional: bold lines, saturated color, and a story behind every piece — from mythological creatures to pop iconography."
        },
        {
          es: "Es también la mente detrás de la colección Gamer & Pop Culture del estudio, incluyendo las piezas de Arkham Arena.",
          en: "They're also the mind behind the studio's Gamer & Pop Culture collection, including the Arkham Arena pieces."
        }
      ]
    }
  };

  function render() {
    const params = new URLSearchParams(location.search);
    const slug = params.get("a") || "andres";
    const data = ARTISTS[slug] || ARTISTS.andres;
    const lang = window.ArkhamI18n ? window.ArkhamI18n.getLang() : "es";

    document.title = `${data.name[lang]} — Arkham Tattoo Bogotá`;

    document.querySelectorAll("[data-artist-name]").forEach((el) => (el.textContent = data.name[lang]));
    document.querySelectorAll("[data-artist-spec]").forEach((el) => (el.textContent = data.spec[lang]));
    document.querySelectorAll("[data-artist-monogram]").forEach((el) => (el.textContent = data.monogram));
    document.querySelectorAll("[data-artist-texture]").forEach((el) => (el.src = data.texture));

    const narrative = document.querySelector("[data-artist-narrative]");
    if (narrative) {
      narrative.innerHTML = "";
      data.bio.forEach((p) => {
        const para = document.createElement("p");
        para.className = "body-lg reveal-up";
        para.textContent = p[lang];
        narrative.appendChild(para);
      });
      if (window.gsap && window.ScrollTrigger) {
        gsap.utils.toArray(narrative.querySelectorAll(".reveal-up")).forEach((el, i) => {
          gsap.to(el, {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: i * 0.06,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
      } else {
        narrative.querySelectorAll(".reveal-up").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
      }
    }

    // Other-artists rail: everyone except current
    const others = document.querySelector("[data-other-artists]");
    if (others) {
      others.innerHTML = "";
      Object.keys(ARTISTS).filter((k) => k !== slug).forEach((key) => {
        const a = ARTISTS[key];
        const card = document.createElement("a");
        card.className = "rail-card artist-card";
        card.href = `artista.html?a=${key}`;
        card.innerHTML = `
          <div class="frame">
            <img class="texture" src="${a.texture}" alt="">
            <span class="monogram">${a.monogram}</span>
            <span class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 17L17 7M9 7h8v8"/></svg></span>
          </div>
          <div class="meta">
            <div class="name">${a.name[lang]}</div>
            <div class="spec">${a.spec[lang]}</div>
          </div>`;
        others.appendChild(card);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("arkham:langchange", render);
  window.ArkhamArtists = ARTISTS;
})();
