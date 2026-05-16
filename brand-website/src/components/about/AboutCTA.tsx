"use client"

import { motion } from "framer-motion"
import { InstagramLogo, TiktokLogo, YoutubeLogo, TwitterLogo } from "@phosphor-icons/react"
import { aboutData } from "@/lib/about"

export default function AboutCTA() {
  const { cta } = aboutData

  const renderRedIcon = (icono: string) => {
    switch (icono) {
      case "InstagramLogo": return <InstagramLogo size={28} weight="regular" />
      case "TiktokLogo": return <TiktokLogo size={28} weight="regular" />
      case "YoutubeLogo": return <YoutubeLogo size={28} weight="regular" />
      case "TwitterLogo": return <TwitterLogo size={28} weight="regular" />
      default: return <InstagramLogo size={28} weight="regular" />
    }
  }

  return (
    <div className="relative w-full h-full p-6 lg:p-8 flex flex-col items-center justify-center bg-white min-h-[250px] lg:min-h-auto">
      
      {/* Tab Lateral Derecho */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] tracking-[0.2em] text-neutral-300 whitespace-nowrap select-none pointer-events-none translate-x-1/2 z-10">
        CTA + REDES
      </div>

      {/* Caja interior geométrica con esquinas */}
      <div className="relative w-full max-w-sm aspect-square md:aspect-auto md:h-full flex flex-col items-center justify-center p-8 text-center border border-neutral-200">
        
        {/* Esquinas Decorativas en L */}
        <span className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-black" />
        <span className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-black" />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-black" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-black" />

        <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-6">
          {cta.eyebrow}
        </span>
        
        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none mb-12">
          {cta.titulo.split(" ").map((word, idx) => (
            <span key={idx} className="block">{word}</span>
          ))}
        </h3>

        <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-6">
          SÍGUENOS
        </span>

        <div className="flex gap-4">
          {cta.redes.map((red, idx) => (
            <motion.a
              key={idx}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              className="text-black hover:opacity-60 transition-colors"
            >
              {renderRedIcon(red.icono)}
            </motion.a>
          ))}
        </div>

      </div>
    </div>
  )
}

