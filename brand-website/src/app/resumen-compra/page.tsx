"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/components/cart/CartContext"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckSquare, Square, ShieldCheck, Truck, Barcode } from "@phosphor-icons/react"

// Dynamic SVG Barcode Component for High-End Streetwear Aesthetic
function SVGBarcode({ totalItems }: { totalItems: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg className="w-48 h-8 text-black fill-current" viewBox="0 0 100 20">
        <rect x="0" y="0" width="1.5" height="20" />
        <rect x="3" y="0" width="0.8" height="20" />
        <rect x="5" y="0" width="2.2" height="20" />
        <rect x="9" y="0" width="0.8" height="20" />
        <rect x="11" y="0" width="1.5" height="20" />
        <rect x="14" y="0" width="3" height="20" />
        <rect x="18" y="0" width="0.8" height="20" />
        <rect x="20" y="0" width="1.5" height="20" />
        <rect x="23" y="0" width="0.8" height="20" />
        <rect x="25" y="0" width="2.2" height="20" />
        <rect x="29" y="0" width="1.5" height="20" />
        <rect x="32" y="0" width="0.8" height="20" />
        <rect x="34" y="0" width="3" height="20" />
        <rect x="38" y="0" width="0.8" height="20" />
        <rect x="40" y="0" width="1.5" height="20" />
        <rect x="43" y="0" width="2.2" height="20" />
        <rect x="47" y="0" width="0.8" height="20" />
        <rect x="49" y="0" width="1.5" height="20" />
        <rect x="52" y="0" width="3" height="20" />
        <rect x="56" y="0" width="0.8" height="20" />
        <rect x="58" y="0" width="1.5" height="20" />
        <rect x="61" y="0" width="0.8" height="20" />
        <rect x="63" y="0" width="2.2" height="20" />
        <rect x="67" y="0" width="1.5" height="20" />
        <rect x="70" y="0" width="0.8" height="20" />
        <rect x="72" y="0" width="3" height="20" />
        <rect x="76" y="0" width="0.8" height="20" />
        <rect x="78" y="0" width="1.5" height="20" />
        <rect x="81" y="0" width="2.2" height="20" />
        <rect x="85" y="0" width="0.8" height="20" />
        <rect x="87" y="0" width="1.5" height="20" />
        <rect x="90" y="0" width="3" height="20" />
        <rect x="94" y="0" width="0.8" height="20" />
        <rect x="96" y="0" width="1.5" height="20" />
        <rect x="99" y="0" width="0.8" height="20" />
      </svg>
      <span className="text-[8px] font-mono text-neutral-500 tracking-[0.3em] uppercase">
        * MRN-MANIFEST-{1000 + totalItems * 7} *
      </span>
    </div>
  )
}

