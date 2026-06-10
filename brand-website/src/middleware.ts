import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Solo protege las rutas del Studio
  if (!req.nextUrl.pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get('authorization');

  if (authHeader) {
    // El header llega como "Basic base64(usuario:contraseña)"
    const base64 = authHeader.split(' ')[1] ?? '';
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');
    const [user, pass] = decoded.split(':');

    const validUser = process.env.STUDIO_USERNAME ?? 'admin';
    const validPass = process.env.STUDIO_PASSWORD ?? 'murren2026';

    if (user === validUser && pass === validPass) {
      return NextResponse.next();
    }
  }

  // Si no hay credenciales o son incorrectas, devolvemos 401 con el challenge
  return new NextResponse('Acceso denegado', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Murren Studio - Acceso Restringido"',
    },
  });
}

export const config = {
  matcher: ['/studio/:path*'],
};
