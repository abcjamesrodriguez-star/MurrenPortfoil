import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Política de Privacidad — MURREN",
  description: "Entérate de cómo recopilamos, protegemos y utilizamos tus datos personales en MURREN, de acuerdo con la Ley colombiana 1581 de 2012.",
}

const SECCIONES = [
  { id: "informacion", label: "INFORMACIÓN QUE RECOPILAMOS" },
  { id: "uso", label: "USO DE LA INFORMACIÓN" },
  { id: "cookies", label: "COOKIES Y TECNOLOGÍAS DE SEGUIMIENTO" },
  { id: "terceros", label: "COMPARTIR INFORMACIÓN CON TERCEROS" },
  { id: "derechos", label: "DERECHOS DEL TITULAR DE LOS DATOS" },
  { id: "seguridad", label: "SEGURIDAD DE LA INFORMACIÓN" },
  { id: "retencion", label: "RETENCIÓN DE DATOS" },
  { id: "menores", label: "MENORES DE EDAD" },
  { id: "cambios", label: "CAMBIOS EN ESTA POLÍTICA" },
  { id: "contacto", label: "CONTACTO" },
]

export default function PrivacidadPage() {
  return (
    <main className="w-full bg-white text-black min-h-screen">
      
      {/* Cabecera / Banner */}
      <section className="bg-neutral-50 px-6 md:px-12 lg:px-24 py-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-neutral-400 font-mono mb-4">
            // SEGURIDAD / LEY 1581 DE 2012
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tight mb-4 text-black">
            POLÍTICA DE PRIVACIDAD
          </h1>
          <p className="text-sm md:text-base text-neutral-500 max-w-2xl leading-relaxed">
            En MURREN valoramos su privacidad y nos comprometemos a proteger la información personal que comparte con nosotros a través de nuestro sitio web: www.murren.com.co.
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
                La presente Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos sus datos personales de acuerdo con la legislación colombiana aplicable, especialmente la Ley 1581 de 2012 y sus decretos reglamentarios.
              </p>
            </section>

            {/* 1. Informacion */}
            <section id="informacion" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 01</span> INFORMACIÓN QUE RECOPILAMOS
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Cuando visita nuestro sitio web o realiza una compra, podemos recopilar la siguiente información personal:
                </p>
                <ul className="space-y-2 mt-4 font-mono text-neutral-600 text-xs">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Nombre y apellidos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Número de teléfono.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Dirección de correo electrónico.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Dirección de envío y facturación.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Información relacionada con sus pedidos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Datos de navegación, dirección IP y comportamiento dentro del sitio web.</span>
                  </li>
                </ul>
                <p>
                  También recopilamos información automáticamente mediante tecnologías como cookies, píxeles y herramientas de análisis que nos ayudan a mejorar la experiencia del usuario y optimizar nuestros servicios.
                </p>
              </div>
            </section>

            {/* 2. Uso */}
            <section id="uso" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 02</span> USO DE LA INFORMACIÓN
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  La información recopilada podrá ser utilizada para:
                </p>
                <ul className="space-y-2 mt-4 font-mono text-neutral-600 text-xs">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Procesar y gestionar pedidos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Coordinar envíos y entregas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Brindar atención al cliente.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Enviar confirmaciones, actualizaciones y notificaciones relacionadas con sus compras.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Mejorar nuestros productos, servicios y experiencia en el sitio web.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Detectar posibles fraudes o actividades no autorizadas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Enviar información promocional, campañas de marketing y novedades de la marca, siempre que el usuario lo autorice.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 3. Cookies */}
            <section id="cookies" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 03</span> COOKIES Y TECNOLOGÍAS DE SEGUIMIENTO
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Nuestro sitio web utiliza cookies y tecnologías similares para mejorar la navegación, analizar el comportamiento de los usuarios y personalizar la experiencia dentro del sitio.
                </p>
                <p>
                  Las cookies también pueden ser utilizadas por plataformas externas como Shopify, Google Analytics y herramientas publicitarias o de remarketing.
                </p>
                <p>
                  El usuario puede modificar la configuración de cookies desde su navegador en cualquier momento.
                </p>
              </div>
            </section>

            {/* 4. Terceros */}
            <section id="terceros" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 04</span> COMPARTIR INFORMACIÓN CON TERCEROS
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Podremos compartir información personal únicamente con proveedores y plataformas necesarias para la operación de nuestro negocio, tales como:
                </p>
                <ul className="space-y-2 mt-4 font-mono text-neutral-600 text-xs">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Pasarelas de pago.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Empresas transportadoras.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Plataformas tecnológicas y de ecommerce.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Herramientas de análisis y marketing digital.</span>
                  </li>
                </ul>
                <p className="bg-neutral-50 p-4 border-l border-black">
                  Estas entidades únicamente podrán utilizar la información para los fines autorizados y bajo condiciones de confidencialidad y seguridad.
                </p>
                <p>
                  También podremos compartir información cuando sea requerido por autoridades competentes o por obligaciones legales aplicables.
                </p>
              </div>
            </section>

            {/* 5. Derechos */}
            <section id="derechos" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 05</span> DERECHOS DEL TITULAR DE LOS DATOS
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  De acuerdo con la legislación colombiana, usted tiene derecho a:
                </p>
                <ul className="space-y-2 mt-4 font-mono text-neutral-600 text-xs">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Conocer, actualizar y rectificar sus datos personales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Solicitar prueba de la autorización otorgada.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Ser informado sobre el uso de sus datos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Revocar la autorización y solicitar la eliminación de sus datos cuando sea procedente.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>Presentar consultas o reclamos relacionados con el tratamiento de su información personal.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 6. Seguridad */}
            <section id="seguridad" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 06</span> SEGURIDAD DE LA INFORMACIÓN
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  En MURREN implementamos medidas razonables de seguridad para proteger la información personal de accesos no autorizados, pérdidas, alteraciones o usos indebidos.
                </p>
                <p>
                  Sin embargo, ningún sistema de transmisión o almacenamiento de información es completamente seguro, por lo que no podemos garantizar seguridad absoluta.
                </p>
              </div>
            </section>

            {/* 7. Retencion */}
            <section id="retencion" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 07</span> RETENCIÓN DE DATOS
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  La información personal será almacenada únicamente durante el tiempo necesario para cumplir las finalidades descritas en esta política y las obligaciones legales correspondientes.
                </p>
              </div>
            </section>

            {/* 8. Menores */}
            <section id="menores" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 08</span> MENORES DE EDAD
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Nuestro sitio web no está dirigido a menores de edad. No recopilamos de manera intencional información personal de menores sin autorización de sus representantes legales.
                </p>
              </div>
            </section>

            {/* 9. Cambios */}
            <section id="cambios" className="scroll-mt-32 border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 09</span> CAMBIOS EN ESTA POLÍTICA
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  MURREN podrá actualizar esta Política de Privacidad en cualquier momento para reflejar cambios legales, operativos o comerciales.
                </p>
                <p>
                  Las modificaciones entrarán en vigencia una vez sean publicadas en el sitio web.
                </p>
              </div>
            </section>

            {/* 10. Contacto */}
            <section id="contacto" className="scroll-mt-32 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4 flex items-center gap-2">
                <span className="text-neutral-300 font-mono font-light text-sm">// 10</span> CONTACTO
              </h2>
              <div className="text-sm leading-relaxed text-neutral-600 space-y-4">
                <p>
                  Si tiene preguntas, solicitudes o reclamos relacionados con esta Política de Privacidad o el tratamiento de sus datos personales, puede contactarnos a través de:
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
