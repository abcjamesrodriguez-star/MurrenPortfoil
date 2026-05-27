import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Términos y Condiciones — MURREN",
  description: "Lee detenidamente los Términos y Condiciones de Uso y Compra aplicables al interactuar o comprar en el sitio oficial de MURREN.",
}

const SECCIONES = [
  { id: "uso-sitio", label: "USO DEL SITIO WEB" },
  { id: "productos", label: "PRODUCTOS Y DISPONIBILIDAD" },
  { id: "precios-pagos", label: "PRECIOS Y PAGOS" },
  { id: "envios", label: "ENVÍOS" },
  { id: "cambios", label: "CAMBIOS, DEVOLUCIONES Y RETRACTO" },
  { id: "propiedad", label: "PROPIEDAD INTELECTUAL" },
  { id: "modificaciones", label: "MODIFICACIONES" },
  { id: "legislacion", label: "LEGISLACIÓN APLICABLE" },
  { id: "contacto", label: "CONTACTO" },
]

export default function TerminosPage() {
  return (
    <main className="w-full bg-white text-black min-h-screen">
      
      {/* Cabecera / Banner */}
      <section className="bg-neutral-50 px-6 md:px-12 lg:px-24 py-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-neutral-400 font-mono mb-4">
            // TÉRMINOS LEGALES / ACUERDO DE COMPRA
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tight mb-4 text-black">
            TÉRMINOS Y CONDICIONES
          </h1>
          <p className="text-sm md:text-base text-neutral-500 max-w-2xl leading-relaxed">
            Bienvenido a MURREN. Al acceder, navegar o realizar una compra a través de nuestro sitio web www.murren.com.co, usted acepta los presentes Términos y Condiciones.
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
            
            {/* Introducción */}
            <section className="scroll-mt-32 pb-4">
              <p className="text-sm leading-relaxed text-neutral-600">
                Le recomendamos leer esta información cuidadosamente antes de utilizar nuestro sitio o realizar una compra.
              </p>
            </section>

            {/* 1. Uso */}
            <section id="uso-sitio" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 01</span> USO DEL SITIO WEB
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  El usuario se compromete a utilizar este sitio web de manera responsable, legal y respetuosa, absteniéndose de realizar actividades que puedan afectar el funcionamiento del sitio, la seguridad de la plataforma o los derechos de terceros.
                </p>
                <p className="bg-neutral-50 p-4 border-l border-red-500 text-neutral-700">
                  <strong>Queda prohibido:</strong>
                </p>
                <ul className="space-y-2 font-mono text-neutral-600 text-xs">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Utilizar el sitio para actividades ilegales o fraudulentas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Intentar acceder sin autorización a sistemas o información del sitio.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Introducir virus, software malicioso o cualquier tecnología que afecte el funcionamiento del sitio.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Utilizar contenido del sitio sin autorización previa de MURREN.</span>
                  </li>
                </ul>
                <p className="text-neutral-500 mt-4">
                  Nos reservamos el derecho de restringir o suspender el acceso al sitio en caso de uso indebido.
                </p>
              </div>
            </section>

            {/* 2. Productos */}
            <section id="productos" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 02</span> PRODUCTOS Y DISPONIBILIDAD
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Todos los productos publicados en nuestro sitio están sujetos a disponibilidad de inventario.
                </p>
                <p>
                  Aunque trabajamos para mostrar la información, colores y detalles de los productos con la mayor precisión posible, la visualización puede variar dependiendo del dispositivo o pantalla utilizada por el usuario.
                </p>
                <p>
                  MURREN podrá actualizar, modificar o descontinuar productos, referencias, precios o contenidos del sitio en cualquier momento y sin previo aviso.
                </p>
              </div>
            </section>

            {/* 3. Precios */}
            <section id="precios-pagos" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 03</span> PRECIOS Y PAGOS
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Todos los precios publicados en el sitio web están expresados en pesos colombianos (COP) e incluyen los impuestos aplicables, salvo que se indique lo contrario.
                </p>
                <p>
                  Los pagos realizados en el sitio son procesados mediante plataformas de pago externas y seguras. MURREN no almacena información financiera sensible como números completos de tarjetas de crédito o débito.
                </p>
                <p className="bg-neutral-50 p-4 border-l border-black">
                  <strong>Nos reservamos el derecho de rechazar o cancelar pedidos en casos de:</strong>
                </p>
                <ul className="space-y-2 font-mono text-neutral-600 text-xs">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Actividad sospechosa o posible fraude.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Errores en precios o inventario.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Información incompleta o inconsistente por parte del usuario.</span>
                  </li>
                </ul>
                <p className="mt-4">
                  En caso de cancelación de un pedido ya pagado, se realizará el reembolso correspondiente al mismo método de pago utilizado.
                </p>
              </div>
            </section>

            {/* 4. Envios */}
            <section id="envios" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 04</span> ENVÍOS
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Los tiempos de entrega son estimados y pueden variar según la ciudad, transportadora o situaciones externas ajenas a MURREN.
                </p>
                <p>
                  Una vez el pedido sea entregado a la empresa transportadora, el cliente recibirá la información de seguimiento correspondiente.
                </p>
              </div>
            </section>

            {/* 5. Cambios */}
            <section id="cambios" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 05</span> CAMBIOS, DEVOLUCIONES Y RETRACTO
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Las solicitudes de cambios, devoluciones, garantías y derecho de retracto se regirán conforme a nuestra Política de Devoluciones y Reembolsos disponible en el sitio web.
                </p>
              </div>
            </section>

            {/* 6. Propiedad */}
            <section id="propiedad" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 06</span> PROPIEDAD INTELECTUAL
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Todo el contenido disponible en este sitio web, incluyendo imágenes, fotografías, diseños, textos, logos, gráficos, videos y elementos visuales, es propiedad de MURREN o cuenta con autorización para su uso.
                </p>
                <p className="bg-neutral-50 p-4 border-l border-black">
                  Queda prohibida su reproducción, distribución, modificación o uso comercial sin autorización previa y escrita por parte de MURREN.
                </p>
              </div>
            </section>

            {/* 7. Modificaciones */}
            <section id="modificaciones" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 07</span> MODIFICACIONES
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  MURREN podrá actualizar o modificar los presentes Términos y Condiciones en cualquier momento. Los cambios entrarán en vigencia desde su publicación en el sitio web.
                </p>
                <p>
                  El uso continuo del sitio después de dichas modificaciones constituye la aceptación de los nuevos términos.
                </p>
              </div>
            </section>

            {/* 8. Legislacion */}
            <section id="legislacion" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 08</span> LEGISLACIÓN APLICABLE
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Los presentes Términos y Condiciones se rigen por las leyes de la República de Colombia.
                </p>
              </div>
            </section>

            {/* 9. Contacto */}
            <section id="contacto" className="scroll-mt-32 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 09</span> CONTACTO
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Si tiene preguntas relacionadas con estos Términos y Condiciones, puede contactarnos a través de:
                </p>
                <div className="bg-neutral-50 p-6 border border-neutral-200 font-mono text-sm leading-relaxed w-fit space-y-2">
                  <p><strong>Correo electrónico:</strong> murrenbygeral@gmail.com</p>
                  <p><strong>Dirección:</strong><br />Cra 64A #4G-89 Barrio Pradera<br />Bogotá, Colombia</p>
                </div>
              </div>
            </section>

          </article>

        </div>
      </section>

    </main>
  )
}
