import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json({
      success: false,
      message: 'No Instagram token configured. Using local fallback.',
      data: []
    });
  }

  try {
    // LLamamos a la API de visualización básica de Instagram (válida para cuentas personales)
    // Se solicitan los campos necesarios: id, caption, media_url, permalink, timestamp, media_type
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${token}&limit=6`,
      {
        next: { revalidate: 3600 } // Guardar en caché por 1 hora para evitar saturar el límite de API
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Instagram API error (${response.status}):`, errorText);
      throw new Error(`Instagram API responded with status ${response.status}`);
    }

    const json = await response.json();
    
    if (!json.data || !Array.isArray(json.data)) {
      throw new Error('Invalid response format from Instagram API');
    }

    // Filtrar para mostrar solo imágenes y carruseles (evitar videos/reels de formato no compatible si no se desea, o soportar ambos)
    const posts = json.data
      .filter((item: any) => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM')
      .map((item: any) => {
        const caption = item.caption || '';
        
        // Extraemos el primer hashtag o palabra como Tag, por ejemplo "#MIF" o "NOTICIA"
        const words = caption.split(/\s+/);
        let tag = 'INSTAGRAM';
        for (const word of words) {
          if (word.startsWith('#')) {
            tag = word.toUpperCase();
            break;
          }
        }

        // Limpiamos los hashtags del título para que sea más limpio visualmente
        const cleanTitle = caption
          .replace(/#[a-zA-Z0-9_]+/g, '') // Quita hashtags
          .trim();

        const title = cleanTitle 
          ? (cleanTitle.substring(0, 40) + (cleanTitle.length > 40 ? '...' : '')) 
          : 'VER PUBLICACIÓN EN INSTAGRAM';

        // Formatear la fecha
        const dateStr = item.timestamp 
          ? new Date(item.timestamp).toLocaleDateString('es-CO', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })
          : 'RECIENTE';

        return {
          id: item.id,
          tag: tag,
          title: title,
          status: dateStr,
          image: item.media_url,
          permalink: item.permalink
        };
      });

    return NextResponse.json({
      success: true,
      data: posts
    });
  } catch (error: any) {
    console.error('Error fetching Instagram feed:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching feed',
      data: []
    });
  }
}
