import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

export default function ContactoInfo() {
  return (
    <div className="w-full h-full bg-black text-white p-8 md:p-12 lg:p-16 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6 block">
          01 // ESTAMOS AQUÍ
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9] mb-12">
          HABLEMOS.
        </h1>
        
        <p className="text-gray-400 text-sm md:text-base max-w-sm mb-16 leading-relaxed">
          Para dudas sobre tu pedido, devoluciones o propuestas de colaboración, escríbenos o visítanos en nuestro estudio.
        </p>

        <div className="flex flex-col gap-10">
          {/* Bloque 1 */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              EMAIL / SOPORTE
            </h3>
            <a href="mailto:storemurren@gmail.com" className="text-lg md:text-xl font-bold tracking-tight hover:text-gray-300 transition-colors">
              STOREMURREN@GMAIL.COM
            </a>
          </div>

          {/* Bloque 2 */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              WHATSAPP / TELÉFONO
            </h3>
            <a href="https://api.whatsapp.com/send?phone=573017581950" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-bold tracking-tight hover:text-gray-300 transition-colors">
              +57 301 758 1950
            </a>
            <p className="text-xs text-gray-400 mt-2">Lunes a Viernes, 9AM - 6PM (COT)</p>
          </div>

          {/* Bloque 3 */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
              PUNTO DE VENTA / SHOWROOM
            </h3>
            <p className="text-lg md:text-xl font-bold tracking-tight leading-snug max-w-xs uppercase">
              CENTRO COMERCIAL GRAN SAN<br />
              KR 10 # 9-37 LOCAL 2275<br />
              BOGOTÁ, COLOMBIA
            </p>
            <p className="text-xs text-gray-400 mt-2">Solo con cita previa.</p>
          </div>
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="mt-20 pt-8 border-t border-gray-800 flex flex-wrap gap-8">
        <Link href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors">
          INSTAGRAM <ArrowUpRight size={16} />
        </Link>
        <Link href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors">
          TIKTOK <ArrowUpRight size={16} />
        </Link>
        <Link href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors">
          PINTEREST <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  )
}
