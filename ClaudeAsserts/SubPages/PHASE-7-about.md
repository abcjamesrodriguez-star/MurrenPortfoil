# PHASE 7 — About Us
> Página institucional de la marca. Cuatro bandas: Hero, Valores + Stats, Mensaje, CTA + Redes.

## Ruta
`/about` → `src/app/about/page.tsx`

---

## Stack
- Next.js 15 App Router · React 19 · TypeScript
- Tailwind CSS v4
- Framer Motion
- Phosphor Icons

---

## Estructura de archivos

```
src/
├── app/
│   └── about/
│       └── page.tsx                  # Server Component — ensambla todas las bandas
│
├── components/
│   └── about/
│       ├── AboutHero.tsx             # Banda 1: texto izq + imagen centro + historia der + decorativo
│       ├── AboutValores.tsx          # Banda 2 izq: 2 imágenes + lista de valores
│       ├── AboutStats.tsx            # Banda 2 der: 4 stats numéricos
│       ├── AboutMensaje.tsx          # Banda 3 izq: logo grande + texto bienvenida
│       ├── AboutImagenGrupal.tsx     # Banda 3 centro: imagen grupal
│       └── AboutCTA.tsx              # Banda 3 der: "¿LISTO?" + título + redes sociales
│
└── lib/
    └── about.ts                      # datos estáticos de la página
```

---

## Tipo de dato

```ts
// src/lib/about.ts

export const aboutData = {
  hero: {
    eyebrow: "// ABOUT US",
    titulo: "NO SOMOS\nPARA TODOS.",
    descripcion: "MUREN nace desde la necesidad de expresarnos sin pedir permiso. Ropa para quienes viven diferente, piensan diferente y rompen lo establecido.",
    linkManifiesto: "/manifiesto",
    imagenPrincipal: "/images/about/hero.jpg",
    historia: {
      eyebrow: "// NUESTRA HISTORIA",
      parrafos: [
        "Todo comenzó en las calles.\nEntre el ruido, el arte urbano y la cultura underground, encontramos nuestra voz.",
        "Cada pieza que creamos lleva ese espíritu: libertad, autenticidad y actitud sin filtros.",
        "MUREN no sigue tendencias.\nLas ignora.",
      ]
    }
  },
  valores: {
    imagenes: [
      { src: "/images/about/valores-1.jpg", fecha: "25 | 07\n20 : 15" },
      { src: "/images/about/valores-2.jpg" },
    ],
    lista: [
      { icono: "X",         titulo: "AUTENTICIDAD", descripcion: "No imitamos. Creamos desde lo real." },
      { icono: "Globe",     titulo: "LIBERTAD",     descripcion: "Diseñamos para quienes no encajan." },
      { icono: "Sparkle",   titulo: "CREATIVIDAD",  descripcion: "Cada detalle cuenta una historia." },
      { icono: "Graffiti",  titulo: "ACTITUD",      descripcion: "No es solo ropa. Es una forma de vivir." },
    ]
  },
  stats: [
    { valor: "2019", label: "AÑO DE FUNDACIÓN" },
    { valor: "06",   label: "COLECCIONES" },
    { valor: "27+",  label: "PAÍSES" },
    { valor: "∞",    label: "ACTITUD" },
  ],
  mensaje: {
    logoTexto: "ESTO ES\nMUREN.",         // tipografía display / graffiti
    parrafos: [
      "Para los que eligen su propio camino.",
      "Para los que transforman el ruido en arte.",
    ],
    cierre: "BIENVENIDO A LA FAMILIA.",
  },
  imagenGrupal: "/images/about/grupal.jpg",
  cta: {
    eyebrow: "¿LISTO PARA SER PARTE?",
    titulo: "ÚNETE AL MOVIMIENTO.",
    redes: [
      { icono: "InstagramLogo", url: "https://instagram.com/muren" },
      { icono: "TiktokLogo",    url: "https://tiktok.com/@muren" },
      { icono: "YoutubeLogo",   url: "https://youtube.com/@muren" },
      { icono: "TwitterLogo",   url: "https://x.com/muren" },
    ]
  }
}
```

