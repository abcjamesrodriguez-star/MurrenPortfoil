"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    pregunta: "¿CÓMO PUEDO RASTREAR MI PEDIDO?",
    respuesta: "Una vez que tu pedido sea despachado, recibirás un correo electrónico con el número de guía y el enlace directo de la transportadora para que puedas hacerle seguimiento en tiempo real."
  },
  {
    pregunta: "¿CUÁLES SON LOS TIEMPOS DE ENVÍO?",
    respuesta: "Para Bogotá y ciudades principales, el tiempo estimado es de 2 a 4 días hábiles. Para el resto del país, puede tomar entre 4 y 7 días hábiles dependiendo de tu ubicación exacta."
  },
  {
    pregunta: "¿PUEDO HACER CAMBIOS O DEVOLUCIONES?",
    respuesta: "Sí, tienes hasta 15 días calendario desde la recepción de tu prenda para solicitar un cambio por talla o garantía. La prenda debe estar en perfectas condiciones y con sus etiquetas originales. Escríbenos al correo de soporte con tu número de orden."
  },
  {
    pregunta: "¿VENDEN AL POR MAYOR?",
    respuesta: "Actualmente Murren funciona bajo un modelo de tiradas limitadas (drops) directas al consumidor, por lo que no manejamos ventas al por mayor tradicionales. Sin embargo, para colaboraciones especiales o proyectos de gran volumen, selecciona 'Colaboraciones / PR' en el formulario."
  }
]

export default function ContactoFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <div className="w-full bg-gray-50 py-24 border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/3">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6 block">
              03 // AYUDA RÁPIDA
            </span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-black mb-8 leading-none">
              PREGUNTAS<br />FRECUENTES
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Si tu pregunta no está en esta lista, por favor utiliza nuestro formulario de contacto o escríbenos directamente a nuestro WhatsApp de soporte.
            </p>
          </div>

          <div className="w-full lg:w-2/3 flex flex-col">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx
              
              return (
                <div key={idx} className="border-b border-gray-200 last:border-0">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between py-6 text-left hover:text-gray-600 transition-colors focus:outline-none"
                  >
                    <span className="text-sm md:text-base font-bold uppercase tracking-wider pr-8">
                      {faq.pregunta}
                    </span>
                    <div className="relative w-4 h-4 flex-shrink-0 flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-black absolute" />
                      <div className={`w-0.5 h-4 bg-black absolute transition-transform duration-300 ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pr-8 text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
                          {faq.respuesta}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}
