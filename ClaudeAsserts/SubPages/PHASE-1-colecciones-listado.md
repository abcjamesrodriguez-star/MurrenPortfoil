# PHASE 1 — Colecciones (Listado)
> Vista general de todas las colecciones disponibles.

## Ruta
`/colecciones` → `src/app/colecciones/page.tsx`

---

## Stack
- Next.js 15 App Router · React 19 · TypeScript
- Tailwind CSS v4
- Framer Motion (animaciones de entrada y tabs)
- Phosphor Icons

---

## Estructura de archivos

```
src/
├── app/
│   └── colecciones/
│       └── page.tsx                  # Server Component — fetch colecciones
│
├── components/
│   └── colecciones/
│       ├── ColeccionesHero.tsx       # "// COLECCIONES" + título + descripción + imagen derecha
│       ├── ColeccionesTabs.tsx       # Tabs: TODAS · NUEVAS · DESTACADAS · SS24 · FW23
│       ├── ColeccionesGrid.tsx       # Grid 3 columnas de tarjetas
│       ├── ColeccionCard.tsx         # Tarjeta individual: imagen, nombre, temporada, flecha
│       └── CargarMasBtn.tsx          # Botón "CARGAR MÁS" — Client Component
│
├── lib/
│   └── colecciones.ts                # tipo Collection + datos mock / fetch
│
└── types/
    └── index.ts                      # export type Collection
```

---

## Tipo de dato

```ts
// src/types/index.ts
export type Collection = {
  id: string
  slug: string
  nombre: string
  temporada: string           // "SS24" | "FW23" | "BASIC"
  tag: "NUEVA" | "DESTACADA" | "SS24" | "FW23"
  imagen: string              // ruta en /public o URL CDN
}
```

---

## Fases de desarrollo

### Fase 1.1 — Estructura base y tipos
- [ ] Crear ruta `src/app/colecciones/page.tsx`
- [ ] Definir tipo `Collection` en `src/types/index.ts`
- [ ] Crear datos mock en `src/lib/colecciones.ts` con 6 colecciones (Murren, Nebula Drop, Chrome Series, Denim Core, Midnight Club, Essentials)

### Fase 1.2 — Hero de la sección
- [ ] Componente `ColeccionesHero.tsx`
- [ ] Layout: columna izquierda (eyebrow `// COLECCIONES`, h1, descripción) + imagen placeholder derecha
- [ ] Server Component, sin animaciones en esta fase

### Fase 1.3 — Tabs de filtrado
- [ ] Componente `ColeccionesTabs.tsx` como `"use client"`
- [ ] Estado local `useState` para tab activa
- [ ] Tabs: TODAS · NUEVAS · DESTACADAS · SS24 · FW23
- [ ] Tab activa con fondo negro y texto blanco, inactivas con borde gris
- [ ] Filtrar el array de colecciones según tab seleccionada y pasar resultado a `ColeccionesGrid`

### Fase 1.4 — Grid y tarjeta
- [ ] Componente `ColeccionesGrid.tsx` — grid de 3 columnas (`grid-cols-1 md:grid-cols-3`)
- [ ] Componente `ColeccionCard.tsx`:
  - Imagen con `next/image` (placeholder `/images/colecciones/[slug].jpg`)
  - Nombre en mayúsculas, negrita
  - Temporada en gris pequeño
  - Flecha `ArrowRight` de Phosphor al hover
  - Link con `next/link` a `/colecciones/[slug]`

### Fase 1.5 — Botón cargar más
- [ ] Componente `CargarMasBtn.tsx` como `"use client"`
- [ ] Estado local `visibles` (empieza en 6, suma 3 por click)
- [ ] Ocultar botón si `visibles >= total`

### Fase 1.6 — Animaciones Framer Motion
- [ ] Hero: fade-in izquierda `{ opacity:0, x:-24 }` → `{ opacity:1, x:0 }`
- [ ] Grid cards: stagger con `staggerChildren: 0.08` al entrar en viewport
- [ ] Tab switch: `AnimatePresence` para transición suave del grid al cambiar tab

---

## Notas
- El hero de esta página es diferente al Hero principal (video). Aquí es una franja estática con imagen.
- Las colecciones deben linkear a `/colecciones/[slug]` que se construye en Phase 2.
- Preparar `generateStaticParams` en la ruta dinámica desde ya aunque se use en Phase 2.
