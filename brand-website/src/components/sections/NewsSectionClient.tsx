'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus } from '@phosphor-icons/react';

type NewsDisplayItem = {
  id: string | number;
  tag: string;
  title: string;
  status: string;
  image: string;
  slug?: string;
  description?: string;
  permalink?: string;
  date?: string;
};

interface NewsSectionClientProps {
  news: NewsDisplayItem[];
}

export default function NewsSectionClient({ news }: NewsSectionClientProps) {
  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-8 md:py-12 bg-background text-foreground">

      {/* Header */}
      <div className="flex justify-between items-end mb-12 border-b border-foreground/10 pb-4">
        <h2 className="text-sm font-bold tracking-widest uppercase">
          // NOTICIAS
        </h2>
        <Link
          href="/noticias"
          className="text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-1"
        >
          VER TODO EL JOURNAL <Plus size={12} weight="bold" />
        </Link>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        {news.map((item) => {
          // Si tiene slug, es de Sanity y va al artículo. Si no, va al permalink estático de Instagram.
          const href = item.slug ? `/noticias/${item.slug}` : (item.permalink || 'https://www.instagram.com/murren_co/');
          const isExternal = !item.slug;

          return (
          <motion.div
            key={item.id}
            variants={itemVariants}
          >
            <Link
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="flex flex-col group cursor-pointer h-full border border-foreground/10 bg-background hover:bg-foreground/5 transition-colors duration-500 rounded-b-xl overflow-hidden"
            >
            {/* Image Container - Aspecto Video para Banners */}
            <div className="relative w-full aspect-video bg-foreground/5 overflow-hidden border-b border-foreground/10">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-foreground/20">
                  SIN IMAGEN
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-1 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-foreground/60 block">
                  {item.tag}
                </span>
                {item.date && (
                  <span className="text-[10px] font-bold tracking-widest uppercase text-foreground/40">
                    {new Date(item.date).toLocaleDateString('es-CO', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </span>
                )}
              </div>
              <h3 className="text-xl lg:text-2xl font-bold tracking-tighter uppercase mb-4 leading-none">
                {item.title}
              </h3>
              
              {item.description && (
                <p className="text-sm font-medium text-foreground/70 mb-8 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}

              <div className="mt-auto flex justify-between items-end pt-4 border-t border-foreground/10">
                <span className="text-xs font-medium tracking-widest uppercase text-foreground/50 group-hover:text-foreground transition-colors">
                  {item.status}
                </span>
                <Plus size={16} weight="bold" className="text-foreground/50 group-hover:text-foreground transition-colors group-hover:rotate-90 duration-300" />
              </div>
            </div>
            </Link>
          </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
