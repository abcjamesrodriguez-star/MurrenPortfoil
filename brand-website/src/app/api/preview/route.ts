import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug') ?? '/';

  // Validación básica del secret
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Token inválido', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(slug);
}
