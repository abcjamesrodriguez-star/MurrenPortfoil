"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { CartItem } from "@/types"
import { createCheckout } from "@/app/actions"

type CartContextType = {
  cartItems: CartItem[]
  isOpen: boolean
  isCheckingOut: boolean
  addToCart: (item: Omit<CartItem, "quantity">, quantity: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  openCart: () => void
  closeCart: () => void
  proceedToCheckout: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("murren_cart")
      if (stored) {
        setCartItems(JSON.parse(stored))
      }
    } catch (e) {
      console.error("Error reading cart from localStorage:", e)
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage when cartItems change, but only after hydration
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("murren_cart", JSON.stringify(cartItems))
      } catch (e) {
        console.error("Error saving cart to localStorage:", e)
      }
    }
  }, [cartItems, isHydrated])

  const addToCart = (newItem: Omit<CartItem, "quantity">, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id)
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...newItem, quantity }]
    })
    setIsOpen(true) // Auto-open cart drawer
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const proceedToCheckout = async () => {
    if (cartItems.length === 0) return
    setIsCheckingOut(true)
    try {
      // Map local items to Shopify line inputs
      const lines = cartItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }))
      
      const result = await createCheckout(lines)
      if (result.success && result.checkoutUrl) {
        // Redirect to Shopify checkout URL
        window.location.href = result.checkoutUrl
      } else {
        alert(result.error || "Ocurrió un error al crear el checkout. Inténtalo de nuevo.")
        setIsCheckingOut(false)
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Error de conexión. Inténtalo de nuevo.")
      setIsCheckingOut(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isOpen,
        isCheckingOut,
        addToCart,
        removeFromCart,
        updateQuantity,
        openCart,
        closeCart,
        proceedToCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
