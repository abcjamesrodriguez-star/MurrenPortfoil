"use client"

import { useProductoContext } from "./ProductoContext"
import { useCart } from "@/components/cart/CartContext"
import { ProductoDetalle } from "@/types"
import { motion, AnimatePresence } from "framer-motion"
import { X, WarningCircle } from "@phosphor-icons/react"
import Image from "next/image"

type SelectionModalProps = {
  producto: ProductoDetalle
}

export default function SelectionModal({ producto }: SelectionModalProps) {
  const { nombre, precio, imagen, coloresDetalle: colores, tallasDetalle: tallas, coleccionDetalle: coleccion } = producto
  const { 
    tallaSeleccionada, 
    setTallaSeleccionada, 
    colorSeleccionado, 
    setColorSeleccionado,
    isModalOpen,
    setIsModalOpen
  } = useProductoContext()
  const { addToCart } = useCart()

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p)

  const handleConfirmAndAdd = () => {
    if (tallas.length > 0 && tallas.some(t => t.valor !== 'Única') && !tallaSeleccionada) {
      return // Safe guard
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
      collectionName: coleccion?.nombre,
      category: producto.categoria,
    }, 1);

    // Cerrar modal
    setIsModalOpen(false)
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black z-[100] cursor-pointer backdrop-blur-[2px]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white border-[3px] border-black text-black w-full max-w-md p-6 relative flex flex-col gap-6 shadow-[8px_8px_0px_#000] pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-black hover:border-black p-1 border border-transparent transition-colors duration-200"
                title="Cerrar modal"
              >
                <X size={18} />
              </button>

              {/* Title Section */}
              <div className="flex items-center gap-2.5 border-b-2 border-black pb-3">
                <WarningCircle size={22} className="text-[#4699a1] shrink-0" weight="fill" />
                <h2 className="text-xs font-mono font-black uppercase tracking-[0.15em] text-black">
                  [ SELECCIÓN COMPLEMENTARIA ]
                </h2>
              </div>

              {/* Product Preview */}
              <div className="flex gap-4 p-3 bg-neutral-50 border border-neutral-200">
                <div className="relative w-16 h-20 bg-neutral-100 border border-neutral-200 shrink-0 overflow-hidden">
                  <Image src={imagen} alt={nombre} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-black line-clamp-2">
                    {nombre}
                  </h3>
                  <span className="font-mono text-xs font-bold text-neutral-600 mt-1">
                    {formatPrice(precio)}
                  </span>
                </div>
              </div>

              {/* Color Selector */}
              {colores.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono font-black uppercase tracking-wider text-neutral-500 mb-2">
                    ■ COLOR: <span className="text-black font-extrabold">{colorSeleccionado || 'NINGUNO'}</span>
                  </p>
                  <div className="flex gap-2">
                    {colores.map((color) => (
                      <button
                        key={color.nombre}
                        onClick={() => setColorSeleccionado(color.nombre)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
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
              )}

              {/* Size Selector */}
              {tallas.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono font-black uppercase tracking-wider text-neutral-500 mb-2">
                    ■ SELECCIONA TU TALLA:
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {tallas.map((talla) => (
                      <button
                        key={talla.valor}
                        onClick={() => talla.disponible && setTallaSeleccionada(talla.valor)}
                        disabled={!talla.disponible}
                        className={`h-11 flex items-center justify-center border font-mono text-xs font-bold uppercase transition-all ${
                          !talla.disponible
                            ? "border-neutral-200 text-neutral-300 bg-neutral-50 cursor-not-allowed line-through"
                            : tallaSeleccionada === talla.valor
                            ? "border-[#4699a1] bg-[#4699a1] text-black font-extrabold"
                            : "border-neutral-300 text-black hover:border-black bg-white"
                        }`}
                      >
                        {talla.valor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirm CTA */}
              <button
                onClick={handleConfirmAndAdd}
                disabled={tallas.length > 0 && tallas.some(t => t.valor !== 'Única') && !tallaSeleccionada}
                className={`w-full py-4 text-xs font-mono font-black uppercase tracking-[0.2em] border transition-colors duration-300 
                  ${tallas.length > 0 && tallas.some(t => t.valor !== 'Única') && !tallaSeleccionada
                    ? "bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed"
                    : "bg-[#4699a1] text-black border-[#4699a1] hover:bg-white hover:text-black hover:border-black"
                  }`}
              >
                {tallas.length > 0 && tallas.some(t => t.valor !== 'Única') && !tallaSeleccionada
                  ? "[ SELECCIONE UNA TALLA ]"
                  : "✦ CONFIRMAR Y AÑADIR + ✦"}
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
