"use client"

import { useEffect, useState } from "react"
import { Palette } from "@phosphor-icons/react"

type Theme = "noir" | "industrial"

const THEMES: { id: Theme; label: string; colors: string[] }[] = [
  {
    id: "noir",
    label: "NOIR",
    colors: ["#0a0a0a", "#1a1a1a", "#f5f5f5"],  // negro + negro suave + blanco
  },
  {
    id: "industrial",
    label: "INDUSTRIAL",
    colors: ["#121418", "#4699a1", "#8c6549"],   // oscuro + teal + cobre
  },
]

export default function ThemeSwitcher() {
  const [current, setCurrent] = useState<Theme>("industrial")
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Solo se ejecuta en el cliente — evita hydration mismatch
  useEffect(() => {
    const saved = (localStorage.getItem("murren-theme") as Theme) || "industrial"
    setCurrent(saved)
    document.documentElement.setAttribute("data-theme", saved)
    setMounted(true)
  }, [])

  if (!mounted) return null

  const applyTheme = (theme: Theme) => {
    setCurrent(theme)
    setOpen(false)
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("murren-theme", theme)
  }

  const activeTheme = THEMES.find((t) => t.id === current)!

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Cambiar tema de color"
      >
        <Palette size={14} />
        TEMA: {activeTheme.label}
        {/* Swatches */}
        <span className="flex items-center gap-1 ml-1">
          {activeTheme.colors.map((c) => (
            <span
              key={c}
              className="inline-block w-3 h-3 rounded-full border border-white/20"
              style={{ backgroundColor: c }}
            />
          ))}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute bottom-8 right-0 min-w-[200px] border z-50 overflow-hidden"
          style={{
            backgroundColor: "var(--color-surface-inverse)",
            borderColor: "var(--color-border-inverse)",
          }}
        >
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => applyTheme(theme.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{
                color: "var(--color-text-inverse)",
                backgroundColor:
                  current === theme.id
                    ? "var(--color-border-inverse)"
                    : "transparent",
              }}
            >
              <span>{theme.label}</span>
              <span className="flex items-center gap-1">
                {theme.colors.map((c) => (
                  <span
                    key={c}
                    className="inline-block w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </span>
            </button>
          ))}

          {/* Label */}
          <div
            className="px-4 py-2 border-t"
            style={{
              borderColor: "var(--color-border-inverse)",
              color: "var(--color-text-inverse-muted)",
            }}
          >
            <p className="text-[9px] font-mono uppercase tracking-widest opacity-60">
              // MODO DE PRUEBA — SOLO DEV
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
