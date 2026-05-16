"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkle } from "@phosphor-icons/react"
import { aboutData } from "@/lib/about"

export default function AboutHero() {
  const { hero } = aboutData

  return (
    <section className="relative w-full border-b border-neutral-200">
      {/* Wrapper principal que define el grid, colapsa en mobile a una sola columna */}
      <div className="flex flex-col lg:grid lg:grid-cols-[30%_40%_30%]">
        
        {/* COLUMNA IZQUIERDA: Título y texto */}
        <div className="p-6 lg:p-8 flex flex-col justify-center relative border-b lg:border-b-0 lg:border-r border-neutral-200">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 }
              }
            }}
            className="flex flex-col"
          >
            <motion.span 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-8 block"
            >
              {hero.eyebrow}
            </motion.span>
            
            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8"
            >
              {hero.titulo.split("\n").map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.h1>

            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-sm text-neutral-500 max-w-[280px] leading-relaxed mb-12"
            >
              {hero.descripcion}
            </motion.p>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Link 
                href={hero.linkManifiesto}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:opacity-60 transition-colors border-b border-black hover:border-neutral-400 pb-1 w-max group"
              >
                VER MANIFIESTO 
                <span className="transform group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* COLUMNA CENTRAL: Imagen */}
        <div className="flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-neutral-200 p-6 lg:p-12">
          <div className="relative w-full aspect-video">
            <Image 
              src={hero.imagenPrincipal} 
              alt="Hero Image" 
              fill 
              className="object-cover grayscale"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </div>

        {/* COLUMNA DERECHA: Historia */}
        <div className="p-6 lg:p-8 flex flex-col relative overflow-hidden">
          <span className="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-6 block">
            {hero.historia.eyebrow}
          </span>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.3 }
              }
            }}
            className="space-y-6 text-sm text-neutral-700 leading-relaxed max-w-[300px] mt-auto lg:mt-0"
          >
            {hero.historia.parrafos.map((parrafo, idx) => (
              <motion.p 
                key={idx}
                variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
              >
                {parrafo.split("\n").map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </motion.p>
            ))}
          </motion.div>

          {/* Decorativo rotando */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-8 -right-8 text-black opacity-10 pointer-events-none"
          >
            <Sparkle size={160} weight="thin" />
          </motion.div>

          {/* Tab Lateral */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] tracking-[0.2em] text-neutral-300 whitespace-nowrap select-none pointer-events-none translate-x-1/2">
            EL ORIGEN + DECORATIVO
          </div>
        </div>

      </div>
    </section>
  )
}

