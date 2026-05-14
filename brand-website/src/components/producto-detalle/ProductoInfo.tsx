"use client"

import { useEffect } from "react"
import { useProductoContext } from "./ProductoContext"
import { Ruler, ArrowLeft } from "@phosphor-icons/react"
import Link from "next/link"

type ProductoInfoProps = {
  nombre: string
  precio: number
  descripcion: string
  coleccion: { slug: string; nombre: string; temporada: string }
  colores: { nombre: string; hex: string }[]
  tallas: { valor: string; disponible: boolean }[]
}

export default function ProductoInfo({
  nombre,
  precio,
  descripcion,
  coleccion,
  colores,
  tallas,
}: ProductoInfoProps) {
  const { tallaSeleccionada, setTallaSeleccionada, colorSeleccionado, setColorSeleccionado } = useProductoContext()

  useEffect(() => {
    // Set default color if not selected
    if (!colorSeleccionado && colores.length > 0) {
      setColorSeleccionado(colores[0].nombre)
    }
  }, [colorSeleccionado, colores, setColorSeleccionado])

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p)

  return (
    <div className="flex flex-col max-w-md w-full">
      <Link
        href={`/colecciones/${coleccion.slug}`}
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        COLECCIÓN: {coleccion.nombre}
      </Link>

      <h1 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight text-black mb-4">{nombre}</h1>
      <p className="text-xl font-medium text-black mb-6">{formatPrice(precio)}</p>

      <div 
        className="text-gray-600 text-sm mb-10 leading-relaxed line-clamp-3 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: descripcion }}
      />

      {/* Selector de Color */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-black mb-3">
          COLOR: <span className="text-gray-500">{colorSeleccionado}</span>
        </p>
        <div className="flex gap-3">
          {colores.map((color) => (
            <button
              key={color.nombre}
              onClick={() => setColorSeleccionado(color.nombre)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                colorSeleccionado === color.nombre ? "border-black p-0.5" : "border-transparent"
              }`}
            >
              <div
                className="w-full h-full rounded-full border border-black/10"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Selector de Talla */}
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-black mb-3">TALLA:</p>
        <div className="flex flex-wrap gap-3 mb-4">
          {tallas.map((talla) => (
            <button
              key={talla.valor}
              onClick={() => talla.disponible && setTallaSeleccionada(talla.valor)}
              disabled={!talla.disponible}
              className={`min-w-[48px] h-12 flex items-center justify-center px-4 border text-sm font-semibold uppercase transition-colors ${
                !talla.disponible
                  ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed line-through"
                  : tallaSeleccionada === talla.valor
                  ? "border-black bg-black text-white"
                  : "border-gray-300 text-black hover:border-black"
              }`}
            >
              {talla.valor}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
          <Ruler size={16} />
          GUÍA DE TALLAS
        </button>
      </div>

      {/* Acciones */}
      <div className="flex flex-col gap-4">
        <button className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors flex justify-between px-6">
          <span>AGREGAR AL CARRITO</span>
          <span>+</span>
        </button>
        <button className="text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-black transition-colors text-left flex items-center gap-2">
          ♡ AGREGAR A FAVORITOS
        </button>
      </div>
    </div>
  )
}
