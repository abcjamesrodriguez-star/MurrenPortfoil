# PHASE 4 — Categoría (Detalle)
> Vista de los productos dentro de una categoría específica.

## Ruta
`/categorias/[slug]` → `src/app/categorias/[slug]/page.tsx`

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
│       └── [slug]/
│           └── page.tsx              # Server Component — fetch categoría por slug
│
├── components/
│   └── categoria-detalle/
│       ├── CategoriaHeader.tsx       # "// CATEGORÍA" + h1 nombre + descripción
│       ├── CategoriaFiltros.tsx      # TALLA · COLOR · PRECIO · ORDENAR POR
│       └── ProductosGrid.tsx         # Reutilizar de Phase 2 o crear variante
│
├── lib/
│   ├── categorias.ts                 # getCategoriaBySlug()
│   └── productos.ts                  # getProductosByCategoria(slug)
│
└── types/
    └── index.ts                      # FiltroCategoria type
```

---

## Tipo de dato

```ts
// src/types/index.ts — extensión de FiltroState
export type FiltroCategoriaState = {
  talla: string | null
  color: string | null
  precioMin: number | null
  precioMax: number | null
  orden: "precio-asc" | "precio-desc" | "nuevo" | "relevancia" | null
}
```

---

## Diferencias vs Phase 2 (Colección Detalle)

| Aspecto | Phase 2 — Colección | Phase 4 — Categoría |
|---|---|---|
| Hero | Imagen fullwidth con overlay | Solo texto (eyebrow + h1 + descripción) |
| Filtros | CATEGORÍA · TALLA · COLOR | TALLA · COLOR · PRECIO |
| Fuente de datos | `getProductosByColeccion(slug)` | `getProductosByCategoria(slug)` |
| Grid | 4 columnas | 4 columnas (mismo componente) |

---

## Fases de desarrollo

### Fase 4.1 — Ruta dinámica y datos
- [ ] Crear `src/app/categorias/[slug]/page.tsx`
- [ ] Implementar `generateStaticParams()` desde `src/lib/categorias.ts`
- [ ] Implementar `generateMetadata()` con nombre de la categoría en `<title>`
- [ ] Agregar función `getProductosByCategoria(slug)` en `src/lib/productos.ts`
- [ ] Asignar categoría a cada producto en los datos mock de Phase 2

### Fase 4.2 — Header de la categoría
- [ ] Componente `CategoriaHeader.tsx`
- [ ] Layout: eyebrow `// CATEGORÍA`, h1 con nombre (ej. "Chaquetas"), descripción corta
- [ ] Alineado a la izquierda, sin imagen
- [ ] Server Component

### Fase 4.3 — Barra de filtros
- [ ] Componente `CategoriaFiltros.tsx` como `"use client"`
- [ ] Filtros: TALLA · COLOR · PRECIO (con rango o dropdown)
- [ ] ORDENAR POR a la derecha
- [ ] Reutilizar lógica de filtrado de Phase 2, adaptar tipo `FiltroCategoriaState`
- [ ] Callback `onFiltroChange` hacia el grid

### Fase 4.4 — Grid de productos
- [ ] Reutilizar `ProductoCard` de Phase 2 sin modificaciones
- [ ] Si el layout difiere, crear `ProductosGridCategoria` con las mismas props
- [ ] Grid 4 columnas, misma lógica de "Cargar más"

### Fase 4.5 — Cargar más
- [ ] Reutilizar `CargarMasBtn` de Phase 1
- [ ] Mostrar 8 productos, sumar 4 por click

### Fase 4.6 — Animaciones Framer Motion
- [ ] Header: fade-in desde izquierda
- [ ] Grid: stagger idéntico a Phase 2
- [ ] Reanimar grid al cambiar filtros con `AnimatePresence` + `key`

---

## Notas
- `ProductoCard` debe ser 100% reutilizable entre Phase 2 y Phase 4, recibiendo los mismos props.
- El filtro de PRECIO puede ser un doble input de rango (min/max) o un dropdown con rangos predefinidos ("menos de $50k", "$50k – $100k", etc.) — definir con diseño.
- Esta fase depende de que los datos mock de productos (Phase 2) tengan el campo `categoria` correctamente asignado.
