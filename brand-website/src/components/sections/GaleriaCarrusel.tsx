'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

interface GaleriaCarruselProps {
  images: string[];
}

export default function GaleriaCarrusel({ images }: GaleriaCarruselProps) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full">
      {/* Imagen Principal */}
      <div className="relative w-full aspect-[4/3] md:aspect-video bg-foreground/5 overflow-hidden rounded-sm">
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={imgUrl}
              alt={`Galería imagen ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}

        {/* Flecha Izquierda */}
        <button
          onClick={prev}
          aria-label="Imagen anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
        >
          <ArrowLeft size={16} weight="bold" />
        </button>

        {/* Flecha Derecha */}
        <button
          onClick={next}
          aria-label="Imagen siguiente"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
        >
          <ArrowRight size={16} weight="bold" />
        </button>

        {/* Contador */}
        <div className="absolute bottom-4 right-4 z-20 bg-background/80 backdrop-blur-sm border border-foreground/20 px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-foreground/80">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {images.map((imgUrl, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-sm border-2 transition-all duration-300 ${
              idx === current
                ? 'border-foreground opacity-100'
                : 'border-transparent opacity-40 hover:opacity-70'
            }`}
          >
            <Image
              src={imgUrl}
              alt={`Miniatura ${idx + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
