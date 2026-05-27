"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

type ProductoContextType = {
  tallaSeleccionada: string | null
  setTallaSeleccionada: (talla: string | null) => void
  colorSeleccionado: string | null
  setColorSeleccionado: (color: string | null) => void
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
}

const ProductoContext = createContext<ProductoContextType | undefined>(undefined)

export function ProductoProvider({ children }: { children: ReactNode }) {
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string | null>(null)
  const [colorSeleccionado, setColorSeleccionado] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <ProductoContext.Provider
      value={{
        tallaSeleccionada,
        setTallaSeleccionada,
        colorSeleccionado,
        setColorSeleccionado,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </ProductoContext.Provider>
  )
}

export function useProductoContext() {
  const context = useContext(ProductoContext)
  if (context === undefined) {
    throw new Error("useProductoContext must be used within a ProductoProvider")
  }
  return context
}
