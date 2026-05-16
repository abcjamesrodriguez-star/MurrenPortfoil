# MIGRATE — Colecciones Listado v1 → v2
> Instrucciones de migración del diseño original (grid 3 col + tabs) al nuevo diseño (hero con SVG + sidebar + grid asimétrico + panel derecho).
> Trabajar archivo por archivo. No romper rutas existentes.

---

## Resumen de cambios

| Elemento | v1 (actual) | v2 (nuevo) |
|---|---|---|
| Hero | Texto izq + imagen placeholder der | Texto izq + líneas SVG decorativas + colección actual der |
| Filtros | Tabs horizontales (TODAS, NUEVAS...) | Sidebar vertical izquierdo con conteos |
| Grid | 3 columnas uniformes | Asimétrico: fila 1 `[1fr_1fr_260px]` + fila 2 `[1fr_1fr_1fr]` |
| Cards | Imagen + nombre + temporada + flecha | Número + imagen + temporada + nombre + línea + `+` rotable |
| Panel derecho | No existe | Colección actual + destacada + Próximamente |
| Barra inferior | Botón "CARGAR MÁS" | `MOSTRANDO X DE Y` + `VER TODAS →` |

---

## Archivo 1 — `page.tsx`

**Qué cambiar:**
- Reemplazar `<ColeccionesHero />` — mismo nombre, nueva implementación
- Eliminar el wrapper que contenía `<ColeccionesTabs />` + `<ColeccionesGrid />`
- Agregar `<ColeccionesLayout />` que envuelve sidebar + grid + panel
- Agregar `<ColeccionesPaginacion />` al final

**Resultado:**
```tsx
// src/app/colecciones/page.tsx
import ColeccionesHero from "@/components/colecciones/ColeccionesHero"
import ColeccionesLayout from "@/components/colecciones/ColeccionesLayout"
import ColeccionesPaginacion from "@/components/colecciones/ColeccionesPaginacion"
import { getColecciones, getColeccionActual, getColeccionProxima } from "@/lib/colecciones"

export default async function ColeccionesPage() {
  const colecciones = await getColecciones()
  const actual = getColeccionActual(colecciones)
  const proxima = await getColeccionProxima()

  return (
    <main>
      <ColeccionesHero actual={actual} />
      <ColeccionesLayout colecciones={colecciones} />
      <ColeccionesPaginacion total={colecciones.length} />
    </main>
  )
}
```

---

## Archivo 2 — `ColeccionesHero.tsx`

**Qué cambiar:** reescribir completo — estructura y visual son diferentes.

**Eliminar:**
- La columna derecha con imagen placeholder
- Cualquier `<Image />` en el hero

**Agregar:**
- SVG de líneas decorativas absolutas
- Bloque "ACTUAL" en esquina inferior derecha

```tsx
"use client"
import { motion } from "framer-motion"
import { ArrowRight } from "@phosphor-icons/react"
import Link from "next/link"

// Las líneas son coordenadas SVG — ajustar visualmente según gusto
const lineas = [
  { d: "M 400 0 L 1340 180" },
  { d: "M 500 0 L 1340 320" },
  { d: "M 700 0 L 1340 80" },
  { d: "M 900 0 L 800 340" },
  { d: "M 1100 0 L 600 340" },
  { d: "M 1340 100 L 400 340" },
  { d: "M 1200 0 L 1340 260" },
]

export default function ColeccionesHero({ actual }: { actual: Collection }) {
  return (
    <section className="relative bg-neutral-50 px-8 pt-10 pb-0 overflow-hidden min-h-[340px]">

      {/* SVG líneas decorativas */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1340 340"
        preserveAspectRatio="xMidYMid slice"
      >
        {lineas.map((linea, i) => (
          <motion.path
            key={i}
            d={linea.d}
            stroke="#d4d4d4"
            strokeWidth="0.8"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: i * 0.12, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Contenido izquierdo */}
      <div className="relative z-10 max-w-[320px]">
        <p className="text-xs tracking-[0.2em] text-neutral-400 font-mono mb-3">
          // COLECCIONES
        </p>
        <h1 className="text-7xl font-black uppercase leading-none tracking-tight mb-4">
          COLECCIONES
        </h1>
        <p className="text-sm text-neutral-500 leading-relaxed mb-6">
          Cada colección es una historia.<br />
          Descubre los drops que definen<br />
          nuestra visión.
        </p>
        <Link
          href="/manifiesto"
          className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          VER MANIFIESTO <ArrowRight size={16} />
        </Link>
      </div>

      {/* Colección actual — esquina inferior derecha */}
      <div className="absolute bottom-0 right-6 pb-4 text-right min-w-[200px]">
        <div className="border-t border-neutral-300 pt-3">
          <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase mb-1">
            ACTUAL
          </p>
          <Link
            href={`/colecciones/${actual.slug}`}
            className="flex items-center justify-end gap-2 group"
          >
            <div>
              <p className="font-bold text-base uppercase">{actual.nombre}</p>
              <p className="text-xs text-neutral-400">{actual.temporada}</p>
            </div>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>

    </section>
  )
}
```

