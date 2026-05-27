import { Metadata } from "next"
import { getCollections } from "@/lib/api"
import ColeccionesLayout from "@/components/colecciones/ColeccionesLayout"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Colecciones — MURREN",
  description: "Descubre los drops que definen nuestra visión.",
}

export default async function ColeccionesPage() {
  const colecciones = await getCollections()

  return (
    // -mt-24 neutraliza el pt-24 del <main> raíz para que colecciones ocupe el 100% de la pantalla menos el navbar
    <div className="lg:-mt-24 lg:pt-24 lg:h-screen lg:overflow-hidden bg-white text-black">
      <ColeccionesLayout colecciones={colecciones} />
    </div>
  )
}
