import React from 'react';
import { draftMode } from 'next/headers';
import { sanityClient, newsSectionQuery } from '@/lib/sanity';
import NewsSectionClient from './NewsSectionClient';
import { newsData } from '@/lib/data';

type SanityNoticia = {
  _id: string;
  tag: string;
  titulo: string;
  slug: string | null;
  estado: string;
  imagen: string | null;
  descripcionCorta?: string;
  enlace?: string;
  fechaPublicacion?: string;
};

async function getNews(isDraft: boolean): Promise<SanityNoticia[]> {
  try {
    // En modo draft, usamos un cliente sin CDN para ver borradores
    const client = isDraft
      ? sanityClient.withConfig({ useCdn: false, perspective: 'previewDrafts' })
      : sanityClient;

    const data = await client.fetch<SanityNoticia[]>(
      newsSectionQuery,
      {},
      { cache: 'no-store' } // Forzar no caché para que veas el cambio instantáneo
    );
    return data ?? [];
  } catch (error) {
    console.error('Error fetching news from Sanity:', error);
    return [];
  }
}

export default async function NewsSection() {
  const { isEnabled: isDraft } = await draftMode();
  const sanityNews = await getNews(isDraft);

  const hasRealNews = sanityNews.length > 0;

  const news = hasRealNews
    ? sanityNews.map((item) => ({
        id: item._id,
        tag: item.tag,
        title: item.titulo,
        status: item.estado,
        image: item.imagen ?? '',
        slug: item.slug ?? undefined,
        description: item.descripcionCorta,
        permalink: item.enlace,
        date: item.fechaPublicacion,
      }))
    : newsData.map((item) => ({
        id: item.id,
        tag: item.tag,
        title: item.title,
        status: item.status,
        image: typeof item.image === 'string' ? item.image : (item.image as { src: string }).src,
        description: undefined,
        permalink: item.permalink,
        date: undefined,
      }));

  return (
    <>
      {/* Banner de modo preview */}
      {isDraft && (
        <div className="w-full bg-yellow-400 text-black text-center py-2 px-4 text-xs font-bold tracking-widest uppercase z-50">
          👁 MODO PREVIEW ACTIVO — Estás viendo borradores.{' '}
          <a href="/api/preview-exit" className="underline hover:no-underline">
            Salir del preview
          </a>
        </div>
      )}
      <NewsSectionClient news={news} />
    </>
  );
}
