# Fase 4: Desarrollo de Secciones de la Página

Este documento detalla el plan de trabajo específico para la Fase 4, dividiendo el desarrollo de las secciones de la página en sub-fases manejables para facilitar el trabajo progresivo.

## 4.1. Sección Hero
- **Componente:** `Hero` (Client Component)
- **Tareas:**
  - Implementar contenedor principal con altura de pantalla completa (`h-screen`).
  - Añadir video de fondo (`public/videos/hero.mp4`) optimizado y configurado para autoplay.
  - Implementar capa superpuesta para mejorar legibilidad del texto (`bg-black/30`).
  - Desarrollar contenido de texto: eyebrow ("New season 2026"), titular principal ("Discover the summer collection") y subtexto.
  - Añadir botones de "Shop now" y "Watch film".
  - Integrar animaciones `Framer Motion` (fade-in desde abajo) para el texto.
  - Añadir el indicador de scroll en la parte inferior.

## 4.2. Sección NewsTicker
- **Componente:** `NewsTicker` (Client Component)
- **Tareas:**
  - Implementar una barra horizontal de noticias estilo marquesina (marquee).
  - Usar `Framer Motion` o animaciones CSS de Tailwind para el movimiento continuo.
  - Asegurar un scroll infinito suave.

## 4.3. Sección News
- **Componente:** `NewsSection` (Server Component)
- **Tareas:**
  - Implementar un layout de grid (ej. 3 columnas en desktop).
  - Crear el diseño de la tarjeta de noticia (imagen, fecha, titular, extracto).
  - Consumir datos desde `src/lib/data.ts`.
  - Aplicar animaciones de stagger (`Framer Motion`) al revelar las tarjetas.

## 4.4. Sección Collection
- **Componente:** `Collection` (Client Component)
- **Tareas:**
  - Implementar navegación por pestañas (tabs) para diferentes categorías.
  - Desarrollar un grid para mostrar los productos top sellers.
  - Diseñar la tarjeta de producto (imagen del producto, nombre, precio).
  - Añadir transiciones suaves al cambiar entre pestañas.

## 4.5. Sección FindMe
- **Componente:** `FindMe` (Server Component)
- **Tareas:**
  - Desarrollar layout dividido (información de contacto y mapa visual o enlaces).
  - Incluir redes sociales usando iconos Phosphor.
  - Opcional: Integración de mapa embebido o diseño representativo.

## 4.6. Footer
- **Componente:** `Footer` (Server Component)
- **Tareas:**
  - Implementar estructura de 4 columnas.
  - Columna 1: Branding y texto descriptivo.
  - Columna 2 y 3: Enlaces de navegación rápida (Shop, About, etc.).
  - Columna 4: Sección de Newsletter con input y botón.
  - Área inferior: Copyright y enlaces legales.
  - Asegurar el diseño responsive pasando de una sola columna en móvil a 4 en desktop.

## 4.7. Exportación
- **Archivo:** `src/components/sections/index.ts`
- **Tareas:**
  - Configurar re-exportaciones de todos los componentes creados en las sub-fases anteriores para simplificar importaciones en `page.tsx`.
