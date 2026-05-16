import { Metadata } from "next"
import ColeccionesHero from "@/components/colecciones/ColeccionesHero"
import ColeccionesLayout from "@/components/colecciones/ColeccionesLayout"
import { getCollections, getColeccionActual } from "@/lib/api"

export const metadata: Metadata = {
  title: "Colecciones — MURREN",
  description: "Descubre los drops que definen nuestra visión.",
}

export default async function ColeccionesPage() {
  const colecciones = await getCollections()
  const actual = getColeccionActual(colecciones)

  return (
    <main className="w-full bg-white text-black">
      <ColeccionesHero actual={actual} />
      <ColeccionesLayout colecciones={colecciones} />
    </main>
  )
}
