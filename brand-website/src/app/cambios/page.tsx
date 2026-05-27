import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cambios y Devoluciones — MURREN",
  description: "Conoce los plazos, condiciones y pasos para solicitar un cambio, devolución o garantía de tus prendas MURREN.",
}

const SECCIONES = [
  { id: "plazo", label: "PLAZO PARA CAMBIOS Y DEVOLUCIONES" },
  { id: "condiciones", label: "CONDICIONES DEL PRODUCTO" },
  { id: "no-aplican", label: "PRODUCTOS QUE NO APLICAN" },
  { id: "proceso", label: "PROCESO PARA SOLICITAR UN CAMBIO O DEVOLUCIÓN" },
  { id: "reembolsos", label: "REEMBOLSOS" },
  { id: "costos", label: "COSTOS DE ENVÍO" },
  { id: "direccion", label: "DIRECCIÓN PARA DEVOLUCIONES" },
  { id: "garantia", label: "GARANTÍA" },
]

export default function CambiosPage() {
  return (
    <main className="w-full bg-white text-black min-h-screen">
      
      {/* Cabecera / Banner */}
      <section className="bg-neutral-50 px-6 md:px-12 lg:px-24 py-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-neutral-400 font-mono mb-4">
            // SOPORTE / LEY 1480 DE 2011
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tight mb-4 text-black">
            POLÍTICA DE DEVOLUCIONES Y REEMBOLSOS
          </h1>
          <p className="text-sm md:text-base text-neutral-500 max-w-2xl leading-relaxed">
            Queremos que ames lo que recibes. Si algo no salió como esperabas, puedes solicitar un cambio o devolución siguiendo las condiciones descritas a continuación.
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
            
            {/* 1. Plazo */}
            <section id="plazo" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 01</span> PLAZO PARA CAMBIOS Y DEVOLUCIONES
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Nuestra política tiene una duración de 10 días hábiles desde la fecha de entrega del pedido. Después de este periodo no podremos gestionar cambios o devoluciones.
                </p>
                <p className="bg-neutral-50 p-4 border-l border-black">
                  De acuerdo con el derecho de retracto establecido en la Ley 1480 de 2011, para compras realizadas a través de canales digitales el cliente podrá solicitar la devolución de su compra dentro de los cinco (5) días hábiles siguientes a la entrega del producto, siempre que este cumpla con las condiciones descritas en esta política.
                </p>
              </div>
            </section>

            {/* 2. Condiciones */}
            <section id="condiciones" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 02</span> CONDICIONES DEL PRODUCTO
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Para que un cambio o devolución pueda ser aprobado, la prenda debe encontrarse en las mismas condiciones en las que fue entregada:
                </p>
                <ul className="space-y-2 mt-4 font-mono text-neutral-600 text-xs">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Sin señales de uso, lavado o alteraciones.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>En perfecto estado y limpia.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Sin manchas, olores, maquillaje, químicos o daños en la tela.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Preferiblemente, conservar su etiqueta original.</span>
                  </li>
                </ul>
                <p className="text-neutral-500 mt-4">
                  Nos reservamos el derecho de rechazar cambios o devoluciones que no cumplan con estas condiciones.
                </p>
              </div>
            </section>

            {/* 3. Productos que no aplican */}
            <section id="no-aplican" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 03</span> PRODUCTOS QUE NO APLICAN
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  No aplican para devolución o reembolso:
                </p>
                <ul className="space-y-2 mt-4 font-mono text-neutral-600 text-xs">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Productos en promoción o descuento especial.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Artículos que presenten señales de uso.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 4. Proceso */}
            <section id="proceso" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 04</span> PROCESO PARA SOLICITAR UN CAMBIO O DEVOLUCIÓN
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Para iniciar el proceso, escríbenos a: <strong className="text-black font-semibold">murrenbygeral@gmail.com</strong>
                </p>
                <p>
                  Incluye la siguiente información:
                </p>
                <ul className="space-y-2 mt-4 font-mono text-neutral-600 text-xs">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Número de pedido.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Nombre completo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Motivo de la solicitud.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Fotografías del producto (si aplica).</span>
                  </li>
                </ul>
                <p className="text-neutral-500 mt-4">
                  Nuestro equipo responderá tu solicitud en un plazo de 2 a 3 días hábiles.
                </p>
              </div>
            </section>

            {/* 5. Reembolsos */}
            <section id="reembolsos" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 05</span> REEMBOLSOS
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Una vez recibamos e inspeccionemos el producto, te notificaremos por correo electrónico si tu solicitud fue aprobada.
                </p>
                <p>
                  Si el reembolso es aprobado, el dinero será devuelto al método de pago original entre 5 y 15 días hábiles, dependiendo de la entidad bancaria y la plataforma de pago utilizada.
                </p>
                <p className="bg-neutral-50 p-4 border-l border-black">
                  En casos de derecho de retracto, el reembolso será realizado dentro de los treinta (30) días calendario siguientes a la solicitud, conforme a lo establecido en la Ley 1480 de 2011.
                </p>
              </div>
            </section>

            {/* 6. Costos */}
            <section id="costos" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 06</span> COSTOS DE ENVÍO
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Si el producto presenta defectos de fábrica, daños o errores atribuibles a la marca, asumiremos todos los costos de envío asociados al cambio o devolución.
                </p>
                <p>
                  Para cambios por selección errada de talla (Cambios por talla) el comprador deberá asumir el costo de envío.
                </p>
              </div>
            </section>

            {/* 7. Direccion */}
            <section id="direccion" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 07</span> DIRECCIÓN PARA DEVOLUCIONES
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <div className="bg-neutral-50 p-6 border border-neutral-200 font-mono text-sm leading-relaxed w-fit">
                  Cra 64A #4G-89 Barrio Pradera<br />
                  Bogotá, Colombia
                </div>
              </div>
            </section>

            {/* 8. Garantia */}
            <section id="garantia" className="scroll-mt-32 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 08</span> GARANTÍA
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Todos nuestros productos cuentan con garantía por defectos de fabricación.
                </p>
                <p className="bg-neutral-50 p-4 border-l border-red-500 text-neutral-700">
                  La garantía no cubre daños ocasionados por uso indebido, desgaste natural, lavado incorrecto, alteraciones realizadas por terceros o incumplimiento de las recomendaciones de cuidado de la prenda.
                </p>
              </div>
            </section>

          </article>

        </div>
      </section>

    </main>
  )
}
