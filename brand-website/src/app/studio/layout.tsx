import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Murren Studio — CMS',
};

// El studio necesita su propio layout sin Navbar/Footer/CartProvider
// para que sus controles internos (botón Publicar, preview, etc.) sean visibles
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
