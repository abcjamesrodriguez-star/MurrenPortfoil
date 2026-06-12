"use client"

import { useState } from "react"
import { ArrowRight } from "@phosphor-icons/react"
import { enviarContactoEmail } from "@/app/actions"

export default function ContactoForm() {
  const [enviado, setEnviado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCargando(true)
    setError(null)
    setEnviado(false)
    
    const target = e.currentTarget
    const formData = new FormData(target)
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

    const res = await enviarContactoEmail({
      nombre,
      email,
      asunto: textoAsunto,
      mensaje
    })

    setCargando(false)

    if (res.success) {
      setEnviado(true)
      target.reset()
      setTimeout(() => setEnviado(false), 8000)
    } else {
      setError(res.error || "Ocurrió un error al enviar el correo.")
    }
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
            disabled={cargando}
            className="mt-8 bg-black text-white px-8 py-5 text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center justify-center gap-3 w-full md:w-auto self-start disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {cargando ? "ENVIANDO..." : enviado ? "MENSAJE ENVIADO" : "ENVIAR MENSAJE"} 
            {!cargando && !enviado && <ArrowRight size={16} />}
          </button>
          
          {enviado && (
            <p className="text-sm text-green-600 mt-2 font-medium">
              Gracias por escribirnos. Tu mensaje ha sido enviado por correo y te responderemos lo más pronto posible.
            </p>
          )}

          {error && (
            <p className="text-sm text-red-600 mt-2 font-medium">
              Error: {error}
            </p>
          )}

        </form>
      </div>
    </div>
  )
}
