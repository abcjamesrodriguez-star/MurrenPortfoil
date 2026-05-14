# CLAUDE.md — Brand Website

## Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19
- **Estilos:** Tailwind CSS v4
- **Animaciones:** Framer Motion
- **Iconos:** Phosphor Icons (`@phosphor-icons/react`)
- **Lenguaje:** TypeScript (strict)

---

## Levantamiento del proyecto desde cero

### 1. Crear el proyecto

```bash
npx create-next-app@latest brand-website \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd brand-website
```

### 2. Instalar dependencias

```bash
npm install framer-motion @phosphor-icons/react
```

### 3. Verificar versiones instaladas

```bash
node -v        # requiere Node 18.17+
npm -v
npx next --version
```

### 4. Levantar en desarrollo

```bash
npm run dev
```

Abre `http://localhost:3000`

### 5. Build de producción

```bash
npm run build
npm run start
```

---

## Estructura de carpetas

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fuentes, metadata global
│   ├── page.tsx            # Home — ensambla todas las secciones
│   └── globals.css         # Tailwind base + variables CSS custom
│
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   │
│   └── sections/
│       ├── NewsTicker.tsx
│       ├── Hero.tsx
│       ├── NewsSection.tsx
│       ├── Collection.tsx
│       ├── FindMe.tsx
│       └── index.ts        # re-exports de todas las secciones
│
├── lib/
│   └── data.ts             # datos mock: productos, noticias, redes sociales
│
└── types/
    └── index.ts            # tipos compartidos (Product, NewsItem, etc.)
```

---

## Configuración de archivos clave

### `src/app/layout.tsx`
- Importar fuente desde `next/font/google` (ej. Inter o Geist)
- Aplicar clase de fuente en `<html>`
- Definir `metadata` con title y description del sitio

### `src/app/globals.css`
```css
@import "tailwindcss";

:root {
  --color-brand: #your-color;
}
```

### `next.config.ts`
Habilitar dominios para imágenes externas si las hay:
```ts
const nextConfig = {
  images: {
    domains: ['your-cdn.com'],
  },
}
export default nextConfig
```

---

## Convenciones del proyecto

### Componentes
- Todos los componentes son **Server Components** por defecto
- Usar `"use client"` solo cuando se necesite: animaciones Framer Motion, hooks de estado/efecto, interactividad del browser
- Nombrar archivos en **PascalCase**: `Hero.tsx`, `Navbar.tsx`

### Tailwind
- Usar clases utilitarias directamente en JSX
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Responsive siempre mobile-first

### Framer Motion
- Wrappear con `"use client"` el componente que lo use
- Preferir `motion.div` con `initial`, `animate`, `transition`
- Para animaciones al hacer scroll usar `whileInView` + `viewport={{ once: true }}`

### Phosphor Icons
```tsx
"use client"
import { ShoppingBag, MagnifyingGlass, Heart } from "@phosphor-icons/react"

<ShoppingBag size={20} weight="regular" />
```
Pesos disponibles: `regular` · `bold` · `light` · `fill` · `duotone` · `thin`

### TypeScript
- Activar `strict: true` en `tsconfig.json` (viene por defecto con create-next-app)
- Definir tipos en `src/types/index.ts` y exportarlos
- No usar `any` — preferir `unknown` si el tipo es incierto

---

## Secciones de la página (orden)

| # | Componente | Tipo | Notas |
|---|-----------|------|-------|
| 1 | `AnnouncementBar` | Server | Franja top, promo + idioma/moneda |
| 2 | `Navbar` | Client | Sticky, links activos, íconos Phosphor |
| 3 | `Hero` | Client | Video de fondo fullwidth, títulos izquierda, Framer Motion fade-in |
| 4 | `NewsTicker` | Client | Barra de noticias animada (marquee o motion) |
| 5 | `NewsSection` | Server | Grid de 3 cards de noticias |
| 6 | `Collection` | Client | Tabs de categoría + grid top sellers |
| 7 | `FindMe` | Server | Redes sociales / mapa / contacto |
| 8 | `Footer` | Server | 4 columnas + newsletter + copyright |

---

## Hero — Video background

```tsx
"use client"

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        src="/videos/hero.mp4"
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenido anclado a la izquierda */}
      <div className="relative z-10 flex items-center h-full px-12 md:px-20 lg:px-28">
        <div className="max-w-lg">
          {/* eyebrow */}
          <p className="text-white/60 text-xs tracking-widest uppercase mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-white/50" />
            New season 2026
          </p>

          {/* headline */}
          <h1 className="text-4xl md:text-5xl font-medium text-white leading-tight mb-4">
            Discover the<br />summer collection
          </h1>

          {/* subline */}
          <p className="text-white/65 text-sm leading-relaxed mb-8 max-w-sm">
            Curated pieces designed to move with you.
            Minimal, intentional, lasting.
          </p>

          {/* CTAs */}
          <div className="flex gap-3">
            <button className="bg-white text-black text-sm font-medium px-6 py-3 rounded-lg hover:bg-white/90 transition">
              Shop now
            </button>
            <button className="border border-white/40 text-white text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition flex items-center gap-2">
              ▶ Watch film
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-12 md:left-20 flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase">
        <span>↓</span> scroll
      </div>
    </section>
  )
}
```

Coloca el video en `public/videos/hero.mp4`.

---

## Framer Motion — animaciones recomendadas

### Fade-in desde abajo (hero text)
```tsx
import { motion } from "framer-motion"

