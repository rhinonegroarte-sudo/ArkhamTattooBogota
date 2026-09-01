/* =========================================================================
   i18n.js — lightweight bilingual engine (ES default / EN)
   No reload: swaps textContent for every [data-i18n] node and persists the
   choice in localStorage under "arkham-lang".
   ========================================================================= */
(function () {
  "use strict";

  const STORAGE_KEY = "arkham-lang";

  const dict = {
    /* ---------------- NAV ---------------- */
    "nav.home": { es: "Inicio", en: "Home" },
    "nav.artists": { es: "Artistas", en: "Artists" },
    "nav.services": { es: "Servicios", en: "Services" },
    "nav.videogame": { es: "Video Juego", en: "Video Game" },
    "nav.book": { es: "Agenda tu cita", en: "Book a session" },

    /* ---------------- HERO / HOME ---------------- */
    "hero.frame": { es: "Escena", en: "Scene" },
    "hero.kicker": { es: "Estudio de tatuaje · Bogotá", en: "Tattoo studio · Bogotá" },
    "hero.title.1": { es: "El arte que", en: "The art that" },
    "hero.title.2": { es: "vive bajo", en: "lives under" },
    "hero.title.3": { es: "tu piel.", en: "your skin." },
    "hero.sub": {
      es: "Tatuajes de autor, perforaciones y una cultura propia en el corazón de Bogotá.",
      en: "Signature tattoos, piercing, and a culture all our own in the heart of Bogotá."
    },
    "hero.scroll": { es: "Desplázate", en: "Scroll" },
    "hero.scene1.tag": { es: "01 — La aguja", en: "01 — The needle" },
    "hero.scene1.text": { es: "Cada línea es una decisión que no se borra.", en: "Every line is a decision that doesn't erase." },
    "hero.scene2.tag": { es: "02 — El trazo", en: "02 — The stroke" },
    "hero.scene2.text": { es: "Precisión de estudio, temple de calle.", en: "Studio precision, street temperament." },
    "hero.scene3.tag": { es: "03 — El vínculo", en: "03 — The bond" },
    "hero.scene3.text": { es: "Arkham Tattoo Bogotá — donde empieza tu historia.", en: "Arkham Tattoo Bogotá — where your story begins." },

    /* ---------------- ABOUT ---------------- */
    "about.eyebrow": { es: "Sobre nosotros", en: "About us" },
    "about.title": { es: "Más que tinta sobre piel.", en: "More than ink on skin." },
    "about.p1": {
      es: "Arkham Tattoo, en el corazón de Chapinero (Bogotá), abrió en 2011 como estudio de tatuajes y piercings. Durante 15 años, ha crecido con la comunidad local, destacando por arte auténtico, precisión y seguridad.",
      en: "Arkham Tattoo, in the heart of Chapinero (Bogotá), opened in 2011 as a tattoo and piercing studio. For 15 years, it has grown alongside the local community, standing out for authentic art, precision, and safety."
    },
    "about.p2": {
      es: "Sus artistas dominan realismo, tradicional y puntillismo. No solo tatuamos: creamos marcas permanentes que celebran tu identidad. Tu historia, tu piel, nuestro arte.",
      en: "Their artists master realism, traditional, and dotwork. We don't just tattoo: we create permanent marks that celebrate your identity. Your story, your skin, our art."
    },
    "about.stat1.n": { es: "15+", en: "15+" },
    "about.stat1.l": { es: "Años de oficio", en: "Years of craft" },
    "about.stat2.n": { es: "5", en: "5" },
    "about.stat2.l": { es: "Artistas residentes", en: "Resident artists" },
    "about.stat3.n": { es: "3.000+", en: "3,000+" },
    "about.stat3.l": { es: "Piezas tatuadas", en: "Pieces tattooed" },

    /* ---------------- ARTISTS RAIL ---------------- */
    "artists.eyebrow": { es: "El colectivo", en: "The collective" },
    "artists.title": { es: "Nuestros artistas.", en: "Our artists." },
    "artists.sub": { es: "Cada uno con una firma distinta. Toca un perfil para conocer su historia y su portafolio.", en: "Each with a distinct signature. Tap a profile to see their story and portfolio." },
    "artists.cta.view": { es: "Ver perfil", en: "View profile" },

    "artist1.name": { es: "Andrés Castro", en: "Andrés Castro" },
    "artist1.spec": { es: "Realismo & color", en: "Realism & color" },
    "artist2.name": { es: "Gabriela", en: "Gabriela" },
    "artist2.spec": { es: "Blackwork & fine line", en: "Blackwork & fine line" },
    "artist3.name": { es: "Miko", en: "Miko" },
    "artist3.spec": { es: "Neotradicional", en: "Neo-traditional" },

    /* ---------------- WORK GALLERY ---------------- */
    "gallery.eyebrow": { es: "Portafolio", en: "Portfolio" },
    "gallery.title": { es: "Trabajo reciente.", en: "Recent work." },
    "gallery.sub": { es: "Una muestra del estudio. Reemplaza estos espacios con fotografía en alta resolución de cada pieza.", en: "A sample of the studio's work. Replace these slots with high-resolution photography of each piece." },
    "gallery.item": { es: "Añadir fotografía", en: "Add photograph" },

    /* ---------------- PREVIEW PANELS ---------------- */
    "preview.services.n": { es: "02", en: "02" },
    "preview.services.title": { es: "Servicios", en: "Services" },
    "preview.services.text": { es: "Smoke shop y perforaciones dentro del mismo estudio.", en: "Smoke shop and piercing under the same roof." },
    "preview.services.go": { es: "Explorar", en: "Explore" },
    "preview.vg.n": { es: "03", en: "03" },
    "preview.vg.title": { es: "Arkham Arena", en: "Arkham Arena" },
    "preview.vg.text": { es: "Compite en Fortnite. Gana tatuajes de verdad.", en: "Compete in Fortnite. Win real tattoos." },
    "preview.vg.go": { es: "Entrar al mapa", en: "Enter the map" },

    /* ---------------- FOOTER ---------------- */
    "footer.about": { es: "Estudio de tatuaje, perforación y cultura urbana en Chapinero, Bogotá.", en: "Tattoo, piercing, and street-culture studio in Chapinero, Bogotá." },
    "footer.nav": { es: "Navegación", en: "Navigation" },
    "footer.contact": { es: "Contacto", en: "Contact" },
    "footer.follow": { es: "Síguenos", en: "Follow" },
    "footer.hours": { es: "Mar – Sáb · 11:00 – 20:00", en: "Tue – Sat · 11:00 – 20:00" },
    "footer.book": { es: "Agenda por WhatsApp", en: "Book on WhatsApp" },
    "footer.rights": { es: "Todos los derechos reservados.", en: "All rights reserved." },
    "footer.credit": { es: "Diseño & desarrollo — estudio digital", en: "Design & development — digital studio" },

    /* ---------------- SERVICES PAGE ---------------- */
    "svc.crumb": { es: "/ Servicios", en: "/ Services" },
    "svc.h1": { es: "Servicios del estudio.", en: "Studio services." },
    "svc.sub": { es: "Todo lo que necesitas para tu próxima modificación corporal, en un solo lugar en Chapinero.", en: "Everything you need for your next body modification, all in one place in Chapinero." },

    "svc.smoke.tag": { es: "Smoke Shop", en: "Smoke Shop" },
    "svc.smoke.title": { es: "Cultura del humo, curada.", en: "Smoke culture, curated." },
    "svc.smoke.p": { es: "Piezas de vidrio, accesorios y una selección pensada para quienes ya saben lo que buscan. Visítanos en el estudio o escríbenos para apartar tu pieza.", en: "Glass pieces, accessories, and a selection made for people who already know what they're after. Visit the studio or message us to hold your piece." },
    "svc.smoke.li1": { es: "Piezas de vidrio artesanal", en: "Handmade glass pieces" },
    "svc.smoke.li2": { es: "Accesorios y encendedores", en: "Accessories & lighters" },
    "svc.smoke.li3": { es: "Asesoría personalizada en tienda", en: "Personalized in-store guidance" },

    "svc.perfo.tag": { es: "Perforaciones", en: "Piercing" },
    "svc.perfo.title": { es: "Precisión clínica, estética de estudio.", en: "Clinical precision, studio aesthetic." },
    "svc.perfo.p": { es: "Material estéril de un solo uso y técnicos certificados. Perforación de oreja, nariz, ceja y más, con joyería de calidad quirúrgica.", en: "Single-use sterile material and certified technicians. Ear, nose, brow piercing and more, with surgical-grade jewelry." },
    "svc.perfo.li1": { es: "Instrumental estéril de un solo uso", en: "Single-use sterile instruments" },
    "svc.perfo.li2": { es: "Joyería de titanio quirúrgico", en: "Surgical-grade titanium jewelry" },
    "svc.perfo.li3": { es: "Cuidado y seguimiento post-perforación", en: "Aftercare & follow-up" },

    "svc.buy.title": { es: "¿Ya sabes qué quieres?", en: "Already know what you want?" },
    "svc.buy.p": { es: "Escríbenos por WhatsApp y separamos tu pieza o tu cita de perforación.", en: "Message us on WhatsApp and we'll hold your piece or piercing appointment." },
    "svc.buy.btn": { es: "Comprar / Reservar", en: "Buy / Reserve" },
    "svc.add": { es: "Añadir producto", en: "Add product" },

    /* ---------------- VIDEO GAME PAGE ---------------- */
    "vg.crumb": { es: "/ Video Juego", en: "/ Video Game" },
    "vg.eyebrow": { es: "Fortnite · UEFN Island", en: "Fortnite · UEFN Island" },
    "vg.title1": { es: "Tinta Real.", en: "Royal Ink." },
    "vg.title2": { es: "Victoria Real.", en: "Royal Victory." },
    "vg.sub": { es: "Compite en el mapa «Arkham Arena: Chapinero Cyberpunk» en Fortnite, escala la clasificación y canjea tu victoria por tatuajes exclusivos en Bogotá.", en: "Compete on the \u201cArkham Arena: Chapinero Cyberpunk\u201d map in Fortnite, climb the leaderboard, and redeem your victory for exclusive tattoos in Bogotá." },
    "vg.island.label": { es: "Código de la isla · UEFN", en: "Island Code · UEFN" },
    "vg.copy": { es: "Copiar código", en: "Copy Code" },
    "vg.copied": { es: "¡Copiado!", en: "Copied!" },

    "vg.arena.eyebrow": { es: "El mapa", en: "The map" },
    "vg.arena.title": { es: "Arkham Arena.", en: "Arkham Arena." },
    "vg.arena1.h": { es: "Zone Wars Chapinero Map 2.0", en: "Zone Wars Chapinero Map 2.0" },
    "vg.arena1.p": { es: "Gráficos cyberpunk inspirados en las calles de Bogotá.", en: "Cyberpunk graphics inspired by the streets of Bogotá." },
    "vg.arena2.h": { es: "Shield Ink Mechanic", en: "Shield Ink Mechanic" },
    "vg.arena2.p": { es: "Curación temática dentro del mapa, con sonido 3D.", en: "Thematic healing within the map, with 3D sound." },
    "vg.arena3.h": { es: "Chat Decides My Ink Rule", en: "Chat Decides My Ink Rule" },
    "vg.arena3.p": { es: "Evento donde streamers locales compiten contra su audiencia.", en: "An event where local streamers compete against their audience." },

    "vg.board.eyebrow": { es: "Comunidad gamer", en: "Gamer community" },
    "vg.board.title": { es: "Torneo & clasificación.", en: "Tournament & leaderboard." },
    "vg.board.sub": { es: "Top 5 del mes. Actualizado cada lunes.", en: "Top 5 of the month. Updated every Monday." },
    "vg.th.rank": { es: "Puesto", en: "Rank" },
    "vg.th.tag": { es: "Gamertag (Epic ID)", en: "Gamertag (Epic ID)" },
    "vg.th.elims": { es: "Eliminaciones", en: "Eliminations" },
    "vg.th.reward": { es: "Premio canjeable", en: "Redeemable reward" },

    "vg.flash.eyebrow": { es: "Catálogo", en: "Catalogue" },
    "vg.flash.title": { es: "Colección limitada: Gamer & Pop Culture", en: "Limited Collection: Gamer & Pop Culture" },
    "vg.flash1.style": { es: "Neotradicional", en: "Neo-traditional" },
    "vg.flash1.name": { es: "Slurp Juice Jar", en: "Slurp Juice Jar" },
    "vg.flash2.style": { es: "Puntillismo / Microrrealismo", en: "Pointillism / Micro-realism" },
    "vg.flash2.name": { es: "Fortnite Flame", en: "Fortnite Flame" },
    "vg.flash3.style": { es: "Gótico estilizado", en: "Stylized Gothic" },
    "vg.flash3.name": { es: "Victory Royale Phrase", en: "Victory Royale Phrase" },
    "vg.flash.book": { es: "Reservar este flash", en: "Book this flash" },

    "vg.bp.eyebrow": { es: "Fidelización gamificada", en: "Gamified loyalty" },
    "vg.bp.title": { es: "Arkham Battle Pass.", en: "Arkham Battle Pass." },
    "vg.bp1.h": { es: "First Flash Gamer", en: "First Flash Gamer" },
    "vg.bp1.p": { es: "Gana una carta Battle Pass + sticker.", en: "Win a Battle Pass card + sticker." },
    "vg.bp2.h": { es: "Reseña de 5 estrellas en Google", en: "5-Star review on Google" },
    "vg.bp2.p": { es: "Gana un parche de curación premium.", en: "Win a premium healing patch." },
    "vg.bp3.h": { es: "Trae a un amigo", en: "Bring a friend" },
    "vg.bp3.p": { es: "20% de descuento en tu próxima pieza.", en: "20% off your next piece." },
    "vg.bp4.h": { es: "Reto secreto", en: "Secret challenge" },
    "vg.bp4.p": { es: "Se revela dentro del estudio.", en: "Revealed in-studio." },
    "vg.bp5.h": { es: "Master Ink", en: "Master Ink" },
    "vg.bp5.p": { es: "Camiseta o hoodie oficial, gratis.", en: "Free official t-shirt or hoodie." },

    /* ---------------- ARTIST DETAIL PAGE ---------------- */
    "art.crumb.home": { es: "Inicio", en: "Home" },
    "art.crumb.artists": { es: "Artistas", en: "Artists" },
    "art.cta": { es: "Agenda tu sesión", en: "Book your session" },
    "art.photo.note": { es: "Espacio reservado — reemplazar con fotografía profesional del artista.", en: "Reserved space — replace with a professional photograph of the artist." },
    "art.gallery.eyebrow": { es: "Portafolio", en: "Portfolio" },
    "art.gallery.title": { es: "Piezas seleccionadas.", en: "Selected pieces." },
    "art.others.eyebrow": { es: "El colectivo", en: "The collective" },
    "art.others.title": { es: "Otros artistas.", en: "Other artists." },
  };

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || "es";
  }

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      const entry = dict[key];
      if (entry && entry[lang]) node.textContent = entry[lang];
    });
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });
    document.querySelectorAll("[data-i18n-title]").forEach((node) => {
      const key = node.getAttribute("data-i18n-title");
      const entry = dict[key];
      if (entry && entry[lang]) node.setAttribute("title", entry[lang]);
    });
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
    document.dispatchEvent(new CustomEvent("arkham:langchange", { detail: { lang } }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyLang(getLang());
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
  });

  window.ArkhamI18n = { dict, getLang, setLang, applyLang };
})();
