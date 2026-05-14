"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus } from '@phosphor-icons/react';
import { newsData } from '@/lib/data';

export default function NewsSection() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-8 md:py-12 bg-background text-foreground">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-12 border-b border-foreground/10 pb-4">
        <h2 className="text-sm font-bold tracking-widest uppercase">
          // NOTICIAS
        </h2>
        <button className="text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-1">
          VER TODAS <Plus size={12} weight="bold" />
        </button>
      </div>

      {/* Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {newsData.map((news) => (
          <motion.article 
            key={news.id} 
            className="flex flex-col group cursor-pointer"
            variants={itemVariants}
          >
            {/* Image Container */}
            <div className="relative w-full aspect-square md:aspect-[4/5] bg-foreground/5 overflow-hidden border border-foreground/10 border-b-0">
              <Image
                src={news.image}
                alt={news.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 border border-foreground/10 p-6 rounded-b-3xl">
              <span className="text-[10px] font-bold tracking-widest uppercase mb-2 text-foreground/60">
                {news.tag}
              </span>
              <h3 className="text-xl font-bold tracking-tighter uppercase mb-8 leading-none">
                {news.title}
              </h3>
              
              <div className="mt-auto flex justify-between items-end pt-4 border-t border-foreground/10">
                <span className="text-xs font-medium tracking-widest uppercase">
                  {news.status}
                </span>
                <Plus size={16} weight="bold" className="text-foreground/50 group-hover:text-foreground transition-colors" />
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
