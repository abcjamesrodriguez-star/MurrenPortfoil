"use client"

import { motion } from "framer-motion"
import { aboutData } from "@/lib/about"

export default function AboutHistoria() {
  const { historiaCompleta } = aboutData

  return (
    <section className="w-full border-b border-neutral-200 bg-white text-black">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">

        {/* COLUMNA IZQUIERDA: Título fijo */}
        <div className="p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase block mb-6 text-neutral-500">
              // NUESTRA HISTORIA
            </span>
            <h2
              className="text-5xl lg:text-6xl font-black uppercase leading-none tracking-tighter text-black"
              style={{ fontFamily: "Impact, sans-serif" }}
            >
              EL<br />ORIGEN.
            </h2>
          </div>

          {/* Línea decorativa y año */}
          <div className="mt-12 lg:mt-0">
            <div className="w-12 h-px mb-4 bg-foreground" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500">
              FUNDADA — 2019
            </span>
          </div>
        </div>

        {/* COLUMNA DERECHA: Texto en columnas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="p-8 lg:p-12"
        >
          {/* Grid de 2 columnas de texto en desktop */}
          <div className="columns-1 md:columns-2 gap-12 text-sm text-neutral-700 leading-relaxed space-y-4">
            {historiaCompleta.parrafos.map((p, i) => (
              <p key={i} className="break-inside-avoid">
                {p}
              </p>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

