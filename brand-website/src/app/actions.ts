"use server"

import { createShopifyCart } from "@/lib/shopify"

export async function createCheckout(lines: { variantId: string; quantity: number }[]) {
  try {
    const cart = await createShopifyCart(lines)
    if (!cart) {
      return { success: false, error: "No se pudo crear el carrito en Shopify" }
    }
    return { success: true, checkoutUrl: cart.checkoutUrl }
  } catch (error: any) {
    console.error("Error creating checkout:", error)
    return { success: false, error: error.message || "Error al conectar con Shopify" }
  }
}

export async function enviarContactoEmail(formData: {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.RESEND_TO_EMAIL || "murrenbygeral@gmail.com"
  
  if (!apiKey) {
    console.error("Error: RESEND_API_KEY no está configurado en las variables de entorno.")
    return { success: false, error: "La configuración de correo no está lista. Por favor verifica las variables de entorno." }
  }

  // Obtener fecha actual en formato legible (Hora de Colombia)
  const fechaEnvio = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    dateStyle: "long",
    timeStyle: "short"
  })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://murren.com.co"
  // Si en producción usan un PNG para máxima compatibilidad con Gmail, se puede cambiar aquí
  const logoUrl = `${siteUrl}/LogoUnitono.svg`

  // Asunto bien estructurado y fácil de filtrar en Gmail
  const subjectText = `🔔 NUEVO PQRS: [${formData.asunto}] - De: ${formData.nombre}`

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: "🚨 Murren PQRS <onboarding@resend.dev>",
        to: toEmail,
        reply_to: formData.email,
        subject: subjectText,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9f9f9; padding: 50px 20px; color: #111111; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5e5; padding: 40px 35px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
              
              <!-- Cabecera Minimalista Centrada -->
              <div style="text-align: center; border-bottom: 1px solid #eeeeee; padding-bottom: 25px; margin-bottom: 30px;">
                <h1 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; color: #000000; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">MURREN</h1>
                <span style="color: #888888; font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 600; display: block; margin-top: 8px;">Gestión de PQRS</span>
              </div>

              <!-- Detalles de la Solicitud -->
              <div style="margin-bottom: 30px; font-size: 14px;">
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; color: #888888; font-size: 10px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; width: 35%; border-bottom: 1px solid #f9f9f9;">Categoría:</td>
                    <td style="padding: 12px 0; color: #111111; font-weight: 600; border-bottom: 1px solid #f9f9f9;">${formData.asunto}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #888888; font-size: 10px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; border-bottom: 1px solid #f9f9f9;">Remitente:</td>
                    <td style="padding: 12px 0; color: #111111; font-weight: 600; border-bottom: 1px solid #f9f9f9;">${formData.nombre}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #888888; font-size: 10px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; border-bottom: 1px solid #f9f9f9;">Email Contacto:</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f9f9f9;">
                      <a href="mailto:${formData.email}" style="color: #000000; font-weight: 600; text-decoration: underline;">${formData.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #888888; font-size: 10px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; border-bottom: 1px solid #f9f9f9;">Fecha Envío:</td>
                    <td style="padding: 12px 0; color: #555555; border-bottom: 1px solid #f9f9f9;">${fechaEnvio}</td>
                  </tr>
                </table>

              </div>

              <!-- Mensaje Recibido -->
              <div style="margin-bottom: 35px; border-top: 1px solid #eeeeee; padding-top: 25px;">
                <span style="color: #888888; font-size: 10px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; display: block; margin-bottom: 12px;">Mensaje del Cliente:</span>
                <div style="background-color: #f7f7f7; border: 1px solid #eeeeee; padding: 20px; border-radius: 4px; font-size: 14px; color: #333333; font-style: italic; white-space: pre-wrap; line-height: 1.6;">
                  "${formData.mensaje}"
                </div>
              </div>

              <!-- Botón de Acción Elegante -->
              <div style="text-align: center; margin: 35px 0 10px 0;">
                <a href="mailto:${formData.email}" style="background-color: #000000; color: #ffffff; text-decoration: none; padding: 15px 35px; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; display: inline-block; border-radius: 2px;">
                  Responder al Mensaje
                </a>
              </div>

              <!-- Pie de Página -->
              <div style="border-top: 1px solid #eeeeee; padding-top: 25px; margin-top: 40px; text-align: center;">
                <p style="font-size: 11px; color: #888888; margin: 0 0 15px 0; line-height: 1.5;">
                  Este es un correo automático de notificación generado por el sistema de PQRS de Murren.<br/>
                  Para comunicarte con el cliente, puedes responder directamente a este correo.
                </p>
                <div style="font-size: 11px; font-weight: bold; letter-spacing: 1px;">
                  <a href="${siteUrl}" style="color: #000000; text-decoration: none; margin: 0 10px;">TIENDA</a> |
                  <a href="https://instagram.com" style="color: #000000; text-decoration: none; margin: 0 10px;">INSTAGRAM</a> |
                  <a href="${siteUrl}/privacidad" style="color: #000000; text-decoration: none; margin: 0 10px;">PRIVACIDAD</a>
                </div>
              </div>

            </div>
          </div>
        `
      })
    })

    const data = await res.json()
    if (!res.ok) {
      console.error("Error de Resend:", data)
      return { success: false, error: data.message || "Error al enviar el correo a través de Resend." }
    }

    return { success: true }
  } catch (error: any) {
    console.error("Error en enviarContactoEmail:", error)
    return { success: false, error: "Ocurrió un error inesperado al enviar el mensaje de correo." }
  }
}
