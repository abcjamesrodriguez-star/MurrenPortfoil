# PHASE 6 — Producto (Detalle)
> Vista completa de un producto individual.

## Ruta
`/productos/[slug]` → `src/app/productos/[slug]/page.tsx`

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
│   └── productos/
│       └── [slug]/
│           └── page.tsx
│
├── components/
│   └── producto-detalle/
│       ├── ProductoGaleria.tsx         # Columna izquierda: thumbnails + imagen principal
│       ├── ProductoInfo.tsx            # Columna derecha: nombre, precio, color, talla, CTAs
│       ├── ProductoTabs.tsx            # Sidebar derecho vertical: DETALLES · ENVÍOS · DEVOLUCIONES
│       ├── ProductoAccordion.tsx       # Sección inferior izq: DESCRIPCIÓN · MATERIALES · CUIDADOS · COMPOSICIÓN
│       ├── ProductoDetallesMedia.tsx   # Sección inferior der: imagen grande + 4 thumbnails
│       ├── ColeccionBanner.tsx         # Banda: nombre colección + temporada + imagen + "VER COLECCIÓN →"
│       ├── VistoEn.tsx                 # Banda: 3 imágenes editoriales / lifestyle
│       ├── ProductosRelacionados.tsx   # Carrusel horizontal "TAMBIÉN TE PUEDE GUSTAR"
│       └── StickyBar.tsx              # Barra sticky bottom: imagen · nombre · precio · talla · "AGREGAR AL CARRITO"
│
├── lib/
│   └── productos.ts                    # getProductoBySlug() · getProductosRelacionados()
│
└── types/
    └── index.ts                        # ProductoDetalle type