---

## Archivo 3 — `ColeccionesTabs.tsx` → ELIMINAR

Este archivo ya no se usa. Borrar o renombrar a `_ColeccionesTabs.tsx.bak` para no perder referencia.

La lógica de filtrado migra a `ColeccionesSidebar.tsx`.

---

## Archivo 4 — NUEVO `ColeccionesLayout.tsx`

Nuevo wrapper que organiza los tres paneles horizontales.

```tsx
// src/components/colecciones/ColeccionesLayout.tsx
"use client"
import { useState } from "react"
import ColeccionesSidebar from "./ColeccionesSidebar"
import ColeccionesGrid from "./ColeccionesGrid"
import ColeccionesPanelDer from "./ColeccionesPanelDer"
import { Collection, FiltroColecciones } from "@/types"

export default function ColeccionesLayout({ colecciones }: { colecciones: Collection[] }) {
  const [filtroActivo, setFiltroActivo] = useState<FiltroColecciones>("TODAS")

  const coleccionesFiltradas = colecciones.filter(c => {
    if (filtroActivo === "TODAS") return true
    if (filtroActivo === "NUEVAS") return c.tags.includes("NUEVA")
    if (filtroActivo === "DESTACADAS") return c.tags.includes("DESTACADA")
    return c.tags.includes(filtroActivo)
  })

  const conteos = {
    TODAS: colecciones.length,
    NUEVAS: colecciones.filter(c => c.tags.includes("NUEVA")).length,
    DESTACADAS: colecciones.filter(c => c.tags.includes("DESTACADA")).length,
    SS24: colecciones.filter(c => c.tags.includes("SS24")).length,
    FW23: colecciones.filter(c => c.tags.includes("FW23")).length,
  }

  return (
    <div className="grid grid-cols-[120px_1fr_280px] border-t border-neutral-200">
      <ColeccionesSidebar
        filtroActivo={filtroActivo}
        conteos={conteos}
        onFiltroChange={setFiltroActivo}
      />
      <ColeccionesGrid colecciones={coleccionesFiltradas} />
      <ColeccionesPanelDer colecciones={colecciones} />
    </div>
  )
}
```

---

## Archivo 5 — `ColeccionesGrid.tsx`

**Qué cambiar:** reemplazar el grid uniforme por el layout asimétrico de dos filas.

**Eliminar:**
- `grid-cols-1 md:grid-cols-3` uniforme
- Cualquier `gap-*` entre cards

**Agregar:**
- Fila 1 con `grid-cols-[1fr_1fr_260px]`
- Fila 2 con `grid-cols-3`
- `AnimatePresence` para transición al cambiar filtro

