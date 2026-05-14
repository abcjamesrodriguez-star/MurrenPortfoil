"use client"
import { AnimatePresence, motion } from "framer-motion"
import ColeccionCard from "./ColeccionCard"
import { Collection } from "@/types"

export default function ColeccionesGrid({ colecciones }: { colecciones: Collection[] }) {
  const fila1 = colecciones.slice(0, 3)
  const fila2 = colecciones.slice(3, 6)

  return (
    <div className="bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={colecciones.map(c => c.id).join("-")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col"
        >
          {/* Fila 1 — asimétrica */}
          <div className="flex flex-col md:grid md:grid-cols-[1fr_1fr_260px] border-b border-neutral-200 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            {fila1.map((c, i) => (
              <ColeccionCard key={c.id} coleccion={c} altaFila={true} />
            ))}
          </div>

          {/* Fila 2 — simétrica */}
          {fila2.length > 0 && (
            <div className="flex flex-col md:grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
              {fila2.map((c) => (
                <ColeccionCard key={c.id} coleccion={c} altaFila={false} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
