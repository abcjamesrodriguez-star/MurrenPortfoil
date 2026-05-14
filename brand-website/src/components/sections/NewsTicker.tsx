"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function NewsTicker() {
  // Utilizamos un bloque de texto que se repite para generar el efecto de scroll infinito
  const messages = [
    "NUEVA COLECCIÓN DISPONIBLE",
    "ENVÍOS GRATIS EN COMPRAS SUPERIORES A $200.000 COP",
    "STREETWEAR THAT DEFIES THE ORDINARY",
    "LIMITED EDITION DROPS",
    "JOIN THE FLOW"
  ];
  
  // Repetimos los mensajes varias veces para asegurar que llenen el ancho de la pantalla holgadamente
  const tickerItems = [...messages, ...messages, ...messages, ...messages];

  return (
    <div className="w-full bg-foreground text-background py-4 overflow-hidden flex whitespace-nowrap border-y border-foreground/10">
      <motion.div
        className="flex gap-12 text-sm font-bold tracking-widest uppercase items-center pl-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 75, repeat: Infinity }}
      >
        {/* Contenedor doble para lograr el scroll infinito sin cortes */}
        <div className="flex gap-12">
          {tickerItems.map((msg, idx) => (
            <div key={`ticker-1-${idx}`} className="flex items-center gap-12">
              <span>{msg}</span>
              <span>//</span>
            </div>
          ))}
        </div>
        <div className="flex gap-12">
          {tickerItems.map((msg, idx) => (
            <div key={`ticker-2-${idx}`} className="flex items-center gap-12">
              <span>{msg}</span>
              <span>//</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