```tsx
"use client"
import { AnimatePresence, motion } from "framer-motion"
import ColeccionCard from "./ColeccionCard"
import { Collection } from "@/types"

export default function ColeccionesGrid({ colecciones }: { colecciones: Collection[] }) {
  const fila1 = colecciones.slice(0, 3)
  const fila2 = colecciones.slice(3, 6)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={colecciones.map(c => c.id).join("-")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Fila 1 — asimétrica */}
        <div className="grid grid-cols-[1fr_1fr_260px] border-b border-neutral-200 divide-x divide-neutral-200">
          {fila1.map((c, i) => (
            <ColeccionCard key={c.id} coleccion={c} altaFila={true} />
          ))}
        </div>

        {/* Fila 2 — simétrica */}
        {fila2.length > 0 && (
          <div className="grid grid-cols-3 divide-x divide-neutral-200">
            {fila2.map((c) => (
              <ColeccionCard key={c.id} coleccion={c} altaFila={false} />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
```

---

## Archivo 6 — `ColeccionCard.tsx`

**Qué cambiar:** rediseño completo del interior de la card.

**Eliminar:**
- Flecha `ArrowRight` visible siempre o solo al hover
- Estructura anterior de imagen + texto simple

**Agregar:**
- Número `01` arriba izquierda
- Ícono `Plus` arriba derecha que rota 45° al hover
- Línea decorativa `w-8 h-px` debajo del nombre
- Prop `altaFila` para controlar altura (`h-[420px]` vs `h-[320px]`)

```tsx
"use client"
import { motion } from "framer-motion"
import { Plus } from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"
import { Collection } from "@/types"

export default function ColeccionCard({
  coleccion,
  altaFila,
}: {
  coleccion: Collection
  altaFila: boolean
}) {
  return (
    <Link
      href={`/colecciones/${coleccion.slug}`}
      className={`group relative flex flex-col border-b border-neutral-200 overflow-hidden
        ${altaFila ? "h-[420px]" : "h-[320px]"}`}
    >
      {/* Top bar: número + ícono + */}
      <div className="flex justify-between items-start p-3 z-10">
        <span className="text-xs text-neutral-400 font-mono">
          {String(coleccion.numero).padStart(2, "0")}
        </span>
        <motion.div whileHover={{ rotate: 45 }} transition={{ duration: 0.2 }}>
          <Plus size={16} className="text-neutral-400" />
        </motion.div>
      </div>

      {/* Imagen */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={coleccion.imagen}
          alt={coleccion.nombre}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      {/* Footer: temporada + nombre + línea */}
      <div className="p-3 bg-white">
        <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1">
          {coleccion.temporada}
        </p>
        <p className="font-bold text-lg uppercase leading-tight">
          {coleccion.nombre}
        </p>
        <div className="w-8 h-px bg-neutral-900 mt-2" />
      </div>
    </Link>
  )
}
```

---

## Archivo 7 — NUEVO `ColeccionesSidebar.tsx`

Reemplaza `ColeccionesTabs.tsx` con un sidebar vertical.

```tsx
"use client"
import { useState } from "react"
import { Plus } from "@phosphor-icons/react"
import { FiltroColecciones } from "@/types"

const FILTROS: FiltroColecciones[] = ["TODAS", "NUEVAS", "DESTACADAS", "SS24", "FW23"]

export default function ColeccionesSidebar({
  filtroActivo,
  conteos,
  onFiltroChange,
}: {
  filtroActivo: FiltroColecciones
  conteos: Record<FiltroColecciones, number>
  onFiltroChange: (f: FiltroColecciones) => void
}) {
  const [ordenAbierto, setOrdenAbierto] = useState(false)

  return (
    <div className="border-r border-neutral-200 p-4 flex flex-col gap-1">
      <p className="text-[10px] tracking-[0.2em] text-neutral-400 font-mono mb-3">
        // FILTRAR
      </p>

      {FILTROS.map((f) => (
        <button
          key={f}
          onClick={() => onFiltroChange(f)}
          className="flex justify-between items-center w-full text-left py-1"
        >
          <span
            className={`text-xs uppercase tracking-wide transition-colors
              ${filtroActivo === f
                ? "text-neutral-900 font-medium"
                : "text-neutral-400 hover:text-neutral-600"
              }`}
          >
            {f}
          </span>
          <span className="text-[10px] text-neutral-400 font-mono">
            ({String(conteos[f]).padStart(2, "0")})
          </span>
        </button>
      ))}

      {/* Ordenar por */}
      <div className="border-t border-neutral-200 mt-4 pt-4">
        <button
          onClick={() => setOrdenAbierto(!ordenAbierto)}
          className="flex justify-between items-center w-full"
        >
          <span className="text-xs uppercase tracking-wide text-neutral-600">
            ORDENAR POR
          </span>
          <Plus size={14} className="text-neutral-400" />
        </button>
        {ordenAbierto && (
          <div className="mt-2 flex flex-col gap-1">
            {["MÁS NUEVA", "MÁS ANTIGUA", "A–Z"].map((o) => (
              <button
                key={o}
                className="text-[11px] text-neutral-500 hover:text-neutral-900 text-left py-0.5 transition-colors"
              >
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

---

## Archivo 8 — NUEVO `ColeccionesPanelDer.tsx`

Panel derecho completamente nuevo — no existe en v1.

```tsx
// src/components/colecciones/ColeccionesPanelDer.tsx
import { ArrowRight, Plus } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { Collection } from "@/types"

