import { defineField, defineType } from 'sanity';

export const noticiaSchema = defineType({
  name: 'noticia',
  title: 'Noticia',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Etiqueta',
      type: 'string',
      description: 'Ej: NUEVO DROP, EVENTO, COLAB',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      description: 'Título principal de la noticia (en mayúsculas)',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Identificador único para la URL. Haz clic en Generate para crearlo automáticamente basado en el título.',
      options: {
        source: 'titulo',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'estado',
      title: 'Estado / Fecha',
      type: 'string',
      description: 'Ej: YA DISPONIBLE, PRÓXIMAMENTE, 24 / 06 / 2025',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcionCorta',
      title: 'Descripción corta',
      type: 'text',
      rows: 3,
      description: 'Resumen breve visible en tarjetas y previews (máx 160 caracteres)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'autor',
      title: 'Autor de la noticia',
      type: 'string',
      description: 'Nombre de quien escribe o publica la noticia (opcional)',
    }),
    defineField({
      name: 'cuerpo',
      title: 'Cuerpo del artículo (texto enriquecido)',
      type: 'array',
      description: 'Contenido completo del artículo. Puedes agregar párrafos, listas, negritas, imágenes extra, etc.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Título H2', value: 'h2' },
            { title: 'Título H3', value: 'h3' },
            { title: 'Cita', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
              { title: 'Subrayado', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Enlace',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        // Imágenes adicionales dentro del cuerpo
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de foto',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'galeria',
      title: 'Galería de imágenes',
      type: 'array',
      description: 'Sube varias imágenes para crear un carrusel o galería al final de la noticia',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL de Video (YouTube/Vimeo)',
      type: 'url',
      description: 'Si la noticia tiene un video principal, pega el link aquí',
    }),
    defineField({
      name: 'enlace',
      title: 'Enlace externo (opcional)',
      type: 'url',
      description: 'URL a donde lleva al hacer clic en la tarjeta. Si está vacío, abre Instagram.',
    }),
    defineField({
      name: 'destacada',
      title: '¿Es noticia destacada?',
      type: 'boolean',
      description: 'Las noticias destacadas aparecen primero en el home.',
      initialValue: false,
    }),
    defineField({
      name: 'fechaPublicacion',
      title: 'Fecha de publicación',
      type: 'datetime',
      options: { dateFormat: 'DD-MM-YYYY' },
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'tag',
      media: 'imagen',
    },
  },
});
