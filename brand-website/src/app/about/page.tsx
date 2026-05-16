import { Metadata } from "next"
import AboutHero from "@/components/about/AboutHero"
import AboutHistoria from "@/components/about/AboutHistoria"
import AboutValores from "@/components/about/AboutValores"
import AboutStats from "@/components/about/AboutStats"
import AboutMensaje from "@/components/about/AboutMensaje"
import AboutImagenGrupal from "@/components/about/AboutImagenGrupal"
import AboutCTA from "@/components/about/AboutCTA"

export const metadata: Metadata = {
  title: "About — MURREN",
  description: "MURREN nace desde la necesidad de expresarnos sin pedir permiso. Ropa para quienes viven diferente.",
}

export default function AboutPage() {
  return (
    <main className="w-full bg-background text-foreground overflow-hidden">
      
      {/* BANDA 1: Hero */}
      <AboutHero />

      {/* BANDA 1.5: Historia completa */}
      <AboutHistoria />

      {/* BANDA 2: Valores y Estadísticas */}
      <section className="w-full border-b border-foreground/10">
        <div className="flex flex-col lg:grid lg:grid-cols-[60%_40%]">
          <AboutValores />
          <AboutStats />
        </div>
      </section>

      {/* BANDA 3: Mensaje, Imagen Grupal y CTA */}
      <section className="w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-[30%_40%_30%]">
          <AboutMensaje />
          <AboutImagenGrupal />
          <AboutCTA />
        </div>
      </section>

    </main>
  )
}