---

## Layout general

```
┌──────────────────────────────────────────────────────────────────┐
│ NAVBAR                                                           │
├──────────────────────────────────────────────────────────────────┤  ← HERO
│  Col izq (~30%)         │  Imagen centro (~40%)  │  Col der (~30%)│
│  // ABOUT US            │                        │  // NUESTRA    │
│  NO SOMOS               │   IMAGEN PRINCIPAL     │  HISTORIA      │
│  PARA TODOS.            │                        │  párrafo 1     │
│  descripción            │                        │  párrafo 2     │
│  VER MANIFIESTO →       │                        │  párrafo 3     │
│                         │                        │  ✦ decorativo  │  ← tab lateral "HISTORIA + DECORATIVO"
├──────────────────────────────────────────────────────────────────┤  ← VALORES + STATS
│  Img1 │ Img2 + fecha  │  // NUESTROS VALORES  │  2019 │06│27+│∞  │
│       │               │  × AUTENTICIDAD       │  AÑO  │COL│PAÍ│ACT│
│       │               │  ⊕ LIBERTAD           │       │   │   │   │
│       │               │  ✦ CREATIVIDAD        │       │   │   │   │
│       │               │  ψ ACTITUD            │                   │  ← tab lateral "VALORES + IMÁGENES" / "STATS"
├──────────────────────────────────────────────────────────────────┤  ← MENSAJE + CTA
│  ESTO ES     │ texto + BIENVENIDO  │  IMAGEN GRUPAL  │  CTA+REDES │
│  MUREN.      │ A LA FAMILIA.       │                 │  SÍGUENOS  │  ← tabs "MENSAJE + TEXTO" / "CTA + REDES"
└──────────────────────────────────────────────────────────────────┘
```

---

## Fases de desarrollo

### Fase 7.1 — Ruta y datos

- [ ] Crear `src/app/about/page.tsx` como Server Component
- [ ] Crear `src/lib/about.ts` con el objeto `aboutData` completo
- [ ] `generateMetadata()` — título: `"About — MUREN"`
- [ ] Importar y ensamblar los 6 componentes en orden

---

### Fase 7.2 — Banda 1: Hero

Componente: `AboutHero.tsx` — `"use client"` (por animaciones)

Layout: `grid grid-cols-[30%_40%_30%]` · altura mínima `min-h-[80vh]`

**Columna izquierda:**
- [ ] Eyebrow `// ABOUT US` — fuente mono o condensed, gris
- [ ] Título `NO SOMOS PARA TODOS.` — tipografía display muy grande, peso 900, leading tight
- [ ] Párrafo de descripción — fuente regular, tamaño pequeño, máx 280px ancho
- [ ] Link `VER MANIFIESTO →` con `ArrowRight` Phosphor — subrayado al hover, animación slide

**Columna central:**
- [ ] `next/image` con `fill` `object-cover`
- [ ] Sin texto superpuesto
- [ ] Borde gris en los 4 lados (`border border-border`)

**Columna derecha:**
- [ ] Eyebrow `// NUESTRA HISTORIA` — misma fuente que eyebrow izquierdo
- [ ] Tres párrafos de texto separados por espacio (`space-y-4`)
- [ ] Elemento decorativo `✦` (estrella de 8 puntas) en la esquina inferior derecha
  - SVG inline o ícono `Sparkle` de Phosphor a tamaño grande (~80px)
  - `opacity-20` o `opacity-30`
  - Puede tener animación `rotate` lenta en loop con Framer Motion

**Tab lateral derecho** (`HISTORIA + DECORATIVO`):
- [ ] Texto vertical rotado `writing-mode: vertical-rl` pegado al borde derecho
- [ ] `text-xs tracking-widest text-muted-foreground`
- [ ] `absolute right-0 top-1/2 -translate-y-1/2`

