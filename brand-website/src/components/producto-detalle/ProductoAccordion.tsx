"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "@phosphor-icons/react"

type AccordionItem = {
  id: string
  titulo: string
  contenido: string
}

type ProductoAccordionProps = {
  items: AccordionItem[]
}

export default function ProductoAccordion({ items }: ProductoAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null)

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="w-full border-t border-gray-200">
      {items.map((item) => {
        const isOpen = openId === item.id

        return (
          <div key={item.id} className="border-b border-gray-200">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between py-6 text-left group"
            >
              <span className="text-sm font-bold tracking-widest uppercase text-black">
                {item.titulo}
              </span>
              <span className="text-gray-400 group-hover:text-black transition-colors">
                {isOpen ? <Minus size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div 
                    className="pb-6 pr-8 text-sm text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.contenido }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
