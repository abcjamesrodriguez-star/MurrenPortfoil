import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-06-10',
  useCdn: true,
};

export const sanityClient = createClient(config);

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── GROQ Queries ────────────────────────────────────────────────────────────

/** Trae las 3 noticias más recientes para el home */
export const newsSectionQuery = `
  *[_type == "noticia"] | order(fechaPublicacion desc)[0...3] {
    _id,
    tag,
    titulo,
    "slug": slug.current,
    estado,
    "imagen": imagen.asset->url,
    descripcionCorta,
    enlace,
    fechaPublicacion
  }
`;

/** Trae todas las noticias para la página de archivo /noticias */
export const allNewsQuery = `
  *[_type == "noticia"] | order(fechaPublicacion desc) {
    _id,
    tag,
    titulo,
    "slug": slug.current,
    estado,
    "imagen": imagen.asset->url,
    descripcionCorta,
    enlace,
    fechaPublicacion
  }
`;

/** Trae una noticia específica por su slug */
export const singleNewsQuery = `
  *[_type == "noticia" && slug.current == $slug][0] {
    _id,
    tag,
    titulo,
    "slug": slug.current,
    estado,
    "imagen": imagen.asset->url,
    autor,
    cuerpo,
    "galeria": galeria[].asset->url,
    videoUrl,
    enlace,
    fechaPublicacion
  }
`;
