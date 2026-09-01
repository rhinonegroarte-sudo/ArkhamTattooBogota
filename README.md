# Arkham Tattoo Bogotá — sitio web

Sitio estático (HTML/CSS/JS, sin build step) listo para abrir directamente o
subir a cualquier hosting estático (Netlify, Vercel, GitHub Pages, cPanel, etc).

## Cómo verlo
- **Rápido:** doble clic en `index.html`. Todo funciona sin servidor porque no
  hay dependencias externas de red (GSAP está incluido localmente en
  `assets/js/vendor/`).
- **Recomendado:** súbelo tal cual a tu hosting. No requiere Node, PHP, ni
  base de datos.

## Estructura
```
index.html          → Home (hero cinemático, sobre nosotros, artistas, portafolio)
services.html        → Servicios (smoke shop, perforaciones)
videojuego.html       → Arkham Arena (Fortnite UEFN, torneo, catálogo, battle pass)
artista.html?a=raven  → Plantilla de perfil de artista (raven / dali / miko)
assets/css/           → base.css (tokens/diseño compartido) + 1 archivo por página
assets/js/             → i18n.js, main.js, artist-data.js, vendor/ (GSAP local)
assets/img/            → tus imágenes originales
```

## Qué es un placeholder (y hay que reemplazar)
- **Fotos de artistas:** las 3 tarjetas de artista (Andrés Castro / Gabriela / Miko) usan
  un monograma + textura en vez de una foto real. Edita
  `assets/js/artist-data.js` (nombre, especialidad, bio) y reemplaza la
  imagen en `.artist-photo img` / `.artist-card .texture` cuando tengas
  fotografía profesional de cada tatuador.
- **Portafolio (galería):** las grillas "Trabajo reciente" usan las fotos que
  subiste como textura temporal. Reemplaza cada `<img>` en la sección
  `.gallery-grid` de `index.html` y `artista.html` con fotos reales de piezas
  tatuadas en alta resolución.
- **Catálogo smoke shop / perforaciones:** cada categoría en `services.html`
  tiene 1 foto real + 2 espacios "+" para agregar más productos — solo
  reemplaza los `<div class="rail-card is-add">` por `<img>` cuando tengas
  más fotos de producto.

## Textos (bilingüe ES/EN)
Todo el texto vive en un solo diccionario: `assets/js/i18n.js`. Cada línea
tiene una clave (`"hero.title.1"`) con `es` y `en`. Editar el texto del sitio
= editar ese archivo, no el HTML.

## Datos de contacto ya conectados
- WhatsApp: todos los botones "Agenda tu cita" / "Comprar / Reservar" abren
  wa.me con el número +57 310 775 6034.
- Instagram, X y Facebook: enlazados en el footer.
- Mapa: Google Maps embebido con la dirección Cl. 53 #9-13, Bogotá.
- Código UEFN de Fortnite: `1234-5678-9012` — es un placeholder, reemplázalo
  en `videojuego.html` (`[data-code-value]`) por el código real del mapa
  cuando esté publicado en Epic Games / UEFN.

## Nota importante sobre la imagen del video juego
`Imagen_de_fondo_VIDEOJUEGO_.jpg` (personaje con tatuajes + mascota) tiene el
estilo visual de una imagen promocional oficial de Fortnite/Epic Games (así
se ven las tarjetas de la tienda del juego). La usé tal como la subiste, pero
antes de publicar el sitio te recomendamos confirmar que tienen derecho de
uso, o reemplazarla por arte propio de "Arkham Arena" — usar assets
oficiales de Epic en un sitio comercial puede tener restricciones de marca.

## Rendimiento y accesibilidad
- Las animaciones de scroll (GSAP) tienen un *fallback*: si por algún motivo
  no cargan, el contenido sigue siendo 100% visible y legible — nunca se
  queda oculto.
- Respeta `prefers-reduced-motion`.
- Imágenes de servicios/video juego optimizadas a JPEG (de ~7.6 MB a ~1.2 MB
  en total).
