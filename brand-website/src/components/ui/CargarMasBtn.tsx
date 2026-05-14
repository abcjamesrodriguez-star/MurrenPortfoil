"use client"

import { motion } from "framer-motion"

type CargarMasBtnProps = {
  onClick: () => void
  visible: boolean
  loading?: boolean
}

export default function CargarMasBtn({ onClick, visible, loading = false }: CargarMasBtnProps) {
  if (!visible) return null

  return (
    <div className="flex justify-center mt-12 mb-8">
      <button
        onClick={onClick}
        disabled={loading}
        className="px-8 py-3 border border-black text-black font-semibold uppercase tracking-wider text-sm hover:bg-black hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          />
        ) : (
          "CARGAR MÁS"
        )}
      </button>
    </div>
  )
}
