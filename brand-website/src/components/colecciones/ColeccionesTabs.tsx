"use client"

import { motion } from "framer-motion"

type Tab = "TODAS" | "NUEVAS" | "DESTACADAS" | "SS24" | "FW23" | "BASIC"

type ColeccionesTabsProps = {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const TABS: Tab[] = ["TODAS", "NUEVAS", "DESTACADAS", "SS24", "FW23", "BASIC"]

export default function ColeccionesTabs({ activeTab, onTabChange }: ColeccionesTabsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`relative px-6 py-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 border ${
            activeTab === tab
              ? "border-black text-white"
              : "border-transparent text-gray-500 hover:text-black hover:border-gray-300"
          }`}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="activeTabBackground"
              className="absolute inset-0 bg-black -z-10"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab}
        </button>
      ))}
    </div>
  )
}
