import Image from "next/image"

type VistoEnProps = {
  imagenes: string[]
}

export default function VistoEn({ imagenes }: VistoEnProps) {
  if (!imagenes || imagenes.length === 0) return null

  return (
    <div className="bg-gray-50 h-full p-8 md:p-12 lg:p-16 flex flex-col justify-center">
      <span className="text-xs font-bold tracking-widest uppercase text-black mb-8">
        VISTO EN
      </span>
      <div className="grid grid-cols-3 gap-4">
        {imagenes.slice(0, 3).map((img, idx) => (
          <div key={idx} className="relative w-full aspect-[3/4] bg-gray-200 border border-gray-300">
            <Image
              src={img}
              alt={`Lifestyle ${idx + 1}`}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              sizes="(max-width: 768px) 33vw, 15vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
