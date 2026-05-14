"use client"

import { useState, useRef, useEffect } from "react"
import { CaretDown } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"

export type FiltroOption = {
  key: string
  label: string
  opciones: string[]
}

type FiltroBarProps = {
  filtros: FiltroOption[]
  valores: Record<string, string | null>
  onChange: (key: string, valor: string | null) => void
}

export default function FiltroBar({ filtros, valores, onChange }: FiltroBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="flex flex-wrap items-center gap-4">
      <span className="text-xs font-bold tracking-widest uppercase">FILTRAR</span>
      {filtros.map((filtro) => {
        const isOpen = openDropdown === filtro.key
        const isActive = valores[filtro.key] !== null

        return (
          <div key={filtro.key} className="relative">
            <button
              onClick={() => setOpenDropdown(isOpen ? null : filtro.key)}
              className={`flex items-center gap-2 px-4 py-2 border text-xs font-semibold uppercase tracking-wider transition-colors ${
                isActive
                  ? "border-black bg-black text-white"
                  : "border-gray-300 text-black hover:border-black"
              }`}
            >
              {valores[filtro.key] || filtro.label}
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
                  className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-50 flex flex-col py-2"
                >
                  <button
                    onClick={() => {
                      onChange(filtro.key, null)
                      setOpenDropdown(null)
                    }}
                    className={`text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors ${
                      !isActive ? "font-bold text-black" : ""
                    }`}
                  >
                    Todos
                  </button>
                  {filtro.opciones.map((opcion) => (
                    <button
                      key={opcion}
                      onClick={() => {
                        onChange(filtro.key, opcion)
                        setOpenDropdown(null)
                      }}
                      className={`text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors ${
                        valores[filtro.key] === opcion ? "font-bold text-black" : ""
                      }`}
                    >
                      {opcion}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
