import { noticiaSchema } from './schemas/noticia';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  basePath: '/studio',
  name: 'murren-studio',
  title: 'Murren Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool(),
  ],
  schema: {
    types: [noticiaSchema],
  },
});
