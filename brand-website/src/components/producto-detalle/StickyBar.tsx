"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { CaretDown } from "@phosphor-icons/react"
import { useProductoContext } from "./ProductoContext"
import { ProductoDetalle } from "@/types"
import { useCart } from "@/components/cart/CartContext"

type StickyBarProps = {
  producto: ProductoDetalle
  // Un ID para observar el botón principal y saber cuándo mostrar el sticky bar
  mainButtonId?: string 
}

export default function StickyBar({ producto, mainButtonId = "main-add-to-cart" }: StickyBarProps) {
  const { nombre, precio, imagen, tallasDetalle: tallas } = producto
  const [isVisible, setIsVisible] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { tallaSeleccionada, setTallaSeleccionada, colorSeleccionado } = useProductoContext()
  const { addToCart } = useCart()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Mostrar sticky bar solo si el botón principal YA NO está visible
        setIsVisible(!entry.isIntersecting)
      },
      { root: null, threshold: 0 }
    )

    const mainBtn = document.getElementById(mainButtonId)
    if (mainBtn) {
      observer.observe(mainBtn)
    }

    return () => {
      if (mainBtn) observer.unobserve(mainBtn)
    }
  }, [mainButtonId])

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p)

  const handleAddToCart = () => {
    if (tallas.length > 0 && tallas.some(t => t.valor !== 'Única') && !tallaSeleccionada) {
      alert("Por favor, selecciona una talla antes de agregar al carrito.")
      setDropdownOpen(true)
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
      collectionName: producto.coleccionDetalle?.nombre,
      category: producto.categoria,
    }, 1);
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
            
            {/* Info Izquierda */}
            <div className="hidden md:flex items-center gap-4 flex-1">
              <div className="relative w-12 h-16 bg-gray-100 border border-gray-200">
                <Image src={imagen} alt={nombre} fill className="object-cover" sizes="48px" />
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-tight text-black line-clamp-1">{nombre}</h3>
                <p className="text-gray-600 text-sm">{formatPrice(precio)}</p>
              </div>
            </div>

            {/* Acciones Derecha */}
            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
              
              {/* Talla Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-300 text-xs font-semibold uppercase tracking-wider hover:border-black transition-colors"
                >
                  TALLA: {tallaSeleccionada || "SELECCIONAR"}
                  <CaretDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 shadow-lg flex flex-col py-1"
                    >
                      {tallas.map((t) => (
                        <button
                          key={t.valor}
                          onClick={() => {
                            if (t.disponible) {
                              setTallaSeleccionada(t.valor)
                              setDropdownOpen(false)
                            }
                          }}
                          disabled={!t.disponible}
                          className={`px-4 py-2 text-sm text-left transition-colors ${
                            !t.disponible 
                              ? "text-gray-300 line-through cursor-not-allowed" 
                              : "hover:bg-gray-100"
                          } ${tallaSeleccionada === t.valor ? "font-bold" : ""}`}
                        >
                          {t.valor}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botón Compra */}
              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-6 md:px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors whitespace-nowrap"
              >
                AGREGAR <span className="hidden sm:inline">AL CARRITO</span> +
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