```

---

## Tipo de dato

```ts
// src/types/index.ts
export type ProductoDetalle = {
  id: string
  slug: string
  nombre: string
  precio: number
  descripcion: string
  coleccion: { slug: string; nombre: string; temporada: string }
  imagenes: string[]                    // mínimo 6 para la galería
  colores: { nombre: string; hex: string }[]
  tallas: { valor: string; disponible: boolean }[]
  materiales: string
  cuidados: string
  composicion: string
  imagenesDetalle: string[]             // 1 grande + 4 pequeñas
  imagenesVisto: string[]               // 3 imágenes lifestyle
  relacionados: ProductoCard[]          // mínimo 5 para el carrusel
}
```

---

## Layout general

```
┌─────────────────────────────────────────────────────┐
│ NAVBAR                                              │
├──────┬──────────────────────┬───────────┬───────────┤
│Thumb │                      │           │  DETALLES │ ← tabs verticales
│nails │   Imagen principal   │  Info     │  ENVÍOS   │   lado derecho
│      │   (expandible)       │  producto │  DEVOLUC. │
│      │   01 / 06 ──────     │           │           │
├──────┴──────────────────────┼───────────┴───────────┤
│ Accordion izquierdo         │ Imagen grande + 4 mini│
│ DESCRIPCIÓN · MATERIALES    │ (detalles del producto)│
│ CUIDADOS · COMPOSICIÓN      │                       │
├──────────────┬──────────────┴───────────────────────┤
│ Colección    │ VISTO EN                             │
│ banner       │ 3 imágenes editoriales               │
├──────────────┴──────────────────────────────────────┤
│ TAMBIÉN TE PUEDE GUSTAR — carrusel horizontal       │
├─────────────────────────────────────────────────────┤
│ STICKY BAR BOTTOM (aparece al scrollear)            │
└─────────────────────────────────────────────────────┘
```

---

## Fases de desarrollo

### Fase 6.1 — Ruta dinámica y datos

- [ ] Crear `src/app/productos/[slug]/page.tsx`
- [ ] Implementar `generateStaticParams()` desde `src/lib/productos.ts`
- [ ] Implementar `generateMetadata()` — título: `"${nombre} — ${coleccion.nombre}"`
- [ ] Función `getProductoBySlug(slug)` que retorne `ProductoDetalle`
- [ ] Función `getProductosRelacionados(slug, categoria)` que retorne 5+ productos
- [ ] Datos mock completos: mínimo 2 productos con todas las propiedades del tipo

---

### Fase 6.2 — Galería de imágenes (izquierda)

Componente: `ProductoGaleria.tsx` — `"use client"`

- [ ] Lista vertical de thumbnails a la izquierda (6 imágenes)
- [ ] Flechas arriba/abajo para scroll de thumbnails con `useState`
- [ ] Imagen principal grande en el centro — cambia al clickear thumbnail
- [ ] Indicador `01 / 06` debajo de la imagen principal
- [ ] Barra de progreso thin bajo el contador
- [ ] Botón expandir (ícono `ArrowsOut` de Phosphor) en esquina superior derecha de la imagen
- [ ] Modal fullscreen al expandir con `AnimatePresence` de Framer Motion
- [ ] Swipe en mobile con `drag="x"` de Framer Motion

Props:
```ts
type ProductoGaleriaProps = {
  imagenes: string[]
  nombre: string
}
```

---

### Fase 6.3 — Info del producto (derecha)

Componente: `ProductoInfo.tsx` — `"use client"`

- [ ] Breadcrumb: `← COLECCIÓN: URBAN FLOW` con link a `/colecciones/[slug]` e ícono `ArrowLeft`
- [ ] Nombre del producto en mayúsculas, tipografía grande
- [ ] Precio formateado (`$000.000`)
- [ ] Descripción corta (2-3 líneas)
- [ ] **Selector de color:**
  - Label dinámico: `COLOR: CHROME BLACK` (cambia al seleccionar)
  - Círculos de color, borde negro en el seleccionado
  - `useState` para color activo
- [ ] **Selector de talla:**
  - Label `TALLA:`
  - Botones cuadrados S · M · L · XL
  - Borde negro en talla seleccionada, gris con tachado si no disponible
  - `useState` para talla activa
- [ ] Link `GUÍA DE TALLAS` con ícono de regla (ícono `Ruler` de Phosphor)
- [ ] Botón `AGREGAR AL CARRITO +` — negro, full width
- [ ] Link `♡ AGREGAR A FAVORITOS` debajo del botón

Props:
```ts
type ProductoInfoProps = {
  nombre: string
  precio: number
  descripcion: string
  coleccion: { slug: string; nombre: string }
  colores: { nombre: string; hex: string }[]
  tallas: { valor: string; disponible: boolean }[]
}
```

---

### Fase 6.4 — Tabs laterales verticales

Componente: `ProductoTabs.tsx` — `"use client"`

- [ ] Posicionado en el borde derecho de la pantalla, texto vertical rotado 90°
- [ ] Tres ítems: `DETALLES` · `ENVÍOS` · `DEVOLUCIONES`
- [ ] Separador `+` al final
- [ ] Al hacer click en cada tab, hacer scroll suave a la sección correspondiente (`scrollIntoView`)
- [ ] Sticky mientras se hace scroll por la página

---

### Fase 6.5 — Accordion inferior izquierdo

Componente: `ProductoAccordion.tsx` — `"use client"`

- [ ] Cuatro ítems: `DESCRIPCIÓN` · `MATERIALES` · `CUIDADOS` · `COMPOSICIÓN`
- [ ] `DESCRIPCIÓN` abierto por defecto
- [ ] Toggle con ícono `Plus` / `Minus` de Phosphor a la derecha
- [ ] Animación de apertura con `motion.div` + `height: "auto"` de Framer Motion
- [ ] Separador línea gris entre cada ítem
- [ ] Solo uno abierto a la vez (accordion exclusivo)

Props:
```ts
type AccordionItem = {
  id: string
  titulo: string
  contenido: string
}
type ProductoAccordionProps = {
  items: AccordionItem[]
}
```

---

### Fase 6.6 — Detalles media (inferior derecho)

Componente: `ProductoDetallesMedia.tsx`

- [ ] Una imagen grande arriba (ratio 16:9 o 3:2)
- [ ] Cuatro imágenes pequeñas en fila debajo (ratio 1:1)
- [ ] Todas con `next/image`
- [ ] Server Component (sin interactividad)

---

### Fase 6.7 — Banner de colección

Componente: `ColeccionBanner.tsx`

- [ ] Mitad izquierda de la banda
- [ ] Nombre de la colección grande (ej. `URBAN FLOW`)
- [ ] Temporada debajo (ej. `SS24`)
- [ ] Imagen de la colección como fondo o a la derecha
- [ ] Link `VER COLECCIÓN →` con `ArrowRight` de Phosphor

---

### Fase 6.8 — Visto en

Componente: `VistoEn.tsx`

- [ ] Mitad derecha de la banda (junto a `ColeccionBanner`)
- [ ] Label `VISTO EN` arriba
- [ ] 3 imágenes editoriales/lifestyle en fila
- [ ] Server Component

---

### Fase 6.9 — Productos relacionados (carrusel)

Componente: `ProductosRelacionados.tsx` — `"use client"`

- [ ] Label `TAMBIÉN TE PUEDE GUSTAR`
- [ ] Flechas izquierda/derecha (`ArrowLeft`, `ArrowRight` de Phosphor) para navegar
- [ ] Muestra 4-5 `ProductoCard` en desktop, 2 en mobile
- [ ] Scroll horizontal con `overflow-x: hidden` + `motion.div` translateX
- [ ] Reutilizar `ProductoCard` de Phase 5

Props:
```ts
type ProductosRelacionadosProps = {
  productos: ProductoCard[]
}
```

---

### Fase 6.10 — Sticky bar bottom

Componente: `StickyBar.tsx` — `"use client"`

- [ ] Fija en la parte inferior: `fixed bottom-0 left-0 right-0 z-50`
- [ ] Aparece solo cuando el botón "AGREGAR AL CARRITO" principal sale del viewport (`IntersectionObserver`)
- [ ] Contenido: thumbnail pequeño · nombre · precio · dropdown de talla · botón `AGREGAR AL CARRITO +`
- [ ] Fondo blanco con borde top gris
- [ ] Sincronizar talla seleccionada con `ProductoInfo` (subir estado al `page.tsx` o usar context local)
- [ ] Animación de entrada: `translateY(100%)` → `translateY(0)` con Framer Motion

---

### Fase 6.11 — Animaciones generales

- [ ] Galería: fade-in de imagen principal al cambiar (`AnimatePresence` + `key={imagenActiva}`)
- [ ] Info: fade-in desde derecha al cargar la página
- [ ] Accordion: `motion.div` con `overflow: hidden` para altura animada
- [ ] Relacionados: `motion.div` con `drag="x"` o translateX controlado
- [ ] Sticky bar: `motion.div` con `y: 80` → `y: 0`

---

## Notas

- `ProductoInfo` y `StickyBar` comparten el estado de talla activa — elevar el estado a `page.tsx` o usar un `ProductoContext` local.
- El modal de galería fullscreen requiere `"use client"` y un `Portal` en `document.body`.
- La sticky bar usa `IntersectionObserver` dentro de `useEffect` — siempre dentro de un componente con `"use client"`.
- Reutilizar `ProductoCard` de Phase 5 sin modificaciones en el carrusel de relacionados.
- El tipo `ProductoDetalle` extiende la info de `Product` de fases anteriores — no duplicar propiedades, usar `extends` o `intersection types`.
