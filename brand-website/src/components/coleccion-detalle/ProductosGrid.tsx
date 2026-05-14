"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Product } from "@/types"
import { ProductoCard } from "@/components/ui"

type ProductosGridProps = {
  productos: Product[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

export default function ProductosGrid({ productos }: ProductosGridProps) {
  if (productos.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        No se encontraron productos con los filtros seleccionados.
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10"
    >
      <AnimatePresence>
        {productos.map((producto, index) => (
          <motion.div
            key={producto.id}
            layout
            variants={itemVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          >
            <ProductoCard
              id={producto.id}
              slug={producto.slug}
              nombre={producto.nombre}
              precio={producto.precio}
              imagen={producto.imagen}
              priority={index < 4}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