export default function ColeccionesPanelDer({
  colecciones,
}: {
  colecciones: Collection[]
}) {
  const actual = colecciones.find((c) => c.estaActual)
  const destacada = colecciones.find((c) => c.tags.includes("DESTACADA") && !c.estaActual)

  return (
    <div className="border-l border-neutral-200 flex flex-col divide-y divide-neutral-200">

      {/* Bloque 1 — Colección actual */}
      {actual && (
        <div className="p-5">
          <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase mb-2">
            ACTUAL
          </p>
          <Link
            href={`/colecciones/${actual.slug}`}
            className="flex items-start justify-between group"
          >
            <div>
              <p className="font-bold text-base uppercase leading-tight">
                {actual.nombre}
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">{actual.temporada}</p>
            </div>
            <ArrowRight
              size={16}
              className="mt-1 group-hover:translate-x-1 transition-transform text-neutral-400"
            />
          </Link>
        </div>
      )}

      {/* Bloque 2 — Colección destacada */}
      {destacada && (
        <div className="p-5">
          <p className="text-[10px] text-neutral-400 uppercase mb-1">
            {destacada.temporada}
          </p>
          <div className="flex items-start justify-between">
            <Link
              href={`/colecciones/${destacada.slug}`}
              className="font-bold text-base uppercase leading-tight hover:opacity-60 transition-opacity"
            >
              {destacada.nombre}
            </Link>
            <Plus size={14} className="text-neutral-400 mt-1" />
          </div>
          <div className="w-6 h-px bg-neutral-300 mt-2" />
        </div>
      )}

      {/* Bloque 3 — Próximamente */}
      <div className="p-5 flex-1 flex flex-col justify-center">
        <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase mb-2">
          PRÓXIMAMENTE
        </p>
        <p className="font-black text-2xl uppercase leading-tight mb-3">
          SUMMER 2025
        </p>
        <p className="text-xs text-neutral-500 leading-relaxed mb-4">
          Mantente al tanto de lo que viene.<br />
          Algo diferente está por llegar.
        </p>
        <Link
          href="#notificar"
          className="inline-flex items-center gap-2 border border-neutral-900 text-xs px-4 py-2 hover:bg-neutral-900 hover:text-white transition-colors self-start"
        >
          NOTIFICARME <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  )
}
```

---

## Archivo 9 — `CargarMasBtn.tsx` → REEMPLAZAR por `ColeccionesPaginacion.tsx`

`CargarMasBtn` ya no aplica en este diseño. Reemplazar con:

```tsx
// src/components/colecciones/ColeccionesPaginacion.tsx
"use client"
import { ArrowRight } from "@phosphor-icons/react"

