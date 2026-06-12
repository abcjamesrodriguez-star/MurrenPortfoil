"use client"

import { useEffect } from "react"
import { useProductoContext } from "./ProductoContext"
import { Ruler, ArrowLeft } from "@phosphor-icons/react"
import Link from "next/link"
import { ProductoDetalle } from "@/types"
import { useCart } from "@/components/cart/CartContext"

type ProductoInfoProps = {
  producto: ProductoDetalle
}

export default function ProductoInfo({ producto }: ProductoInfoProps) {
  const { nombre, precio, descripcion, coleccionDetalle: coleccion, coloresDetalle: colores, tallasDetalle: tallas } = producto
  const { tallaSeleccionada, setTallaSeleccionada, colorSeleccionado, setColorSeleccionado, setIsModalOpen } = useProductoContext()
  const { addToCart } = useCart()

  useEffect(() => {
    // Set default color if not selected
    if (!colorSeleccionado && colores.length > 0) {
      setColorSeleccionado(colores[0].nombre)
    }
  }, [colorSeleccionado, colores, setColorSeleccionado])

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p)

  const handleAddToCart = () => {
    if (tallas.length > 0 && tallas.some(t => t.valor !== 'Única') && !tallaSeleccionada) {
      setIsModalOpen(true)
      return
    }

    // Buscar variante coincidente
    const variant = producto.variantes?.find((v) => {
      const matchTalla = !tallaSeleccionada || v.talla === tallaSeleccionada;
      const matchColor = !colorSeleccionado || v.color === colorSeleccionado;
      return matchTalla && matchColor;
    }) || producto.variantes?.[0];

    const variantId = variant?.id || producto.id;

    addToCart({
      id: `${producto.slug}-${colorSeleccionado || 'unico'}-${tallaSeleccionada || 'unica'}`,
      variantId: variantId,
      productSlug: producto.slug,
      productName: producto.nombre,
      productImage: producto.imagen,
      selectedColor: colorSeleccionado || 'Único',
      selectedSize: tallaSeleccionada || 'Única',
      price: producto.precio,
      collectionName: coleccion.nombre,
      category: producto.categoria,
    }, 1);
  }

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
                  ? "border-[#4699a1] bg-[#4699a1] text-black font-extrabold"
                  : "border-gray-300 text-black hover:border-black"
              }`}
            >
              {talla.valor}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            document.getElementById('seccion-detalles')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
        >
          <Ruler size={16} />
          GUÍA DE TALLAS
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <button
          id="main-add-to-cart-btn"
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors flex justify-between px-6"
        >
          <span>AGREGAR AL CARRITO</span>
          <span>+</span>
        </button>
      </div>

      {/* Bloque Legal — Políticas Visibles */}
      <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col gap-3">
        {/* Envío gratis */}
        <div className="flex items-start gap-2.5">
          <span className="text-black font-mono text-[10px] mt-0.5 shrink-0">//</span>
          <p className="text-[11px] leading-snug text-neutral-500">
            <span className="font-bold text-black uppercase tracking-wide">Envío gratis</span>
            {" "}en compras superiores a $200.000 COP · Despacho en 1–2 días hábiles.{" "}
            <a href="/envios" className="underline underline-offset-2 hover:text-black transition-colors font-semibold">
              Ver política de envíos →
            </a>
          </p>
        </div>

        {/* Cambios y devoluciones */}
        <div className="flex items-start gap-2.5">
          <span className="text-black font-mono text-[10px] mt-0.5 shrink-0">//</span>
          <p className="text-[11px] leading-snug text-neutral-500">
            <span className="font-bold text-black uppercase tracking-wide">Cambios y devoluciones</span>
            {" "}hasta 10 días hábiles desde la entrega (Ley 1480 de 2011).{" "}
            <a href="/cambios" className="underline underline-offset-2 hover:text-black transition-colors font-semibold">
              Ver política →
            </a>
          </p>
        </div>

        {/* Pago seguro */}
        <div className="flex items-start gap-2.5">
          <span className="text-black font-mono text-[10px] mt-0.5 shrink-0">//</span>
          <p className="text-[11px] leading-snug text-neutral-500">
            <span className="font-bold text-black uppercase tracking-wide">Pago seguro</span>
            {" "}procesado por Shopify. No almacenamos datos de tarjetas.{" "}
            <a href="/privacidad" className="underline underline-offset-2 hover:text-black transition-colors font-semibold">
              Política de privacidad →
            </a>
          </p>
        </div>

        {/* Garantía */}
        <div className="flex items-start gap-2.5">
          <span className="text-black font-mono text-[10px] mt-0.5 shrink-0">//</span>
          <p className="text-[11px] leading-snug text-neutral-500">
            <span className="font-bold text-black uppercase tracking-wide">Garantía de fábrica</span>
            {" "}en defectos de manufactura. Escríbenos a{" "}
            <a href="mailto:murrenbygeral@gmail.com" className="underline underline-offset-2 hover:text-black transition-colors font-semibold">
              murrenbygeral@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
