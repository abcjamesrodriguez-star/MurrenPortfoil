"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { aboutData } from "@/lib/about"

// Componente helper para animar números
function AnimatedNumber({ to, from = 0, isSymbol = false }: { to: string, from?: number, isSymbol?: boolean }) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView || isSymbol) return
    
    // Parse final number
    const finalNum = parseInt(to.replace(/\D/g, ''))
    if (isNaN(finalNum)) return

    const suffix = to.replace(/\d/g, '') // e.g., "+"
    const prefix = to.startsWith('0') && finalNum < 10 ? '0' : ''

    let start = from
    const duration = 2000 // 2 seconds
    const fps = 60
    const step = (finalNum - from) / (duration / (1000 / fps))

    const timer = setInterval(() => {
      start += step
      if (start >= finalNum) {
        setCount(finalNum)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / fps)

    return () => clearInterval(timer)
  }, [isInView, to, from, isSymbol])

  if (isSymbol) {
    return <span ref={ref}>{to}</span>
  }

  // Formatting output to match original string format (e.g. "06" or "27+")
  const isPadded = to.startsWith('0') && count < 10
  const suffix = to.replace(/\d/g, '')
  
  return (
    <span ref={ref}>
      {isPadded ? `0${count}` : count}{suffix}
    </span>
  )
}

export default function AboutStats() {
  const { stats } = aboutData

  return (
    <div className="relative w-full h-full bg-gray-50 flex items-center">
      {/* Tab Lateral Derecho */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] tracking-[0.2em] text-gray-400 whitespace-nowrap select-none pointer-events-none translate-x-1/2">
        STATS
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 w-full divide-x divide-y md:divide-y-0 divide-gray-200 border-t border-gray-200 md:border-t-0">
        {stats.map((stat, idx) => {
          const isSymbol = stat.valor === "∞"
          const from = stat.valor === "2019" ? 2010 : 0

          return (
            <div key={idx} className="flex flex-col items-center justify-center py-8 md:py-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-black mb-4"
              >
                <AnimatedNumber to={stat.valor} from={from} isSymbol={isSymbol} />
              </motion.div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                {stat.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
