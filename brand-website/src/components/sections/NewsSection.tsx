"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus } from '@phosphor-icons/react';
import { newsData } from '@/lib/data';
import { NewsItem } from '@/types';

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>(newsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstagramFeed() {
      try {
        const response = await fetch('/api/instagram');
        const result = await response.json();
        
        if (result.success && result.data && result.data.length > 0) {
          // Tomar los primeros 3 posts de Instagram
          setNews(result.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error loading Instagram feed, using fallback:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramFeed();
  }, []);

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

  const handleArticleClick = (permalink?: string) => {
    const url = permalink || 'https://www.instagram.com/murren_co/';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-8 md:py-12 bg-background text-foreground">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-12 border-b border-foreground/10 pb-4">
        <h2 className="text-sm font-bold tracking-widest uppercase">
          // INSTAGRAM FEED
        </h2>
        <button 
          onClick={() => handleArticleClick()}
          className="text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity flex items-center gap-1"
        >
          SEGUIR @MURREN_CO <Plus size={12} weight="bold" />
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
        {news.map((item) => (
          <motion.article 
            key={item.id} 
            onClick={() => handleArticleClick(item.permalink)}
            className="flex flex-col group cursor-pointer"
            variants={itemVariants}
          >
            {/* Image Container */}
            <div className="relative w-full aspect-square md:aspect-[4/5] bg-foreground/5 overflow-hidden border border-foreground/10 border-b-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 border border-foreground/10 p-6 rounded-b-3xl">
              <span className="text-[10px] font-bold tracking-widest uppercase mb-2 text-foreground/60">
                {item.tag}
              </span>
              <h3 className="text-xl font-bold tracking-tighter uppercase mb-8 leading-none min-h-[40px] line-clamp-2">
                {item.title}
              </h3>
              
              <div className="mt-auto flex justify-between items-end pt-4 border-t border-foreground/10">
                <span className="text-xs font-medium tracking-widest uppercase text-foreground/50 group-hover:text-foreground transition-colors">
                  {item.status}
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
