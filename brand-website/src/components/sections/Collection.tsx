"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus } from '@phosphor-icons/react';
import { Collection as CollectionType } from '@/types';

export default function Collection({ collections }: { collections: CollectionType[] }) {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-8 md:py-12 bg-background text-foreground">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-12 border-b border-foreground/10 pb-4">
        <h2 className="text-sm font-bold tracking-widest uppercase">
          // ÚLTIMAS COLECCIONES
        </h2>
        <Link href="/colecciones" className="text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-1">
          VER TODAS <Plus size={12} weight="bold" />
        </Link>
      </div>

      {/* Grid of 5 Products */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {collections.slice(0, 5).map((item) => (
          <motion.article 
            key={item.id} 
            className="flex flex-col group cursor-pointer"
            variants={itemVariants}
          >
            {/* Image Container */}
            <Link href={`/colecciones/${item.slug}`} className="relative w-full aspect-[3/4] bg-foreground/5 overflow-hidden border border-foreground/10 border-b-0 block">
              <Image
                src={item.imagen}
                alt={item.nombre}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
              
              {/* Floating Plus Icon */}
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-background flex items-center justify-center text-foreground z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <Plus size={12} weight="bold" />
              </div>
            </Link>

            {/* Content Container */}
            <div className="flex flex-col items-center justify-center border border-foreground/10 p-4 rounded-b-3xl text-center bg-background group-hover:bg-foreground/5 transition-colors">
              <h3 className="text-xs font-bold tracking-widest uppercase mb-2 line-clamp-1">
                {item.nombre}
              </h3>
              <span className="text-[10px] font-medium tracking-widest text-foreground/50 uppercase">
                {item.temporada}
              </span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