export default function ResumenCompraPage() {
  const { cartItems, proceedToCheckout, isCheckingOut, updateQuantity } = useCart()
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
          [ CARGANDO MANIFIESTO DE ORDEN... ]
        </div>
      </div>
    )
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const isFreeShipping = subtotal >= 200000
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] bg-white flex flex-col items-center justify-center px-6 text-center">
        <div className="border-2 border-black p-10 max-w-lg bg-neutral-50 flex flex-col items-center">
          <Barcode size={48} className="text-black mb-4" />
          <h1 className="text-sm font-black uppercase tracking-[0.25em] text-black mb-4">CARRITO DE COMPRAS VACÍO</h1>
          <p className="text-xs font-mono text-neutral-500 uppercase leading-relaxed mb-8">
            EL MANIFIESTO NO REGISTRA PRENDAS DE LA MARCA ACTIVAS EN ESTE DISPOSITIVO.
          </p>
          <Link
            href="/colecciones/ver-todo"
            className="border-2 border-black bg-black text-white hover:bg-white hover:text-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all font-mono"
          >
            ✦ EXPLORAR COLECCIONES ✦
          </Link>
        </div>
      </div>
    )
  }

  const handleFinalPayment = async () => {
    if (!acceptedTerms) {
      alert("Por favor, acepta los términos legales y políticas de retracto según la Ley 1480 de 2011 antes de proceder al pago seguro.")
      return
    }
    await proceedToCheckout()
  }

  return (
    <div className="bg-white min-h-screen text-black pb-24 font-sans antialiased">
      {/* Breadcrumb / Steps Bar */}
      <div className="border-b border-black bg-[#fafafa] py-5">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500">
          <Link href="/colecciones/ver-todo" className="flex items-center gap-2 hover:text-black transition-colors font-bold text-black border border-black/10 px-3 py-1.5 bg-white">
            <ArrowLeft size={10} /> VOLVER A TIENDA
          </Link>
          <div className="flex gap-3 md:gap-6 flex-wrap justify-center">
            <span>[ 01. CARRITO_DRAWER ]</span>
            <span className="text-neutral-300">/</span>
            <span className="text-black font-black underline underline-offset-4 decoration-2">[ 02. RESUMEN_LEY_1480 ]</span>
            <span className="text-neutral-300">/</span>
            <span>[ 03. PASARELA_PAGO ]</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-10 lg:py-16">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-[3px] border-black pb-8 mb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#a855f7] font-black bg-black px-3 py-1.5 uppercase inline-block mb-3">
              ★ SYSTEM ORDER MANIFEST
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase leading-none tracking-tighter text-black font-mono">
              RESUMEN TÉCNICO DE ORDEN
            </h1>
          </div>
          <SVGBarcode totalItems={totalItemsCount} />
        </div>

        {/* Brutalist split grid lines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-black divide-y lg:divide-y-0 lg:divide-x divide-black bg-[#fafafa]">
          
          {/* Columna Izquierda: Detalle de Productos y Consentimiento */}
          <div className="lg:col-span-7 p-6 md:p-8 flex flex-col gap-8 bg-white relative overflow-hidden">
            {/* Outline section number in background */}
            <div className="absolute top-4 right-4 text-neutral-100 font-mono text-[9rem] font-bold select-none pointer-events-none leading-none z-0">
              01
            </div>

            <div className="relative z-10 flex flex-col gap-6">
              <h2 className="text-xs font-mono font-black uppercase tracking-[0.25em] text-neutral-800 flex items-center gap-2 border-b border-black pb-2 self-start">
                <span>■</span> PRENDAS SELECCIONADAS
              </h2>

              <div className="divide-y divide-neutral-200 border border-neutral-200 bg-white">
                {cartItems.map((item, idx) => (
                  <div key={item.id} className="p-5 flex gap-6 items-start relative group">
                    {/* Item indicator */}
                    <div className="absolute top-2 right-2 text-[9px] font-mono text-neutral-400">
                      [ PRENDA_0{idx + 1} ]
                    </div>

                    {/* Thumbnail */}
                    <div className="relative w-20 h-28 bg-neutral-50 border border-neutral-200 shrink-0 overflow-hidden">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex-1 flex flex-col justify-between h-28 pr-6">
                      <div>
                        {/* Collection & Category badge */}
                        {(item.collectionName || item.category) && (
                          <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5 flex gap-1.5 items-center">
                            {item.collectionName && <span className="text-black font-semibold">{item.collectionName}</span>}
                            {item.collectionName && item.category && <span>·</span>}
                            {item.category && <span>{item.category}</span>}
                          </div>
                        )}
                        <h3 className="font-bold text-xs uppercase tracking-wider text-black mb-1.5 leading-snug">
                          {item.productName}
                        </h3>
                        <div className="flex flex-wrap gap-x-3 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                          <span>COLOR: {item.selectedColor}</span>
                          <span className="text-neutral-300">|</span>
                          <span>TALLA: {item.selectedSize}</span>
                        </div>
                      </div>

                      {/* Cantidad y Precios */}
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-black text-xs font-semibold bg-[#fafafa]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 hover:bg-black hover:text-white transition-colors"
                          >
                            -
                          </button>
                          <span className="px-3 font-mono text-[11px] font-black">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 hover:bg-black hover:text-white transition-colors"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          {item.quantity > 1 && (
                            <div className="text-[9px] font-mono text-neutral-400 mb-0.5 tracking-wider">
                              {item.quantity} X {formatPrice(item.price)}
                            </div>
                          )}
                          <span className="font-mono text-xs font-black text-black">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Declaración de Consentimiento Explicito (Ley 1480 Art 50) */}
            <div className="border border-black p-6 bg-neutral-50 relative z-10">
              <h3 className="text-[10px] font-black tracking-[0.2em] text-black mb-4 font-mono flex items-center gap-2">
                <span>■</span> CONSENTIMIENTO DE COMPRA SEGURO
              </h3>
              <p className="text-[11px] font-mono text-neutral-600 leading-relaxed uppercase mb-6">
                De conformidad con el Artículo 50 de la Ley 1480 de 2011 (Estatuto del Consumidor de Colombia), declaro que he sido informado de forma clara, precisa y oportuna sobre las características del producto, su precio, los gastos de envío y los derechos legales que me asisten.
              </p>
              
              <button 
                onClick={() => setAcceptedTerms(!acceptedTerms)}
                className="flex items-start gap-4 text-left w-full group focus:outline-none border border-neutral-300 p-4 bg-white hover:border-black transition-all duration-300 rounded-none"
              >
                <div className="mt-0.5 shrink-0 text-black">
                  {acceptedTerms ? (
                    <CheckSquare size={20} weight="fill" className="text-[#a855f7]" />
                  ) : (
                    <Square size={20} className="text-neutral-400 group-hover:text-black transition-colors" />
                  )}
                </div>
                <span className="text-[10px] leading-relaxed font-bold text-neutral-700 select-none font-mono uppercase tracking-wider">
                  ACEPTO LOS TÉRMINOS DE COMPRA, LA POLÍTICA DE CAMBIOS Y DECLARO QUE CONOZCO LAS FACULTADES DE <strong className="text-black font-extrabold underline underline-offset-2">DERECHO DE RETRACTO</strong> Y <strong className="text-black font-extrabold underline underline-offset-2">REVERSIÓN DE PAGO</strong> CONSAGRADAS EN LA LEGISLACIÓN COLOMBIANA (LEY 1480 DE 2011).
                </span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Totales, Datos del Vendedor y Derechos del Consumidor */}
          <div className="lg:col-span-5 flex flex-col gap-0 divide-y divide-black bg-[#fafafa]">
            
            {/* Totales Box */}
            <div className="p-6 md:p-8 flex flex-col gap-6 bg-black text-white relative overflow-hidden">
              {/* Outline number in background */}
              <div className="absolute top-4 right-4 text-neutral-900 font-mono text-[9rem] font-bold select-none pointer-events-none leading-none z-0">
                02
              </div>

              <div className="relative z-10">
                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-neutral-400 mb-6 flex justify-between">
                  <span>TOTAL DE LA TRANSACCIÓN</span>
                  <span className="bg-[#a855f7] text-white px-2.5 py-0.5 text-[9px] font-black tracking-widest font-mono">
                    COP
                  </span>
                </h2>

                <div className="flex flex-col gap-3 font-mono text-[11px] tracking-wider mb-8">
                  <div className="flex justify-between text-neutral-400">
                    <span>[ SUBTOTAL_TARIFA ]</span>
                    <span className="text-white font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>[ LOGÍSTICA_ENVÍO ]</span>
                    <span className={isFreeShipping ? "text-[#a855f7] font-bold" : "text-white"}>
                      {isFreeShipping ? "GRATIS" : "CALCULADO AL PAGAR"}
                    </span>
                  </div>
                  <div className="text-[9px] text-[#a855f7] leading-snug uppercase tracking-widest font-bold">
                    * Envío gratis disponible sobre $200.000 COP
                  </div>
                  <div className="border-t border-neutral-800 my-2" />
                  <div className="flex justify-between text-sm font-sans font-black uppercase tracking-[0.15em] text-white">
                    <span className="text-[#a855f7]">TOTAL NETO</span>
                    <span className="font-mono text-[#a855f7] text-base font-extrabold">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <button
                  onClick={handleFinalPayment}
                  disabled={isCheckingOut || !acceptedTerms}
                  className={`w-full py-4.5 text-xs font-mono font-black uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 border 
                    ${!acceptedTerms 
                      ? "bg-neutral-900 text-neutral-500 border-neutral-800 cursor-not-allowed" 
                      : "bg-[#a855f7] text-white hover:bg-white hover:text-black border-[#a855f7] hover:border-white cursor-pointer"
                    }`}
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-neutral-400 border-t-white rounded-full animate-spin" />
                      [ CREANDO CHECKOUT DE TIENDA... ]
                    </>
                  ) : !acceptedTerms ? (
                    <>
                      [ ACEPTE EL CONSENTIMIENTO LEGAL ]
                    </>
                  ) : (
                    <>
                      ✦ CONFIRMAR Y PAGAR SEGURO ✦
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Datos del Vendedor (Requisito Comercio Electrónico Colombia) */}
            <div className="p-6 md:p-8 flex flex-col bg-white relative overflow-hidden">
              {/* Stamp overlay */}
              <div className="absolute bottom-4 right-4 z-10 flex flex-col items-center">
                <div className="border-[3px] border-double border-red-500 text-red-500 font-mono text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rotate-[-8deg] bg-white shadow-sm select-none">
                  ★ DESPACHADO ★
                  <br />
                  <span className="text-[7px]">MURREN BRAND DEVOLUCIONES</span>
                </div>
              </div>

              <div className="relative z-0">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-black mb-4 font-mono flex items-center gap-2">
                  <span>■</span> DATOS DEL VENDEDOR REGISTRADO
                </h3>
                <div className="grid grid-cols-2 gap-y-3.5 text-[10px] font-mono text-neutral-600 uppercase tracking-widest max-w-sm">
                  <span className="text-neutral-400">[ RAZÓN SOCIAL ]:</span>
                  <span className="text-black font-bold text-right">MURREN</span>
                  
                  <span className="text-neutral-400">[ RÉGIMEN FISCAL ]:</span>
                  <span className="text-black font-bold text-right text-xs">REG. SIMPLIFICADO</span>
                  
                  <span className="text-neutral-400">[ CORREO LEGAL ]:</span>
                  <span className="text-black font-bold text-right underline underline-offset-2 break-all font-sans lowercase">
                    murrenbygeral@gmail.com
                  </span>
                  
                  <span className="text-neutral-400">[ SEDE LOGÍSTICA ]:</span>
                  <span className="text-black font-bold text-right text-[9px]">BOGOTÁ, COLOMBIA</span>
                </div>
              </div>
            </div>

            {/* Resumen Ley 1480 de 2011 */}
            <div className="p-6 md:p-8 flex flex-col bg-white relative overflow-hidden">
              {/* Outline number in background */}
              <div className="absolute top-4 right-4 text-neutral-100 font-mono text-[9rem] font-bold select-none pointer-events-none leading-none z-0">
                03
              </div>

              <div className="relative z-10 flex flex-col gap-5">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-black mb-2 font-mono flex items-center gap-2 border-b border-neutral-200 pb-2 self-start">
                  <ShieldCheck size={16} />
                  MARCO LEGAL DEL CONSUMIDOR (LEY 1480)
                </h3>
                
                <div className="flex flex-col gap-5 text-[11px] font-mono text-neutral-600 leading-relaxed uppercase tracking-wider">
                  <div>
                    <h4 className="font-extrabold text-black mb-1 flex items-center gap-1.5">
                      <span className="text-white bg-black px-1.5 text-[9px] font-mono">01</span> DERECHO DE RETRACTO (ART. 47)
                    </h4>
                    <p className="text-[10px] text-neutral-500 leading-normal pl-5">
                      Para compras realizadas a través de canales digitales el cliente podrá solicitar la devolución de su compra dentro de los <strong className="text-black">cinco (5) días hábiles</strong> siguientes a la entrega del producto, siempre que este cumpla con las condiciones de estado descritas en la política de cambios. Si el reembolso es aprobado, el dinero será devuelto al método de pago original. En casos de derecho de retracto, el reembolso se realizará dentro de los <strong className="text-black">treinta (30) días calendario</strong> siguientes a la solicitud, conforme a lo establecido en la Ley 1480 de 2011.
                    </p>
                    <div className="pl-5 mt-1.5">
                      <Link href="/cambios" className="text-[#a855f7] hover:underline font-bold text-[9px] tracking-widest font-mono">
                        [ VER DETALLE COMPLETO DE DEVOLUCIONES ]
                      </Link>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-extrabold text-black mb-1 flex items-center gap-1.5">
                      <span className="text-white bg-black px-1.5 text-[9px] font-mono">02</span> REVERSIÓN DE PAGO (ART. 51)
                    </h4>
                    <p className="text-[10px] text-neutral-500 leading-normal pl-5">
                      Podrá solicitar la reversión de su pago dentro de los <strong className="text-black">cinco (5) días hábiles</strong> siguientes en los siguientes casos: sea víctima de fraude en la operación, corresponda a una compra no solicitada por el titular, el producto adquirido no sea recibido, el producto entregado no corresponda a lo solicitado, o el producto resulte defectuoso o con daños.
                    </p>
                    <div className="pl-5 mt-1.5">
                      <Link href="/cambios#reembolsos" className="text-[#a855f7] hover:underline font-bold text-[9px] tracking-widest font-mono">
                        [ VER CONDICIONES DE REEMBOLSO ]
                      </Link>
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-3 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-black font-bold text-[10px] font-mono uppercase">
                      <Truck size={14} className="text-white bg-black p-0.5 shrink-0" />
                      <span>TIEMPOS DE ENTREGA</span>
                    </div>
                    <ul className="text-[10px] text-neutral-500 leading-normal font-mono uppercase pl-5 space-y-1">
                      <li>— <strong className="text-black">Procesamiento y despacho:</strong> 1 a 2 días hábiles una vez confirmado el pago.</li>
                      <li>— <strong className="text-black">Entrega nacional estimada:</strong> 4 a 6 días hábiles después de ser despachado.</li>
                      <li>— Los tiempos pueden variar según la ciudad de destino, novedades logísticas de la transportadora o temporadas de alta demanda.</li>
                    </ul>
                    <Link href="/envios" className="text-[#a855f7] hover:underline font-mono text-[9px] tracking-widest font-bold pl-5">
                      [ VER POLÍTICA COMPLETA DE ENVÍOS ]
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