export default function ColeccionesPaginacion({
  total,
  visibles = 6,
  filtroActivo,
  onVerTodas,
}: {
  total: number
  visibles?: number
  filtroActivo: string
  onVerTodas: () => void
}) {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-t border-neutral-200">
      <span className="text-xs text-neutral-400 tracking-wide uppercase">
        MOSTRANDO 1 – {Math.min(visibles, total)} DE {total} COLECCIONES
      </span>
      {filtroActivo !== "TODAS" && (
        <button
          onClick={onVerTodas}
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide hover:opacity-60 transition-opacity"
        >
          VER TODAS <ArrowRight size={14} />
        </button>
      )}
    </div>
  )
}
```

---

## Archivo 10 — `src/lib/colecciones.ts`

**Qué agregar** al tipo y datos existentes:

```ts
// Agregar al tipo Collection
numero: number          // 01, 02, 03...
tags: Array<"NUEVA" | "DESTACADA" | "SS24" | "FW23">   // era tag singular
estaActual?: boolean

// Agregar función
export function getColeccionActual(colecciones: Collection[]) {
  return colecciones.find(c => c.estaActual) ?? colecciones[0]
}

export async function getColeccionProxima(): Promise<ColeccionProxima> {
  return {
    nombre: "SUMMER 2025",
    descripcion: "Mantente al tanto de lo que viene. Algo diferente está por llegar.",
    linkNotificar: "#notificar",
  }
}
```

**Actualizar los mocks** para agregar `numero` y convertir `tag` → `tags` (array):
```ts
{ id: "1", numero: 1, slug: "murren",    nombre: "MURREN",    temporada: "SS24",  tags: ["SS24", "DESTACADA"], estaActual: true,  imagen: "..." },
{ id: "2", numero: 2, slug: "nebula-drop",   nombre: "NEBULA DROP",   temporada: "SS24",  tags: ["SS24", "NUEVA"],                        imagen: "..." },
{ id: "3", numero: 3, slug: "chrome-series", nombre: "CHROME SERIES", temporada: "FW23",  tags: ["FW23", "DESTACADA"],                    imagen: "..." },
{ id: "4", numero: 4, slug: "denim-core",    nombre: "DENIM CORE",    temporada: "SS24",  tags: ["SS24"],                                 imagen: "..." },
{ id: "5", numero: 5, slug: "midnight-club", nombre: "MIDNIGHT CLUB", temporada: "FW23",  tags: ["FW23", "NUEVA"],                        imagen: "..." },
{ id: "6", numero: 6, slug: "essentials",    nombre: "ESSENTIALS",    temporada: "BASIC", tags: [],                                      imagen: "..." },
```

---

## Orden de ejecución recomendado

```
1. src/lib/colecciones.ts        → agregar campos al tipo y actualizar mocks
2. src/types/index.ts            → actualizar tipo Collection (tag → tags, agregar numero)
3. page.tsx                      → nueva estructura de imports y layout
4. ColeccionesHero.tsx           → reescribir completo
5. ColeccionesLayout.tsx         → CREAR NUEVO
6. ColeccionesSidebar.tsx        → CREAR NUEVO (reemplaza Tabs)
7. ColeccionesGrid.tsx           → modificar grid asimétrico
8. ColeccionCard.tsx             → rediseño completo
9. ColeccionesPanelDer.tsx       → CREAR NUEVO
10. ColeccionesPaginacion.tsx    → CREAR NUEVO (reemplaza CargarMas)
11. Eliminar ColeccionesTabs.tsx
```

---

## Notas

- Empezar por `lib/colecciones.ts` y `types/index.ts` — todo lo demás depende de que los tipos estén correctos.
- El cambio de `tag` (string) a `tags` (array) puede romper otros componentes que usen `Collection` — buscar con `cmd+shift+F` todos los usos de `coleccion.tag` y actualizar a `coleccion.tags`.
- `ColeccionesLayout` maneja el estado de filtro para que sidebar y grid estén sincronizados sin context.
- Las cards **no tienen gap** — usan `divide-x divide-neutral-200` en el grid y `border-b` en la card para que los bordes sean la separación visual.
- Si la card 03 (columna delgada) se ve muy comprimida, bajar el valor fijo de `260px` a `200px` o `220px`.
