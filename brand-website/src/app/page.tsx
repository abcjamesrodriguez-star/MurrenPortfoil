import React from 'react';
import Hero from '@/components/sections/Hero';
import NewsTicker from '@/components/sections/NewsTicker';
import NewsSection from '@/components/sections/NewsSection';
import Collection from '@/components/sections/Collection';
import FindMe from '@/components/sections/FindMe';
import { getCollections } from '@/lib/api';

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
