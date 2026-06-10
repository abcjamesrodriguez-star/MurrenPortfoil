"use client"

import { useCart } from "./CartContext"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, Trash, ShoppingBag } from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Ticker text repeated to enable continuous seamless looping
const TICKER_TEXT = "✦ DROP 01 / ILUSIÓN CHROME ✦ COMPRA COMPROBADA LEY 1480 ✦ ENVÍO GRATIS SUPERANDO LOS $200.000 COP ✦ DEVOLUCIONES FÁCILES ✦ SOPORTE: MURRENBYGERAL@GMAIL.COM ✦ "
const FULL_TICKER = Array(5).fill(TICKER_TEXT).join("")

export default function CartDrawer() {
  const { cartItems, isOpen, closeCart, updateQuantity, removeFromCart } = useCart()
  const router = useRouter()

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shippingThreshold = 200000
  const progressPercent = Math.min((subtotal / shippingThreshold) * 100, 100)
  const remainingForFreeShipping = shippingThreshold - subtotal

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black z-50 cursor-pointer backdrop-blur-[2px]"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-[#020202] text-white z-50 flex flex-col shadow-2xl border-l border-neutral-900 font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-900 bg-black">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-black tracking-[0.2em] font-mono text-white flex items-center gap-2">
                  <span className="text-[#4699a1]">■</span> TU CARRITO
                </h2>
                <span className="font-mono text-[10px] bg-neutral-900 border border-neutral-800 text-[#4699a1] px-2 py-0.5 font-bold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} PRENDAS
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono text-neutral-600 tracking-widest hidden xs:inline">
                  [ STATUS: COMPRA_ACTIVA ]
                </span>
                <button
                  onClick={closeCart}
                  className="p-1.5 hover:bg-neutral-900 transition-colors border border-neutral-800 rounded-none text-neutral-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Free Shipping Indicator */}
            {cartItems.length > 0 && (
              <div className="px-6 py-4 bg-black border-b border-neutral-900">
                <div className="flex justify-between text-[10px] font-mono mb-2 tracking-wider">
                  {remainingForFreeShipping > 0 ? (
                    <span className="text-neutral-400">
                      COMPLEMENTAR DROPS:{" "}
                      <span className="text-[#4699a1] font-bold">{formatPrice(remainingForFreeShipping)}</span> PARA ENVÍO GRATIS
                    </span>
                  ) : (
                    <span className="text-[#4699a1] font-bold uppercase tracking-wider animate-pulse">
                      ★ ENVÍO GRATUITO ACTIVADO
                    </span>
                  )}
                  <span className="text-neutral-500 font-bold">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-[3px] bg-neutral-900 rounded-none overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`h-full ${remainingForFreeShipping <= 0 ? "bg-[#4699a1]" : "bg-white"}`}
                  />
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
              {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-12">
                  <div className="w-16 h-16 rounded-none bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neutral-600">
                    <ShoppingBag size={24} />
                  </div>
                  <div className="max-w-[280px]">
                    <h3 className="text-xs font-bold tracking-[0.25em] font-mono text-white mb-2 uppercase">EL CARRITO ESTÁ VACÍO</h3>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-mono uppercase">
                      NO SE HAN DETECTADO PRENDAS EN EL MANIFIESTO DE COMPRA.
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="border border-[#4699a1] text-[#4699a1] hover:bg-[#4699a1] hover:text-black px-6 py-3.5 text-xs font-bold tracking-[0.2em] font-mono transition-all duration-300"
                  >
                    ✦ EXPLORAR DROPS ✦
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence initial={false}>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -80, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                        className="flex gap-4 p-3 bg-black border border-neutral-900 hover:border-neutral-800 transition-colors duration-300 relative group"
                      >
                        {/* Technical index badge floating */}
                        <div className="absolute top-2 right-2 text-[9px] font-mono text-neutral-600 select-none">
                          [ ITEM.0{index + 1} ]
                        </div>

                        {/* Image */}
                        <div className="relative w-20 h-28 bg-neutral-950 border border-neutral-900 shrink-0 overflow-hidden group/img">
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                            sizes="80px"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between pr-8">
                          <div>
                            {/* Collection & Category Detail */}
                            {(item.collectionName || item.category) && (
                              <div className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mb-1 flex gap-1 items-center">
                                {item.collectionName && <span className="text-[#4699a1]/80">{item.collectionName}</span>}
                                {item.collectionName && item.category && <span>·</span>}
                                {item.category && <span>{item.category}</span>}
                              </div>
                            )}
                            <div className="flex flex-col mb-1">
                              <Link
                                href={`/productos/${item.productSlug}`}
                                onClick={closeCart}
                                className="font-bold text-xs uppercase tracking-wider text-white hover:text-[#4699a1] transition-colors duration-200 line-clamp-2"
                              >
                                {item.productName}
                              </Link>
                            </div>
                            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[9px] font-mono text-neutral-400 uppercase tracking-wider mt-1.5">
                              <span>COLOR: {item.selectedColor}</span>
                              <span className="text-neutral-800">|</span>
                              <span>TALLA: {item.selectedSize}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-end mt-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-neutral-800 bg-[#020202]">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 hover:bg-neutral-900 text-neutral-500 hover:text-white transition-colors"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="px-2 text-[10px] font-mono text-white font-bold select-none min-w-[16px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 hover:bg-neutral-900 text-neutral-500 hover:text-white transition-colors"
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="flex flex-col items-end">
                              {item.quantity > 1 && (
                                <span className="text-[9px] font-mono text-neutral-500 mb-0.5">
                                  {item.quantity} X {formatPrice(item.price)}
                                </span>
                              )}
                              <span className="font-mono text-xs text-[#4699a1] font-bold">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Trash Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="absolute bottom-2 right-2 text-neutral-600 hover:text-red-500 p-1.5 transition-colors duration-200"
                          title="Eliminar ítem"
                        >
                          <Trash size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="bg-black border-t border-neutral-900 flex flex-col">
                {/* Visual grid divider */}
                <div className="px-6 py-4 flex flex-col gap-2.5 font-mono text-[10px] tracking-widest border-b border-neutral-900 bg-[#020202]/55">
                  <div className="flex justify-between text-neutral-400">
                    <span>[ SUBTOTAL_TARIFA ]</span>
                    <span className="text-white font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>[ LOGÍSTICA_ENVÍO ]</span>
                    <span className={remainingForFreeShipping <= 0 ? "text-[#4699a1] font-bold" : "text-white"}>
                      {remainingForFreeShipping <= 0 ? "GRATIS" : "CALCULADO AL PAGAR"}
                    </span>
                  </div>
                  <div className="border-t border-neutral-900 my-1.5" />
                  <div className="flex justify-between text-xs font-bold uppercase tracking-[0.15em] text-white">
                    <span className="text-[#4699a1]">■ TOTAL NETO</span>
                    <span className="text-[#4699a1] font-mono">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="p-6 flex flex-col gap-4">
                  <button
                    onClick={() => {
                      closeCart()
                      router.push("/resumen-compra")
                    }}
                    className="w-full bg-[#4699a1] text-black hover:bg-white hover:text-black py-4 text-xs font-mono font-bold uppercase tracking-[0.2em] transition-colors duration-300 relative overflow-hidden group/btn border border-[#4699a1] hover:border-white"
                  >
                    [ PROCEDER AL CHECKOUT ]
                  </button>

                  <p className="text-[9px] text-center text-neutral-600 leading-relaxed font-mono uppercase max-w-[360px] mx-auto select-none">
                    VERIFIQUE SU ORDEN & TALLA CONFORME A LA LEY 1480 DE 2011 (DERECHOS DE RETRACTO Y REVERSIÓN DE PAGO).
                  </p>
                </div>
              </div>
            )}

            {/* Continuous Seamless Scrolling Legal Marquee Banner at bottom */}
            <div className="w-full overflow-hidden bg-[#4699a1] text-black py-1.5 select-none font-mono text-[9px] font-black tracking-widest flex items-center border-t border-[#4699a1]">
              <motion.div
                animate={{ x: [0, -1200] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 32,
                    ease: "linear",
                  },
                }}
                className="whitespace-nowrap flex gap-4 uppercase"
              >
                <span>{FULL_TICKER}</span>
              </motion.div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
