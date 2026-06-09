"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingCart, CaretDown } from '@phosphor-icons/react';
import { navigationLinks } from '@/lib/data';
import { Category } from '@/types';
import { useCart } from "@/components/cart/CartContext";

export default function Navbar({ categories = [] }: { categories?: Category[] }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { openCart, cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const finalLinks = navigationLinks.map(link => {
    if (link.label === 'CATEGORÍAS' && categories.length > 0) {
      return {
        ...link,
        dropdown: categories.map(c => ({
          label: c.nombre.toUpperCase(),
          href: `/categorias/${c.slug}`
        }))
      };
    }
    return link;
  });

  const isHome = pathname === '/';
  const isScrolledOrNotHome = scrolled || !isHome;
  const showGiantLogo = isHome && !scrolled;

  return (
    <motion.nav
      initial={{ 
        backgroundColor: 'rgba(0,0,0,0)', 
        borderColor: 'rgba(0,0,0,0)', 
        top: 32,
        paddingTop: '24px',
        paddingBottom: '24px'
      }}
      animate={{ 
        backgroundColor: isScrolledOrNotHome ? 'rgba(10, 10, 10, 0.96)' : 'rgba(0,0,0,0)',
        borderColor: isScrolledOrNotHome ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0)',
        top: scrolled ? 0 : 32,
        paddingTop: scrolled ? '20px' : '24px',
        paddingBottom: scrolled ? '20px' : '24px'
      }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 right-0 z-50 flex items-center justify-between px-6 border-b`}
      style={{ borderBottomWidth: '1px' }}
    >
      {/* Left Links */}
      <div className="hidden md:flex flex-1 items-center space-x-8 text-sm font-medium tracking-widest uppercase text-white">
        {finalLinks.map((link) => (
          <div key={link.label} className="relative z-[60] group flex items-center gap-1 cursor-pointer">
            <Link href={link.href} className="hover:opacity-70 transition-opacity">
              {link.label}
            </Link>
            {link.dropdown && <CaretDown size={12} weight="bold" />}
            
            {/* Simple Dropdown representation */}
            {link.dropdown && (
              <div className="absolute top-full left-0 pt-4 hidden group-hover:block z-[60]">
                <div className="flex flex-col bg-black text-white border border-white/20 py-2 min-w-[150px] shadow-lg">
                  {link.dropdown.map((subLink) => (
                    <Link key={subLink.label} href={subLink.href} className="px-4 py-2 hover:bg-white/10 text-xs">
                      {subLink.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Center Logo */}
      <div className="relative flex justify-center shrink-0 w-32 h-16">
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-0 z-50 flex justify-center">
          <motion.div
            animate={{
              height: showGiantLogo ? 300 : 80,
              width: showGiantLogo ? 160 : 80,
              y: showGiantLogo ? -30 : -8
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative origin-top"
            style={{
              backgroundImage: 'url(/LogoUnitono.svg)',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </Link>
      </div>

      {/* Right Icons */}
      <div className="flex flex-1 items-center justify-end space-x-6 text-white">
        <button onClick={openCart} className="hover:opacity-70 transition-opacity flex items-center border border-white/20 px-3 py-1.5 text-white" aria-label="Carrito de Compras">
          <ShoppingCart size={20} weight="regular" className="mr-2" />
          <motion.span
            key={totalItems}
            initial={{ scale: 0.7, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 12 }}
            className="text-sm font-medium"
          >
            ({totalItems})
          </motion.span>
        </button>
      </div>
    </motion.nav>
  );
}
