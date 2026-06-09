"use client"

import { ProductoDetalle, Product } from "@/types"
import { ProductoProvider } from "./ProductoContext"
import ProductoGaleria from "./ProductoGaleria"
import ProductoInfo from "./ProductoInfo"
import ProductoTabs from "./ProductoTabs"
import ProductoAccordion from "./ProductoAccordion"
import ProductoDetallesMedia from "./ProductoDetallesMedia"
import ColeccionBanner from "./ColeccionBanner"
import VistoEn from "./VistoEn"
import ProductosRelacionados from "./ProductosRelacionados"
import StickyBar from "./StickyBar"
import SelectionModal from "./SelectionModal"

type ProductoDetalleViewProps = {
  producto: ProductoDetalle
  relacionados: Product[]
}

export default function ProductoDetalleView({ producto, relacionados }: ProductoDetalleViewProps) {
  const accordionItems = [
    { id: "desc", titulo: "DESCRIPCIÓN", contenido: producto.descripcion },
    { id: "mat", titulo: "MATERIALES", contenido: producto.materiales },
    { id: "cuid", titulo: "CUIDADOS", contenido: producto.cuidados },
    { id: "comp", titulo: "COMPOSICIÓN", contenido: producto.composicion },
  ]

  return (
    <ProductoProvider>
      <div className="relative bg-white pb-20 md:pb-0">
        <ProductoTabs />

        {/* Sección Superior: Galería e Info */}
        <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-12 py-8 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="w-full lg:w-[55%]">
              <ProductoGaleria imagenes={producto.imagenesGaleria} nombre={producto.nombre} />
            </div>
            
            <div className="w-full lg:w-[45%] pt-4 lg:pt-0 sticky top-24 h-fit">
              <div id="info-section">
                <ProductoInfo producto={producto} />
                <div id="main-add-to-cart" className="h-1 invisible" /> {/* Elemento de referencia para el StickyBar */}
              </div>
            </div>
          </div>
        </div>

        {/* Sección Media: Acordeón e Imágenes Detalle */}
        <div id="seccion-detalles" className="w-full max-w-[1800px] mx-auto px-6 lg:px-12 py-8 lg:py-16 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="w-full lg:w-[45%] pr-0 lg:pr-8">
              <ProductoAccordion items={accordionItems} />
            </div>
            <div className="w-full lg:w-[55%]">
              <ProductoDetallesMedia imagenes={producto.imagenesDetalle} nombre={producto.nombre} />
            </div>
          </div>
        </div>

        {/* Bandas Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-y border-gray-200">
          <ColeccionBanner 
            slug={producto.coleccionDetalle.slug} 
            nombre={producto.coleccionDetalle.nombre} 
            temporada={producto.coleccionDetalle.temporada} 
          />
          <VistoEn imagenes={producto.imagenesVisto} />
        </div>

        {/* Productos Relacionados */}
        <ProductosRelacionados productos={relacionados} />

        {/* Sticky Bottom Bar */}
        <StickyBar 
          producto={producto}
          mainButtonId="main-add-to-cart"
        />

        {/* Custom Selection Modal */}
        <SelectionModal producto={producto} />
      </div>
    </ProductoProvider>
  )
}
