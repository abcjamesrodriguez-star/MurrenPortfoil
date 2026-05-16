"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from '@phosphor-icons/react';
import Image from 'next/image';
import image1 from '@/assets/Mockup.jpeg';

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-background border-b border-foreground/10 flex items-center">
      <Image 
        src={image1} 
        alt="Hero Background" 
        fill 
        sizes="100vw"
        priority
        className="object-cover absolute inset-0 z-0 pointer-events-none"
      />

      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <iframe 
          src="https://www.youtube.com/embed/62OqU61CxLM?autoplay=1&mute=1&controls=0&loop=1&playlist=62OqU61CxLM&playsinline=1" 
          className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] min-w-[100vw] min-h-[100vh] -translate-x-1/2 -translate-y-1/2"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        ></iframe>
      </div>

      {/* Overlay to ensure text legibility */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 flex flex-col items-start justify-center">
        
        {/* Text Content */}
        <div className="max-w-2xl relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            {/* Eyebrow */}
            <p className="text-xs tracking-widest uppercase mb-6 font-medium text-foreground/60">
              // STREETWEAR THAT<br />DEFIES THE ORDINARY
            </p>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.9] tracking-tighter mb-4 text-foreground">
              MURREN
            </h1>

            {/* Subline */}
            <p className="text-sm tracking-widest uppercase mb-12 font-medium">
              NUEVA COLECCIÓN DISPONIBLE
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-foreground text-background text-xs font-bold tracking-widest uppercase px-8 py-4 flex items-center justify-center gap-3 hover:opacity-90 transition-opacity">
                SHOP NOW <ArrowRight size={16} weight="bold" />
              </button>
              <button className="border border-foreground text-foreground text-xs font-bold tracking-widest uppercase px-8 py-4 flex items-center justify-center gap-3 hover:bg-foreground/5 transition-colors bg-background">
                <Play size={16} weight="fill" /> WATCH FILM
              </button>
            </div>
          </motion.div>
        </div>



      </div>

      {/* Right Scroll Indicator */}
      <motion.div 
        className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 text-foreground/50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase origin-center -rotate-90 whitespace-nowrap mb-8">
          SCROLL
        </span>
        <div className="w-px h-16 bg-foreground/30 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-foreground" />
        </div>
      </motion.div>
    </section>
  );
}
