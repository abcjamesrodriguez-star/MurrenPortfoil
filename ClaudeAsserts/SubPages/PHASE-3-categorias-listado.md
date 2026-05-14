# PHASE 3 — Categorías (Listado)
> Vista de todas las categorías de productos.

## Ruta
`/categorias` → `src/app/categorias/page.tsx`

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
│   └── categorias/
│       └── page.tsx                  # Server Component — lista todas las categorías
│
├── components/
│   └── categorias/
│       ├── CategoriasHero.tsx        # "// CATEGORÍAS" + h1 + descripción
│       ├── CategoriasGrid.tsx        # Grid 5 columnas de tarjetas
│       └── CategoriaCard.tsx         # Imagen, nombre, "Ver todo →"
│
├── lib/
│   └── categorias.ts                 # tipo Category + datos mock
│
└── types/
    └── index.ts                      # export type Category
```

---

## Tipo de dato

```ts
// src/types/index.ts
export type Category = {
  id: string
  slug: string
  nombre: string              // "CHAQUETAS" | "HOODIES" | "CAMISETAS" etc.
  imagen: string
  totalProductos?: number
}
```

## Categorías del wireframe
Fila 1: CHAQUETAS · HOODIES · CAMISETAS · PANTALONES · FALDAS
Fila 2: TOPS · ACCESORIOS · BOLSOS · GORRAS · CALZADO

---

## Fases de desarrollo

### Fase 3.1 — Ruta y datos
- [ ] Crear `src/app/categorias/page.tsx`
- [ ] Definir tipo `Category` en `src/types/index.ts`
- [ ] Crear 10 categorías mock en `src/lib/categorias.ts`
- [ ] Cada categoría con: id, slug, nombre, imagen placeholder

### Fase 3.2 — Hero de la sección
- [ ] Componente `CategoriasHero.tsx`
- [ ] Layout: eyebrow `// CATEGORÍAS`, h1 "Explora por categoría", dos líneas de descripción
- [ ] Sin imagen a la derecha (a diferencia de Colecciones) — solo texto a la izquierda
- [ ] Server Component

### Fase 3.3 — Grid de categorías
- [ ] Componente `CategoriasGrid.tsx` — grid 5 columnas (`grid-cols-2 sm:grid-cols-3 md:grid-cols-5`)
- [ ] Componente `CategoriaCard.tsx`:
  - `next/image` cuadrada con placeholder
  - Nombre en mayúsculas y negrita
  - Texto "Ver todo →" con ícono `ArrowRight` de Phosphor
  - Link a `/categorias/[slug]`
  - Hover: leve elevación o scale en imagen

### Fase 3.4 — Animaciones Framer Motion
- [ ] Hero: fade-in desde izquierda `{ opacity:0, x:-20 }` → `{ opacity:1, x:0 }`
- [ ] Grid: stagger de cards `staggerChildren: 0.06` al entrar en viewport
- [ ] Cards: `whileHover={{ scale: 1.03 }}` en la imagen

---

## Notas
- Esta página no tiene tabs ni filtros — es una vista limpia de navegación.
- `CategoriaCard` es diferente a `ColeccionCard` (Phase 1): no tiene temporada, tiene "Ver todo".
- Las rutas `/categorias/[slug]` se construyen en Phase 4.
- Si el navbar tiene un dropdown "CATEGORÍAS", este listado también sirve para poblar ese menú desde los mismos datos mock.
