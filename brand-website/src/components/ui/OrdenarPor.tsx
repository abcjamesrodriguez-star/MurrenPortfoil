"use client"

import { useState, useRef, useEffect } from "react"
import { CaretDown } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"

type Option = {
  label: string
  value: string
}

type OrdenarPorProps = {
  valor: string | null
  onChange: (valor: string) => void
  opciones?: Option[]
}

const DEFAULT_OPTIONS: Option[] = [
  { label: "Relevancia", value: "relevancia" },
  { label: "Más nuevos", value: "nuevo" },
  { label: "Precio: Menor a Mayor", value: "precio-asc" },
  { label: "Precio: Mayor a Menor", value: "precio-desc" },
]

export default function OrdenarPor({ valor, onChange, opciones = DEFAULT_OPTIONS }: OrdenarPorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = opciones.find((o) => o.value === valor) || opciones[0]

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-xs font-semibold uppercase tracking-wider text-black hover:border-black transition-colors"
      >
        ORDENAR POR: {selectedOption.label}
        <CaretDown
          size={14}
          weight="bold"
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg z-50 flex flex-col py-2"
          >
            {opciones.map((opcion) => (
              <button
                key={opcion.value}
                onClick={() => {
                  onChange(opcion.value)
                  setIsOpen(false)
                }}
                className={`text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors ${
                  valor === opcion.value || (!valor && opcion.value === opciones[0].value) ? "font-bold text-black" : ""
                }`}
              >
                {opcion.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
