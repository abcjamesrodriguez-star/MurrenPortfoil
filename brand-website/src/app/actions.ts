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
