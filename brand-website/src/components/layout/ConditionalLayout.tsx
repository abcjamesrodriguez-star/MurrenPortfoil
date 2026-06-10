'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { Category } from '@/types';

interface ConditionalLayoutProps {
  children: React.ReactNode;
  categories: Category[];
}

export default function ConditionalLayout({ children, categories }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if we are in the studio route or its sub-routes
  const isStudio = pathname?.includes('/studio') || 
                   pathname?.includes('/structure') || 
                   pathname?.includes('/intent') ||
                   (typeof window !== 'undefined' && (
                     window.location.pathname.includes('/studio') || 
                     window.location.pathname.includes('/structure') || 
                     window.location.pathname.includes('/intent')
                   ));
  // Para evitar hydration mismatch, si no estamos seguros renderizamos solo children (o un fallback)
  // Pero Sanity Studio inyecta CSS global, así que es vital no renderizar Navbar/Footer si es el studio
  if (isStudio) {
    return (
      <div className="w-full h-screen m-0 p-0 overflow-hidden bg-[#101112]">
        {children}
      </div>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar categories={categories} />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
