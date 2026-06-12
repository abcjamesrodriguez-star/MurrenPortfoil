import { Cube, Sparkle, ShieldCheck } from "@phosphor-icons/react/dist/ssr"

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
    <div className="w-full bg-black text-white py-16 lg:py-24 border-t border-neutral-900">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {features.map((f, idx) => (
            <div 
              key={idx} 
              className={`flex gap-6 items-start pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-neutral-800 last:border-b-0 last:border-r-0 ${
                idx > 0 ? "md:pl-8 lg:pl-16" : ""
              } ${
                idx < 2 ? "md:pr-8 lg:pr-16" : ""
              }`}
            >
              <div className="text-gray-400 mt-1 flex-shrink-0">
                {f.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold tracking-widest uppercase mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
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