---

### Fase 7.3 — Banda 2 izquierda: Valores + Imágenes

Componente: `AboutValores.tsx` — `"use client"`

Layout: `grid grid-cols-[200px_200px_1fr]` dentro de la banda izquierda de la fila

**Imagen 1 (columna 1):**
- [ ] `next/image` vertical, `object-cover`, altura completa de la banda
- [ ] Sin texto

**Imagen 2 (columna 2):**
- [ ] `next/image` vertical, `object-cover`
- [ ] Fecha sobreimpresa en la esquina inferior derecha dentro de la imagen
  - Formato: `25 | 07 / 20 : 15` — fuente mono, tamaño muy pequeño, color blanco
  - `absolute bottom-3 right-3`

**Lista de valores (columna 3):**
- [ ] Eyebrow `// NUESTROS VALORES`
- [ ] Cuatro ítems, cada uno con:
  - Ícono Phosphor a la izquierda (24px, `weight="light"`)
  - Nombre en mayúsculas negrita
  - Descripción en gris debajo
  - `border-b border-border` como separador
- [ ] Íconos por valor:
  - AUTENTICIDAD → `X` (ícono `X` o `Prohibit`)
  - LIBERTAD → `Globe`
  - CREATIVIDAD → `Sparkle`
  - ACTITUD → `Graffiti` o `PaintBrush`

**Tab lateral izquierdo** (`VALORES + IMÁGENES`):
- [ ] Mismo patrón que tab de la Banda 1, pegado al borde izquierdo

---

### Fase 7.4 — Banda 2 derecha: Stats

Componente: `AboutStats.tsx` — `"use client"` (por animación de conteo)

Layout: `grid grid-cols-4` · fondo blanco o gris muy claro · `border-l border-border`

Cada stat:
- [ ] Número grande en tipografía display (tamaño ~64px o más grande)
- [ ] Label en mayúsculas, fuente pequeña, gris, `tracking-widest`
- [ ] Separador vertical `border-r border-border` entre cada stat
- [ ] El stat `∞` usa el símbolo Unicode directamente, misma tipografía

Animación de conteo:
- [ ] Al entrar en viewport (`whileInView`, `once: true`), los números cuentan desde 0 hasta el valor final
- [ ] Usar `useMotionValue` + `useTransform` de Framer Motion o animación manual con `useState` + `useEffect`
- [ ] `2019` cuenta desde `2010`, `06` desde `0`, `27` desde `0`
- [ ] El `∞` no cuenta — aparece con fade-in

**Tab lateral derecho** (`STATS`):
- [ ] Mismo patrón de tab lateral, borde derecho de esta banda

---

### Fase 7.5 — Banda 3 izquierda: Mensaje de marca

Componente: `AboutMensaje.tsx` — Server Component

Layout: `grid grid-cols-2` dentro de la columna izquierda de la banda 3

**Sub-columna izquierda (logo texto):**
- [ ] Texto `ESTO ES` — fuente regular pequeña
- [ ] `MUREN.` — tipografía display graffiti / condensed muy grande, peso 900
  - Si hay una fuente custom de marca, cargarla con `next/font/local`
  - Si no: usar fuente condensed bold disponible en Google Fonts (ej. `Bebas Neue`, `Anton`)
- [ ] Padding generoso para que respire

**Sub-columna derecha (texto):**
- [ ] Dos párrafos: `"Para los que eligen su propio camino."` / `"Para los que transforman el ruido en arte."`
- [ ] Separador `<hr>` o `border-b` antes del cierre
- [ ] Cierre subrayado: `BIENVENIDO A LA FAMILIA.` — `font-medium underline underline-offset-4`

**Tab lateral izquierdo** (`MENSAJE + TEXTO`):
- [ ] Mismo patrón de tab lateral, borde izquierdo

---

### Fase 7.6 — Banda 3 centro: Imagen grupal

