'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error capturado por la raíz:', error)
  }, [error])

  // Intentar parsear el código HTTP y el mensaje
  let code = '500'
  let message = error?.message || 'Ocurrió un error inesperado al procesar la solicitud.'
  
  const match = error?.message?.match(/^(\d{3}):\s*(.*)$/)
  if (match) {
    code = match[1]
    message = match[2]
  }

  // Textos y descripciones según el código
  let title = 'ERROR DE CARGA'
  let explanation = 'No se pudieron recuperar los datos de la tienda de Shopify.'

  if (code === '403') {
    title = 'ACCESO DENEGADO (403)'
    explanation = 'El Token de Acceso de Storefront no tiene permisos (scopes) configurados correctamente o es inválido. Por favor, revise las variables de entorno en su panel de administración y su archivo .env.local.'
  } else if (code === '404') {
    title = 'RECURSO NO ENCONTRADO (404)'
    explanation = 'El recurso solicitado no existe en la base de datos de Shopify.'
  } else if (code === '500') {
    title = 'ERROR INTERNO DE LA API (500)'
    explanation = 'Hubo un error al establecer la comunicación con el servidor de Shopify o las variables de entorno no están presentes.'
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 bg-background text-foreground text-center">
      <div className="max-w-md w-full border border-neutral-200 dark:border-neutral-800 p-8 md:p-12 flex flex-col items-center surface-subtle">
        <span className="text-[10px] tracking-[0.2em] text-neutral-500 font-mono mb-4 uppercase">
          // ERROR DETECTADO
        </span>
        <h1 className="text-8xl font-black tracking-tighter mb-4 font-mono text-primary">
          {code}
        </h1>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-primary">
          {title}
        </h2>
        <p className="text-xs text-secondary leading-relaxed mb-8">
          {message}
          <span className="block mt-4 text-muted-brand border-t border-neutral-200 dark:border-neutral-800 pt-4">
            {explanation}
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={() => reset()}
            className="flex-1 py-3 bg-foreground hover:bg-foreground/80 text-background text-[10px] font-bold uppercase tracking-widest transition-colors border border-foreground cursor-pointer"
          >
            REINTENTAR
          </button>
          <a
            href="/"
            className="flex-1 py-3 bg-background hover:bg-surface-subtle text-foreground text-[10px] font-bold uppercase tracking-widest transition-colors border border-foreground text-center cursor-pointer"
          >
            PÁGINA DE INICIO
          </a>
        </div>
      </div>
    </div>
  )
}
