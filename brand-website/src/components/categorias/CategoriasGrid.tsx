"use client"

import { motion } from "framer-motion"
import { Category } from "@/types"
import { CategoriaCard } from "@/components/ui"

type CategoriasGridProps = {
  categorias: Category[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } }
}

export default function CategoriasGrid({ categorias }: CategoriasGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8"
    >
      {categorias.map((categoria, index) => (
        <motion.div key={categoria.id} variants={itemVariants}>
          <CategoriaCard
            slug={categoria.slug}
            nombre={categoria.nombre}
            imagen={categoria.imagen}
            priority={index < 5}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
