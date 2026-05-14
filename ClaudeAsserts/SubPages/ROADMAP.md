# ROADMAP — Brand Website
> Orden de desarrollo por fases. Cada fase tiene su propio MD de instrucciones.

---

## Archivos de referencia

| Fase | Archivo | Ruta |
|------|---------|------|
| Setup | `CLAUDE.md` | Raíz del proyecto |
| Phase 1 | `PHASE-1-colecciones-listado.md` | `/colecciones` |
| Phase 2 | `PHASE-2-coleccion-detalle.md` | `/colecciones/[slug]` |
| Phase 3 | `PHASE-3-categorias-listado.md` | `/categorias` |
| Phase 4 | `PHASE-4-categoria-detalle.md` | `/categorias/[slug]` |
| Phase 5 | `PHASE-5-componentes-reutilizables.md` | `src/components/ui/` |

---

## Orden de ejecución

```
CLAUDE.md           → Levantar el proyecto base
      ↓
Phase 5             → Construir todos los componentes reutilizables PRIMERO
      ↓
Phase 1             → /colecciones (usa ColeccionCard, CargarMasBtn)
      ↓
Phase 2             → /colecciones/[slug] (usa ProductoCard, FiltroBar, OrdenarPor)
      ↓
Phase 3             → /categorias (usa CategoriaCard)
      ↓
Phase 4             → /categorias/[slug] (reutiliza todo lo de Phase 2)
```

> **Importante:** Phase 5 va primero aunque esté numerada al final del wireframe.
> Los componentes deben existir antes de usarse en las páginas.

---

## Dependencias entre fases

```
Phase 5 ──→ Phase 1 (ColeccionCard, CargarMasBtn)
Phase 5 ──→ Phase 2 (ProductoCard, FiltroBar, OrdenarPor, CargarMasBtn)
Phase 5 ──→ Phase 3 (CategoriaCard)
Phase 5 ──→ Phase 4 (ProductoCard, FiltroBar, OrdenarPor, CargarMasBtn)
Phase 2 ──→ Phase 4 (mismos datos mock de productos con campo `categoria`)
```

---

## Rutas del sitio

```
/
├── colecciones/
│   ├── page.tsx                  ← Phase 1
│   └── [slug]/
│       └── page.tsx              ← Phase 2
└── categorias/
    ├── page.tsx                  ← Phase 3
    └── [slug]/
        └── page.tsx              ← Phase 4
```

---

## Checklist de entrega por fase

### Phase 5 ✓ cuando:
- [ ] Los 6 componentes existen en `src/components/ui/`
- [ ] Todos tienen props tipadas en TypeScript
- [ ] `index.ts` exporta todos

### Phase 1 ✓ cuando:
- [ ] `/colecciones` renderiza 6 colecciones en grid de 3
- [ ] Los tabs filtran correctamente
- [ ] "Cargar más" funciona
- [ ] Animaciones de entrada activas

### Phase 2 ✓ cuando:
- [ ] `/colecciones/[slug]` carga por slug
- [ ] Hero con imagen y texto de la colección
- [ ] Filtros funcionales (aunque solo en UI, sin backend)
- [ ] Grid de productos con favorito toggle
- [ ] `generateStaticParams` y `generateMetadata` implementados

### Phase 3 ✓ cuando:
- [ ] `/categorias` muestra las 10 categorías en grid de 5
- [ ] Cada card linkea a `/categorias/[slug]`
- [ ] Animaciones de entrada activas

### Phase 4 ✓ cuando:
- [ ] `/categorias/[slug]` carga por slug
- [ ] Header con nombre de la categoría
- [ ] Filtros (TALLA, COLOR, PRECIO) funcionales en UI
- [ ] Grid de productos reutilizando `ProductoCard`
- [ ] `generateStaticParams` y `generateMetadata` implementados
