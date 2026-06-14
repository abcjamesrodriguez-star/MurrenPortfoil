import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { sanityClient, allNewsQuery } from '@/lib/sanity';
import { Plus } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: "Journal",
  description: "Entérate de las últimas noticias, drops exclusivos, eventos y la cultura urbana que rodea el universo MURREN.",
  alternates: {
    canonical: "https://murren.com.co/noticias"
  },
  openGraph: {
    type: "website",
    url: "https://murren.com.co/noticias",
    title: "Journal — MURREN",
    description: "Entérate de las últimas noticias, drops exclusivos, eventos y la cultura urbana de MURREN.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Journal MURREN",
      }
    ]
  }
};

export const revalidate = 60; // Revalida cada 60 segundos

type SanityNoticia = {
  _id: string;
  tag: string;
  titulo: string;
  slug: string | null;
  estado: string;
  imagen: string | null;
  descripcionCorta: string | null;
  enlace?: string;
  fechaPublicacion: string;
};

async function getAllNews(): Promise<SanityNoticia[]> {
  try {
    const data = await sanityClient.fetch<SanityNoticia[]>(allNewsQuery);
    return data ?? [];
  } catch (error) {
    console.error('Error fetching all news from Sanity:', error);
    return [];
  }
}

export default async function NoticiasPage() {
  const news = await getAllNews();

  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-12 pb-24 px-6 md:px-12 lg:px-24">
      {/* Header */}
      <div className="mb-16 border-b border-foreground/10 pb-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4">
          // JOURNAL
        </h1>
        <p className="text-sm font-medium tracking-widest text-foreground/60 uppercase max-w-2xl">
          NOTICIAS, EVENTOS, DROPS Y LA EVOLUCIÓN CONSTANTE DEL UNIVERSO MURREN.
        </p>
      </div>

      {/* Grid de Noticias */}
      {news.length === 0 ? (
        <div className="text-center py-20 text-foreground/50 text-sm font-bold tracking-widest uppercase">
          NO HAY NOTICIAS PUBLICADAS AÚN.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {news.map((item) => {
            // Si tiene link externo configurado, usa ese. Si no, usa el slug interno.
            const href = item.slug ? `/noticias/${item.slug}` : (item.enlace || '#');
            const isExternal = !item.slug && !!item.enlace;

            return (
              <Link 
                key={item._id} 
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="flex flex-col group cursor-pointer h-full border border-foreground/10 bg-background hover:bg-foreground/5 transition-colors duration-500 rounded-b-xl overflow-hidden"
              >
                {/* Image Container - Aspecto Video para Banners */}
                <div className="relative w-full aspect-video bg-foreground/5 overflow-hidden border-b border-foreground/10">
                  {item.imagen ? (
                    <Image
                      src={item.imagen}
                      alt={item.titulo}
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
                    <span className="text-[10px] font-bold tracking-widest uppercase text-foreground/40">
                      {new Date(item.fechaPublicacion).toLocaleDateString('es-CO', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </span>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold tracking-tighter uppercase mb-4 leading-none">
                    {item.titulo}
                  </h3>
                  
                  {item.descripcionCorta && (
                    <p className="text-sm font-medium text-foreground/70 mb-8 line-clamp-2 leading-relaxed">
                      {item.descripcionCorta}
                    </p>
                  )}

                  <div className="mt-auto flex justify-between items-end pt-4 border-t border-foreground/10">
                    <span className="text-xs font-medium tracking-widest uppercase text-foreground/50 group-hover:text-foreground transition-colors">
                      {item.estado}
                    </span>
                    <Plus size={16} weight="bold" className="text-foreground/50 group-hover:text-foreground transition-colors group-hover:rotate-90 duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
