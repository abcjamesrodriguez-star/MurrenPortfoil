import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sanityClient, singleNewsQuery } from '@/lib/sanity';
import PortableTextRenderer from '@/components/sections/PortableTextRenderer';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import GaleriaCarrusel from '@/components/sections/GaleriaCarrusel';

export const revalidate = 60;

type SanityNoticiaDetalle = {
  _id: string;
  tag: string;
  titulo: string;
  slug: string;
  estado: string;
  imagen: string | null;
  cuerpo: any[] | null;
  autor?: string;
  galeria?: string[] | null;
  videoUrl?: string;
  enlace?: string;
  fechaPublicacion: string;
};

async function getNewsBySlug(slug: string): Promise<SanityNoticiaDetalle | null> {
  try {
    const data = await sanityClient.fetch<SanityNoticiaDetalle>(singleNewsQuery, { slug });
    return data;
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    return null;
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  // En Next.js 15+ params es una Promise
  const resolvedParams = await params;
  const article = await getNewsBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="w-full min-h-screen bg-background text-foreground pb-24">
      
      {/* Header Visual con la Imagen Principal */}
      <div className="relative w-full h-[50vh] md:h-[70vh] bg-foreground/5 overflow-hidden">
        {article.imagen && (
          <Image
            src={article.imagen}
            alt={article.titulo}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Metadatos sobre la imagen */}
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 lg:px-24 pb-12 flex flex-col">
          <div className="flex gap-4 items-center mb-4">
            <span className="bg-foreground text-background px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
              {article.tag}
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-foreground/80 bg-background/50 backdrop-blur-md px-3 py-1">
              {new Date(article.fechaPublicacion).toLocaleDateString('es-CO')}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase max-w-5xl leading-[0.9]">
            {article.titulo}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-0 pt-12">
        {/* Back Button & Status */}
        <div className="flex justify-between items-center mb-12 border-b border-foreground/10 pb-6">
          <Link 
            href="/noticias" 
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} weight="bold" /> VOLVER AL JOURNAL
          </Link>
          <span className="text-xs font-bold tracking-widest uppercase text-foreground/60">
            // {article.estado}
          </span>
        </div>

        {/* Autor */}
        {article.autor && (
          <div className="mb-12">
            <p className="text-sm font-bold tracking-widest uppercase text-foreground/50">
              ESCRITO POR: <span className="text-foreground">{article.autor}</span>
            </p>
          </div>
        )}

        {/* Contenido (Rich Text) */}
        <div className="w-full">
          {article.cuerpo && article.cuerpo.length > 0 ? (
            <PortableTextRenderer value={article.cuerpo} />
          ) : (
            <p className="text-foreground/50 text-lg italic text-center py-20 font-sans">
              No hay contenido adicional para esta noticia.
            </p>
          )}
        </div>

        {/* Video Principal */}
        {article.videoUrl && (
          <div className="mt-16 pt-8 border-t border-foreground/10">
            <h3 className="text-sm font-bold tracking-widest uppercase text-foreground/50 mb-6">
              VIDEO DESTACADO
            </h3>
            <div className="relative w-full aspect-video bg-foreground/5 overflow-hidden">
              <iframe 
                src={article.videoUrl.replace("watch?v=", "embed/")} 
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        )}

        {/* Galería de Imágenes (Carrusel) */}
        {article.galeria && article.galeria.length > 0 && (
          <div className="mt-16 pt-8 border-t border-foreground/10">
            <h3 className="text-sm font-bold tracking-widest uppercase text-foreground/50 mb-6">
              GALERÍA
            </h3>
            <GaleriaCarrusel images={article.galeria} />
          </div>
        )}

        {/* Link Externo Opcional (ej: Instagram) */}
        {article.enlace && (
          <div className="mt-16 pt-8 border-t border-foreground/10 flex justify-center">
            <a 
              href={article.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground text-foreground px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              VER MÁS INFO / INSTAGRAM
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
