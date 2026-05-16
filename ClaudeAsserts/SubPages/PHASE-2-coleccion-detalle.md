# PHASE 2 — Colección (Detalle)
> Vista de una colección específica con sus productos.

## Ruta
`/colecciones/[slug]` → `src/app/colecciones/[slug]/page.tsx`

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
│   └── colecciones/
│       └── [slug]/
│           └── page.tsx              # Server Component — fetch colección por slug
│
├── components/
│   └── coleccion-detalle/
│       ├── ColeccionHero.tsx         # Imagen fullwidth + temporada + nombre + descripción
│       ├── ColeccionFiltros.tsx      # Barra: FILTRAR · CATEGORÍA · TALLA · COLOR · ORDENAR POR
│       ├── ProductosGrid.tsx         # Grid 4 columnas de productos
│       ├── ProductoCard.tsx          # Tarjeta: imagen, corazón, nombre, precio
│       └── CargarMasBtn.tsx          # Reutilizar de Phase 1
│
├── lib/
│   ├── colecciones.ts                # getColeccionBySlug()
│   └── productos.ts                  # tipo Product + getProductosByColeccion(slug)
│
└── types/
    └── index.ts                      # export type Product
```

---

## Tipos de datos

```ts
// src/types/index.ts
export type Product = {
  id: string
  slug: string
  nombre: string
  precio: number
  imagen: string
  coleccion: string           // slug de la colección padre
  categoria: string           // "chaquetas" | "hoodies" | "camisetas" etc.
  tallas: string[]            // ["XS","S","M","L","XL"]
  colores: string[]
  favorito?: boolean
}

export type FiltroState = {
  categoria: string | null
  talla: string | null
  color: string | null
  orden: "precio-asc" | "precio-desc" | "nuevo" | null
}
```

---

## Fases de desarrollo

### Fase 2.1 — Ruta dinámica y datos
- [ ] Crear `src/app/colecciones/[slug]/page.tsx`
- [ ] Implementar `generateStaticParams()` desde `src/lib/colecciones.ts`
- [ ] Implementar `generateMetadata()` con nombre de la colección en el `<title>`
- [ ] Agregar función `getProductosByColeccion(slug)` en `src/lib/productos.ts`
- [ ] Datos mock: 8 productos por colección mínimo

### Fase 2.2 — Hero de la colección
- [ ] Componente `ColeccionHero.tsx`
- [ ] Imagen de fondo fullwidth con overlay oscuro
- [ ] Sobre la imagen: temporada (ej. "SS24"), nombre grande (ej. "MURREN"), descripción
- [ ] Texto alineado abajo-izquierda sobre la imagen

### Fase 2.3 — Barra de filtros
- [ ] Componente `ColeccionFiltros.tsx` como `"use client"`
- [ ] Estado `FiltroState` con `useReducer` o varios `useState`
- [ ] Dropdowns para: CATEGORÍA · TALLA · COLOR (simples con estado local)
- [ ] Dropdown ORDENAR POR separado a la derecha
- [ ] Al cambiar filtro, emitir callback `onFiltroChange(filtros)` al padre

### Fase 2.4 — Grid de productos
- [ ] Componente `ProductosGrid.tsx` — grid 4 columnas (`grid-cols-2 md:grid-cols-4`)
- [ ] Componente `ProductoCard.tsx`:
  - `next/image` para la imagen del producto
  - Ícono corazón `Heart` de Phosphor — toggle favorito con `useState`
  - Nombre del producto
  - Precio formateado (`$000.000`)
  - Hover: leve scale en imagen (`scale-105`)
  - Link a `/productos/[slug]` (para fases futuras)

### Fase 2.5 — Lógica de filtrado
- [ ] Filtrar array de productos según `FiltroState` activo
- [ ] Ordenar según selección (precio asc/desc, más nuevo)
- [ ] Conectar `ColeccionFiltros` → `ProductosGrid` a través del `page.tsx` o un context local

### Fase 2.6 — Cargar más
- [ ] Reutilizar `CargarMasBtn` de Phase 1
- [ ] Mostrar 8 productos, sumar 4 por click

### Fase 2.7 — Animaciones Framer Motion
- [ ] Hero: fade-in del texto desde abajo al cargar
- [ ] Grid: stagger de cards al entrar en viewport (`whileInView`, `once: true`)
- [ ] Filtros: cuando cambian, reanimar el grid con `AnimatePresence` + `key={filtroActivo}`

---

## Notas
- `ColeccionHero` recibe los datos de la colección como props desde el Server Component padre.
- `ColeccionFiltros` y `ProductosGrid` son Client Components que comparten estado.
- El corazón/favorito en esta fase es solo UI local (sin persistencia). La persistencia se puede agregar con localStorage o API en una fase posterior.
- Reutilizar `ProductoCard` en Phase 4 (Categoría Detalle).
