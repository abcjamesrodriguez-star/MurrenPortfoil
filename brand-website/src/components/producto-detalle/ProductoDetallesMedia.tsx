import Image from "next/image"

type ProductoDetallesMediaProps = {
  imagenes: string[]
  nombre: string
}

export default function ProductoDetallesMedia({ imagenes, nombre }: ProductoDetallesMediaProps) {
  if (!imagenes || imagenes.length < 5) return null

  const [imagenGrande, ...imagenesPequenas] = imagenes.slice(0, 5)

  return (
    <div className="flex flex-col gap-4">
      {/* Etiqueta Detalle superior */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold tracking-widest uppercase text-black">DETALLES</span>
        <div className="flex gap-2">
          <span className="text-gray-400">←</span>
          <span className="text-black">→</span>
        </div>
      </div>

      {/* Imagen Principal Grande */}
      <div className="relative aspect-[16/9] md:aspect-[3/2] w-full bg-gray-100 border border-gray-200">
        <Image
          src={imagenGrande}
          alt={`${nombre} Detalle Principal`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* 4 Imágenes Pequeñas */}
      <div className="grid grid-cols-4 gap-4">
        {imagenesPequenas.map((img, idx) => (
          <div key={idx} className="relative aspect-square w-full bg-gray-100 border border-gray-200">
            <Image
              src={img}
              alt={`${nombre} Detalle ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 12vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