Componente: `AboutImagenGrupal.tsx` — Server Component

- [ ] `next/image` con `fill` `object-cover` — altura fija de la banda (~400px)
- [ ] Sin texto superpuesto
- [ ] Borde en los 4 lados

---

### Fase 7.7 — Banda 3 derecha: CTA + Redes

Componente: `AboutCTA.tsx` — Server Component

Layout: centrado vertical y horizontal · `border border-border` con esquinas en L

**Esquinas decorativas:**
- [ ] Cuatro esquinas con `border-l border-t` (arriba izq), `border-r border-t` (arriba der), etc.
  - Implementar con 4 `<span>` absolutamente posicionados en cada corner
  - Tamaño de la esquina: ~20px × 20px
  - Equivalen a las esquinas rectangulares del wireframe

**Contenido:**
- [ ] Eyebrow `¿LISTO PARA SER PARTE?` — fuente pequeña gris
- [ ] Título `ÚNETE AL MOVIMIENTO.` — tipografía display grande, peso 900
- [ ] Label `SÍGUENOS` — gris pequeño
- [ ] Fila de 4 íconos de redes sociales:
  - `InstagramLogo` Phosphor → link Instagram
  - `TiktokLogo` Phosphor → link TikTok
  - `YoutubeLogo` Phosphor → link YouTube
  - `TwitterLogo` Phosphor → link X/Twitter
  - Cada ícono en un `<a>` con `target="_blank" rel="noopener noreferrer"`
  - Tamaño 28px, color negro, hover: `opacity-60` transition

**Tab lateral derecho** (`CTA + REDES`):
- [ ] Mismo patrón de tab lateral, borde derecho

---

### Fase 7.8 — Tabs laterales (patrón global de la página)

Todas las bandas tienen etiquetas de sección pegadas al borde lateral. Patrón reutilizable:

```tsx
// Uso dentro de cada componente
<div className="absolute right-0 top-1/2 -translate-y-1/2 -rotate-90
                text-[10px] tracking-[0.2em] text-muted-foreground
                whitespace-nowrap select-none pointer-events-none">
  NOMBRE DE LA SECCIÓN
</div>
```

- [ ] El wrapper de cada banda debe tener `position: relative` (`relative`) para que el tab se posicione correctamente
- [ ] Izquierdo: `left-0` + `rotate-90` · Derecho: `right-0` + `-rotate-90`

---

### Fase 7.9 — Animaciones Framer Motion

- [ ] **Hero títulos:** stagger `{ opacity:0, y:30 }` → `{ opacity:1, y:0 }` con `staggerChildren: 0.12`
- [ ] **Historia (col derecha):** cada párrafo entra con delay escalonado `whileInView`
- [ ] **Decorativo ✦:** rotación infinita lenta `animate={{ rotate: 360 }}` `transition={{ duration: 20, repeat: Infinity, ease: "linear" }}`
- [ ] **Valores:** cada ítem entra desde la izquierda `{ opacity:0, x:-16 }` con stagger `whileInView`
- [ ] **Stats:** conteo animado al entrar en viewport (ver Fase 7.4)
- [ ] **Mensaje:** fade-in simple `whileInView` `once: true`
- [ ] **CTA íconos:** hover scale `whileHover={{ scale: 1.15 }}` en cada ícono social

---

## Notas

- `page.tsx` es Server Component — solo los componentes con animaciones o interactividad llevan `"use client"`.
- Si `MUREN.` usa una fuente custom de marca, declararla en `src/app/layout.tsx` con `next/font/local` y pasarla como variable CSS a Tailwind.
- Los tabs laterales de sección son puramente decorativos — `pointer-events-none` para que no interfieran con el layout.
- Las esquinas decorativas del CTA (`AboutCTA`) se construyen con 4 spans posicionados absolutamente, no con `border-radius`.
- Esta página es completamente estática — no requiere fetch de datos externos. Todo viene de `src/lib/about.ts`.