<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
>
  {/* contenido */}
</motion.div>
```

### Stagger en listas de cards
```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.5 } }
}

<motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
  {items.map(i => (
    <motion.li key={i.id} variants={item}>{/* card */}</motion.li>
  ))}
</motion.ul>
```

### Navbar scroll effect
```tsx
const [scrolled, setScrolled] = useState(false)
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 20)
  window.addEventListener("scroll", onScroll)
  return () => window.removeEventListener("scroll", onScroll)
}, [])

<motion.nav
  animate={{ backgroundColor: scrolled ? "rgba(0,0,0,0.9)" : "transparent" }}
  transition={{ duration: 0.3 }}
>
```

---

## Scripts disponibles

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo en localhost:3000 |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción (requiere build previo) |
| `npm run lint` | ESLint en todo el proyecto |

---

## Checklist antes de pasar a producción

- [ ] Video hero optimizado (H.264, máx 5MB, resolución 1920x1080)
- [ ] Imágenes usando `next/image` con `width`, `height` y `alt`
- [ ] `metadata` definido en `layout.tsx` (title, description, og:image)
- [ ] Variables de entorno en `.env.local` (nunca en el repo)
- [ ] `npm run build` sin errores TypeScript ni ESLint
- [ ] Responsive revisado en mobile (375px), tablet (768px) y desktop (1280px)
- [ ] `prefers-reduced-motion` respetado en animaciones Framer Motion

---

## Apéndice: Plan de Implementación

### Fase 1: Configuración Inicial del Proyecto
- Inicializar el proyecto con Next.js 15 (App Router), TypeScript, Tailwind CSS v4.
- Instalar dependencias adicionales: `framer-motion` y `@phosphor-icons/react`.
- Configurar `src/app/globals.css` con Tailwind y variables base.
- Configurar `next.config.ts` para dominios de imágenes si es necesario.
- Configurar la fuente principal en `src/app/layout.tsx`.

### Fase 2: Estructura de Directorios y Tipos
- Crear la estructura de carpetas sugerida (`components/layout`, `components/sections`, `lib`, `types`).
- Definir tipos compartidos en `src/types/index.ts`.
- Configurar datos simulados (mock data) en `src/lib/data.ts`.

### Fase 3: Componentes de Diseño Global (Layout)
- Crear el componente `AnnouncementBar` (Server Component).
- Crear el componente `Navbar` (Client Component, interactivo con scroll).
- Integrar estos componentes globales en `src/app/layout.tsx`.

### Fase 4: Desarrollo de Secciones de la Página
> **Nota:** Ver [FASE4_SECCIONES.md](./FASE4_SECCIONES.md) para el desglose detallado de esta fase.
- Construir el `Hero` (Client Component) con video de fondo y animaciones de entrada (Framer Motion).
- Construir `NewsTicker` (Client Component) para noticias en marquesina.
- Construir `NewsSection` (Server Component) con el grid de tarjetas de noticias.
- Construir `Collection` (Client Component) con pestañas y grid de productos.
- Construir `FindMe` (Server Component) con redes, mapa y contacto.
- Construir el `Footer` (Server Component) con 4 columnas y newsletter.
- Exportar todas las secciones mediante un archivo `index.ts`.

### Fase 5: Ensamblaje y Pulido Final
- Unir todas las secciones en `src/app/page.tsx` respetando el orden establecido.
- Revisión de animaciones `Framer Motion` (stagger en listas, fade-ins).
- Verificación del checklist de producción.
