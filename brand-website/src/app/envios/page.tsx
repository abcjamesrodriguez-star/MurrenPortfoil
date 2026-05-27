import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Política de Envíos — MURREN",
  description: "Conoce los plazos de procesamiento, tiempos de entrega y cobertura nacional para todos tus pedidos MURREN dentro de Colombia.",
}

const SECCIONES = [
  { id: "procesamiento", label: "PROCESAMIENTO DEL PEDIDO" },
  { id: "tiempos", label: "TIEMPOS DE ENTREGA" },
  { id: "seguimiento", label: "SEGUIMIENTO DEL PEDIDO" },
  { id: "cobertura", label: "COBERTURA" },
  { id: "novedades", label: "NOVEDADES O RETRASOS" },
]

export default function EnviosPage() {
  return (
    <main className="w-full bg-white text-black min-h-screen">
      
      {/* Cabecera / Banner */}
      <section className="bg-neutral-50 px-6 md:px-12 lg:px-24 py-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-neutral-400 font-mono mb-4">
            // LOGÍSTICA / ENVÍOS NACIONALES
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tight mb-4 text-black">
            POLÍTICA DE ENVÍOS
          </h1>
          <p className="text-sm md:text-base text-neutral-500 max-w-2xl leading-relaxed">
            En MURREN trabajamos para que recibas tu pedido lo antes posible y en las mejores condiciones.
          </p>
        </div>
      </section>

      {/* Grid de Contenido */}
      <section className="px-6 md:px-12 lg:px-24 py-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">
          
          {/* Columna Izquierda: Índice Lateral Adhesivo */}
          <aside className="mb-12 lg:mb-0">
            <div className="lg:sticky lg:top-28 flex flex-col gap-1 border-b lg:border-b-0 pb-6 lg:pb-0 border-neutral-200">
              <p className="text-[10px] tracking-[0.2em] text-neutral-400 font-mono mb-4 uppercase">
                // ÍNDICE
              </p>
              <nav className="flex flex-col gap-y-3 items-start">
                {SECCIONES.map((sec) => (
                  <Link
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="text-[10px] font-bold tracking-widest uppercase hover:text-neutral-500 transition-colors text-black font-sans text-left"
                  >
                    {sec.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Columna Derecha: Texto Completo */}
          <article className="space-y-16 max-w-3xl">
            
            {/* 1. Procesamiento */}
            <section id="procesamiento" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 01</span> PROCESAMIENTO DEL PEDIDO
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Una vez confirmado el pago, tu pedido será preparado y despachado en un plazo de 1 a 2 días hábiles.
                </p>
              </div>
            </section>

            {/* 2. Tiempos */}
            <section id="tiempos" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 02</span> TIEMPOS DE ENTREGA
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Los pedidos nacionales dentro de Colombia tienen un tiempo estimado de entrega de 4 a 6 días hábiles después de ser despachados.
                </p>
                <p className="bg-neutral-50 p-4 border-l border-black">
                  Los tiempos pueden variar según la ciudad de destino, novedades logísticas de la transportadora o temporadas de alta demanda.
                </p>
              </div>
            </section>

            {/* 3. Seguimiento */}
            <section id="seguimiento" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 03</span> SEGUIMIENTO DEL PEDIDO
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Una vez tu pedido sea despachado, recibirás la información de seguimiento correspondiente para consultar el estado y ubicación del envío a través de correo electrónico.
                </p>
              </div>
            </section>

            {/* 4. Cobertura */}
            <section id="cobertura" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 04</span> COBERTURA
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Realizamos envíos a nivel nacional dentro de Colombia.
                </p>
              </div>
            </section>

            {/* 5. Novedades */}
            <section id="novedades" className="scroll-mt-32 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 05</span> NOVEDADES O RETRASOS
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  En caso de presentarse retrasos logísticos o novedades con la transportadora, nuestro equipo podrá brindarte acompañamiento sobre el estado de tu pedido.
                </p>
                <div className="bg-neutral-50 p-4 border border-neutral-200 font-mono text-xs text-neutral-600 mt-4 w-fit">
                  Contacto Soporte: murrenbygeral@gmail.com
                </div>
              </div>
            </section>

          </article>

        </div>
      </section>

    </main>
  )
}
