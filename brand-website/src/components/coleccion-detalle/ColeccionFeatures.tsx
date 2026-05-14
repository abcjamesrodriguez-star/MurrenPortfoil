import Link from "next/link"
import { ArrowRight, Cube, Sparkle, ShieldCheck } from "@phosphor-icons/react/dist/ssr"

export default function ColeccionFeatures() {
  const features = [
    {
      icon: <Cube size={24} />,
      title: "EDICIÓN LIMITADA",
      desc: "Piezas exclusivas en cantidades limitadas."
    },
    {
      icon: <Sparkle size={24} />,
      title: "DISEÑO ORIGINAL",
      desc: "Cada prenda está diseñada para destacar."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "CALIDAD PREMIUM",
      desc: "Materiales seleccionados para durar."
    }
  ]

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[50vh]">
      {/* Banner Izquierdo Gris */}
      <div className="w-full lg:w-[40%] bg-gray-200 relative overflow-hidden flex flex-col justify-end p-8 lg:p-16 border-r border-gray-300">
        <div className="relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">
            LOOKBOOK
          </span>
          <h2 className="text-5xl lg:text-7xl font-bold uppercase tracking-tight text-black mb-8">
            SS24
          </h2>
          <Link 
            href="#"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:text-gray-600 transition-colors"
          >
            VER LOOKBOOK <ArrowRight size={16} />
          </Link>
        </div>
        {/* Placeholder para gran aspa o imagen de fondo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-full h-[1px] bg-black absolute rotate-45" />
          <div className="w-full h-[1px] bg-black absolute -rotate-45" />
        </div>
      </div>

      {/* Panel Derecho Negro (Features) */}
      <div className="w-full lg:w-[60%] bg-black text-white p-8 lg:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full flex flex-col gap-12">
          {features.map((f, idx) => (
            <div key={idx} className="flex gap-6 items-start">
              <div className="text-gray-400 mt-1">
                {f.icon}
              </div>
              <div className="flex-1 pb-10 border-b border-gray-800">
                <h3 className="text-sm font-bold tracking-widest uppercase mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
