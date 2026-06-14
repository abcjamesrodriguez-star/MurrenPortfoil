import React from 'react';
import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import NewsTicker from '@/components/sections/NewsTicker';
import NewsSection from '@/components/sections/NewsSection';
import Collection from '@/components/sections/Collection';
import FindMe from '@/components/sections/FindMe';
import { getCollections } from '@/lib/api';

export const metadata: Metadata = {
  title: {
    absolute: "MURREN — Sitio Oficial | Streetwear Premium Bogotá"
  },
  description: "MURREN no es ropa. Es una forma de existir. Descubre nuestras colecciones de streetwear de alta calidad en Colombia: camisetas oversized, hoodies de diseño y prendas exclusivas.",
  alternates: {
    canonical: "https://murren.com.co"
  }
};

export default async function Home() {
  const collections = await getCollections();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <NewsTicker />
      <NewsSection />
      <Collection collections={collections} />
      <FindMe />
      {/* Other sections will be added here in subsequent phases */}
    </div>
  );
}
