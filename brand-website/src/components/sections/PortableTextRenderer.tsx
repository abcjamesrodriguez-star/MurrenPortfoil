import React from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

// Componentes personalizados para renderizar el rich text de Sanity con clases de Tailwind
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full aspect-video my-8 border border-foreground/10 bg-foreground/5">
          <Image
            src={urlFor(value).url()}
            alt={value.caption || 'Imagen del artículo'}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
          {value.caption && (
            <p className="absolute bottom-0 left-0 w-full bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium tracking-widest p-2 text-center uppercase">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6 font-sans">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase mt-12 mb-6 text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold tracking-tighter uppercase mt-8 mb-4 text-foreground">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-foreground pl-6 my-8 py-2 text-xl italic text-foreground/70 font-sans">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u className="underline underline-offset-4">{children}</u>,
    link: ({ children, value }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a 
          href={value?.href} 
          target={target} 
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="underline decoration-foreground/30 hover:decoration-foreground underline-offset-4 font-medium transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-none pl-0 my-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 my-6 space-y-2 text-foreground/80 font-sans">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-6 text-foreground/80 font-sans text-base md:text-lg">
        <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 bg-foreground rounded-none"></span>
        {children}
      </li>
    ),
  },
};

interface PortableTextRendererProps {
  value: any[];
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
