import { aboutData } from "@/lib/about"

export default function AboutMensaje() {
  const { mensaje } = aboutData

  return (
    <div className="relative w-full h-full border-b md:border-b-0 md:border-r" style={{ backgroundColor: 'var(--color-surface-inverse)', borderColor: 'var(--color-border-inverse)', color: 'var(--color-text-inverse)' }}>
      {/* Tab Lateral Izquierdo */}
      <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 rotate-90 text-[10px] tracking-[0.2em] whitespace-nowrap select-none pointer-events-none -translate-x-1/2 z-10" style={{ color: 'var(--color-text-muted)' }}>
        MENSAJE + TEXTO
      </div>

      <div className="flex flex-col h-full p-6 lg:p-8 lg:pt-12">
        {/* Título: Logo Texto */}
        <div className="mb-8">
          <span className="text-xl lg:text-2xl font-medium tracking-widest uppercase mb-2 block" style={{ color: 'var(--color-text-inverse-muted)' }}>
            ESTO ES
          </span>
          <h2 className="text-7xl lg:text-8xl xl:text-[110px] font-black uppercase tracking-tighter leading-[0.8] -ml-1" style={{ fontFamily: 'Impact, sans-serif', transform: 'scaleY(1.1)', transformOrigin: 'left top', color: 'var(--color-text-inverse)' }}>
            MURREN.
          </h2>
        </div>

        {/* Texto y Cierre */}
        <div className="mt-auto">
          <div className="space-y-4 text-xs lg:text-sm font-medium leading-relaxed max-w-[280px] mb-8" style={{ color: 'var(--color-text-inverse-muted)' }}>
            {mensaje.parrafos.map((parrafo, idx) => (
              <p key={idx}>{parrafo}</p>
            ))}
          </div>
          
          <hr className="mb-6 w-12" style={{ borderColor: 'var(--color-border-inverse)' }} />
          
          <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest underline underline-offset-4 decoration-2" style={{ color: 'var(--color-text-inverse)' }}>
            {mensaje.cierre}
          </p>
        </div>
      </div>
    </div>
  )
}
