# PHASE 5 — Componentes Reutilizables
> Biblioteca de componentes compartidos entre todas las páginas.

## Ubicación
`src/components/ui/`

---

## Stack
- React 19 · TypeScript
- Tailwind CSS v4
- Framer Motion
- Phosphor Icons

---

## Índice de componentes

| ID | Nombre | Usado en |
|---|---|---|
| A | `ColeccionCard` | Phase 1 |
| B | `CategoriaCard` | Phase 3 |
| C | `ProductoCard` | Phase 2, Phase 4 |
| D | `FiltroBar` | Phase 2, Phase 4 |
| E | `OrdenarPor` | Phase 2, Phase 4 |
| F | `CargarMasBtn` | Phase 1, Phase 2, Phase 4 |

---

## Estructura de archivos

```
src/
└── components/
    └── ui/
        ├── ColeccionCard.tsx
        ├── CategoriaCard.tsx
        ├── ProductoCard.tsx
        ├── FiltroBar.tsx
        ├── OrdenarPor.tsx
        ├── CargarMasBtn.tsx
        └── index.ts              # re-export de todos los componentes UI
```

---

## Fases de desarrollo

### Fase 5.1 — ColeccionCard (A)

Props:
```ts
type ColeccionCardProps = {
  slug: string
  nombre: string
  temporada: string
  imagen: string
}
```
- [ ] Imagen con `next/image`, ratio cuadrado o 4:5
- [ ] Nombre en mayúsculas negrita, temporada en gris
- [ ] Ícono `ArrowRight` de Phosphor, visible siempre o al hover
- [ ] Link completo con `next/link` a `/colecciones/[slug]`
- [ ] Hover: scale sutil en imagen (`scale-105`, `transition-transform`)

---

### Fase 5.2 — CategoriaCard (B)

Props:
```ts
type CategoriaCardProps = {
  slug: string
  nombre: string
  imagen: string
}
```
- [ ] Imagen cuadrada con `next/image`
- [ ] Nombre en mayúsculas
- [ ] Texto "Ver todo" + `ArrowRight` de Phosphor
- [ ] Link a `/categorias/[slug]`
- [ ] Hover: elevación con `shadow-md` o scale en imagen

---

### Fase 5.3 — ProductoCard (C)

Props:
```ts
type ProductoCardProps = {
  id: string
  slug: string
  nombre: string
  precio: number
  imagen: string
  defaultFavorito?: boolean
}
```
- [ ] Imagen con `next/image`, ratio 3:4
- [ ] Ícono corazón `Heart` / `HeartStraight` de Phosphor en esquina superior derecha
- [ ] Toggle favorito con `useState` local (sin persistencia en esta fase)
- [ ] Nombre del producto en una línea (truncar con `truncate` si es largo)
- [ ] Precio formateado con `Intl.NumberFormat` en COP o moneda del proyecto
- [ ] Link a `/productos/[slug]` (ruta futura)
- [ ] Hover: scale en imagen, corazón siempre visible en mobile / visible al hover en desktop

---

### Fase 5.4 — FiltroBar (D)

Props:
```ts
type FiltroBarProps = {
  filtros: FiltroOption[]          // lista de filtros a mostrar
  valores: Record<string, string | null>
  onChange: (key: string, valor: string | null) => void
}

type FiltroOption = {
  key: string
  label: string                    // "CATEGORÍA" | "TALLA" | "COLOR" | "PRECIO"
  opciones: string[]
}
```
- [ ] `"use client"`
- [ ] Cada filtro renderiza como dropdown botón + lista de opciones
- [ ] Botón activo (con valor seleccionado): borde más marcado o fondo gris claro
- [ ] Click fuera cierra el dropdown (`useEffect` + `ref`)
- [ ] Opción "Limpiar" dentro de cada dropdown para resetear ese filtro

---

### Fase 5.5 — OrdenarPor (E)

Props:
```ts
type OrdenarPorProps = {
  valor: string | null
  onChange: (valor: string) => void
  opciones?: { label: string; value: string }[]
}
```
- [ ] `"use client"`
- [ ] Dropdown alineado a la derecha
- [ ] Opciones por defecto: Más nuevos · Precio: menor a mayor · Precio: mayor a menor
- [ ] Separado visualmente de `FiltroBar` (a la derecha del contenedor)

---

### Fase 5.6 — CargarMasBtn (F)

Props:
```ts
type CargarMasBtnProps = {
  onClick: () => void
  visible: boolean        // false cuando no hay más items para mostrar
  loading?: boolean       // true mientras carga (muestra spinner)
}
```
- [ ] `"use client"`
- [ ] Botón centrado, borde negro, texto "CARGAR MÁS"
- [ ] Si `loading=true`: spinner con `motion.div` girando
- [ ] Si `visible=false`: no renderizar (`return null`)
- [ ] Hover: fondo negro, texto blanco

---

### Fase 5.7 — Barrel export

```ts
// src/components/ui/index.ts
export { default as ColeccionCard } from './ColeccionCard'
export { default as CategoriaCard } from './CategoriaCard'
export { default as ProductoCard } from './ProductoCard'
export { default as FiltroBar } from './FiltroBar'
export { default as OrdenarPor } from './OrdenarPor'
export { default as CargarMasBtn } from './CargarMasBtn'
```

---

## Orden de construcción recomendado

```
ProductoCard → ColeccionCard → CategoriaCard → CargarMasBtn → FiltroBar → OrdenarPor
```
Empezar por los más simples (sin estado) y terminar con los que manejan lógica de dropdowns.

---

## Notas generales
- Todos los componentes deben tener sus props tipadas con TypeScript (sin `any`).
- Usar `"use client"` solo en los que tienen estado o eventos del browser.
- Los componentes de tarjeta (A, B, C) son Server Components por defecto, excepto `ProductoCard` que tiene el toggle de favorito.
- En Phase 5 no se construyen nuevas páginas — solo se extraen, consolidan y documentan los componentes ya creados en fases anteriores.
