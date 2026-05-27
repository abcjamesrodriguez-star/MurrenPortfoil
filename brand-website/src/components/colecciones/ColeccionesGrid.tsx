"use client"
import { AnimatePresence, motion } from "framer-motion"
import ColeccionCard from "./ColeccionCard"
import { Collection } from "@/types"

export default function ColeccionesGrid({ colecciones }: { colecciones: Collection[] }) {
  // Dividir colecciones en filas de 3
  const chunks: Collection[][] = []
  for (let i = 0; i < colecciones.length; i += 3) {
    chunks.push(colecciones.slice(i, i + 3))
  }

  return (
    <div className="bg-white text-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={colecciones.map(c => c.id).join("-")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col"
        >
          {chunks.map((fila, index) => {
            const esPrimeraFila = index === 0
            return (
              <div 
                key={index} 
                className={`flex flex-col md:grid ${
                  esPrimeraFila 
                    ? "md:grid-cols-[1fr_1fr_260px]" 
                    : "md:grid-cols-3"
                } border-b border-neutral-200 divide-y md:divide-y-0 md:divide-x divide-neutral-200`}
              >
                {fila.map((c) => (
                  <ColeccionCard 
                    key={c.id} 
                    coleccion={c} 
                    altaFila={esPrimeraFila} 
                  />
                ))}
              </div>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
