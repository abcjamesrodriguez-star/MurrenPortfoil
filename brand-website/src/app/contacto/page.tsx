import { Metadata } from "next"
import ContactoInfo from "@/components/contacto/ContactoInfo"
import ContactoForm from "@/components/contacto/ContactoForm"
import ContactoFaq from "@/components/contacto/ContactoFaq"

export const metadata: Metadata = {
  title: "Contacto",
  description: "Ponte en contacto con el equipo de MURREN. Resuelve tus dudas sobre pedidos, cambios, envíos o colaboraciones de streetwear en Bogotá, Colombia.",
  alternates: {
    canonical: "https://murren.com.co/contacto"
  },
  openGraph: {
    type: "website",
    url: "https://murren.com.co/contacto",
    title: "Contacto — MURREN",
    description: "Ponte en contacto con el equipo de MURREN para dudas, devoluciones o colaboraciones.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contacto MURREN",
      }
    ]
  }
}

export default function ContactoPage() {
  return (
    <main className="w-full bg-white">
      
      {/* Sección Superior: Split 50/50 (o 40/60) */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* Columna Izquierda: Información */}
        <div className="w-full lg:w-5/12 xl:w-2/5">
          <ContactoInfo />
        </div>
        
        {/* Columna Derecha: Formulario */}
        <div className="w-full lg:w-7/12 xl:w-3/5 border-l border-gray-200">
          <ContactoForm />
        </div>
      </div>

      {/* Sección Inferior: FAQs */}
      <ContactoFaq />

    </main>
  )
}
