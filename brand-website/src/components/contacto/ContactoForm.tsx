"use client"

import { useState } from "react"
import { ArrowRight } from "@phosphor-icons/react"

export default function ContactoForm() {
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const nombre = formData.get("nombre") as string
    const email = formData.get("email") as string
    const asuntoValue = formData.get("asunto") as string
    const mensaje = formData.get("mensaje") as string

    const subjectLabels: Record<string, string> = {
      general: "Consulta General",
      pedido: "Estado de mi Pedido",
      devolucion: "Cambios y Devoluciones",
      colaboracion: "Colaboraciones / PR"
    }
    const textoAsunto = subjectLabels[asuntoValue] || asuntoValue

    // Construir el mensaje estructurado de WhatsApp de forma amigable con emojis
    const messageText = `¡Hola, equipo Mürren! 👋\nQuiero ponerme en contacto con ustedes. Aquí les comparto mis datos:\n\n👤 *Nombre:* ${nombre}\n✉️ *Email:* ${email}\n📌 *Asunto:* ${textoAsunto}\n\n💬 *Mensaje:*\n${mensaje}`
    const encodedText = encodeURIComponent(messageText)
    const whatsappUrl = `https://api.whatsapp.com/send?phone=573017581950&text=${encodedText}`

    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappUrl, "_blank")

    // Simular estado enviado
    setEnviado(true)
    setTimeout(() => setEnviado(false), 5000)
  }

  return (
    <div className="w-full h-full bg-white text-black p-8 md:p-12 lg:p-16 flex flex-col justify-center">
      <div className="max-w-xl w-full mx-auto lg:mx-0">
        <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6 block">
          02 // ENVÍANOS UN MENSAJE
        </span>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="nombre" className="text-xs font-bold uppercase tracking-widest">
                NOMBRE COMPLETO *
              </label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre"
                required
                className="w-full border-b border-gray-300 py-3 bg-transparent text-sm md:text-base focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                placeholder="Escribe tu nombre"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest">
                EMAIL *
              </label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required
                className="w-full border-b border-gray-300 py-3 bg-transparent text-sm md:text-base focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="asunto" className="text-xs font-bold uppercase tracking-widest">
              ASUNTO
            </label>
            <div className="relative">
              <select 
                id="asunto"
                name="asunto"
                className="w-full border-b border-gray-300 py-3 bg-transparent text-sm md:text-base focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer"
              >
                <option value="general">Consulta General</option>
                <option value="pedido">Estado de mi Pedido</option>
                <option value="devolucion">Cambios y Devoluciones</option>
                <option value="colaboracion">Colaboraciones / PR</option>
              </select>
              {/* Custom arrow for select */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="black" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="mensaje" className="text-xs font-bold uppercase tracking-widest">
              MENSAJE *
            </label>
            <textarea 
              id="mensaje" 
              name="mensaje"
              required
              rows={4}
              className="w-full border-b border-gray-300 py-3 bg-transparent text-sm md:text-base focus:outline-none focus:border-black transition-colors placeholder:text-gray-400 resize-none"
              placeholder="¿Cómo podemos ayudarte?"
            />
          </div>

          <button 
            type="submit"
            className="mt-8 bg-black text-white px-8 py-5 text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center justify-center gap-3 w-full md:w-auto self-start"
          >
            {enviado ? "MENSAJE ENVIADO" : "ENVIAR MENSAJE"} 
            {!enviado && <ArrowRight size={16} />}
          </button>
          
          {enviado && (
            <p className="text-sm text-green-600 mt-2 font-medium">
              Gracias por escribirnos. Te responderemos lo más pronto posible.
            </p>
          )}

        </form>
      </div>
    </div>
  )
}
