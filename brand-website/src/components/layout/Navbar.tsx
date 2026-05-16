"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MagnifyingGlass, User, ShoppingCart, CaretDown } from '@phosphor-icons/react';
import Image from 'next/image';
import logo from '@/assets/logo.svg';
import { navigationLinks } from '@/lib/data';
import { Category } from '@/types';

export default function Navbar({ categories = [] }: { categories?: Category[] }) {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <motion.nav
      initial={{ backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)', top: 32 }}
      animate={{ 
        backgroundColor: scrolled ? 'var(--background)' : 'rgba(0,0,0,0)',
        borderColor: scrolled ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0)',
        top: scrolled ? 0 : 32
      }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b`}
      style={{ borderBottomWidth: '1px' }}
    >
      {/* Left Links */}
      <div className="hidden md:flex flex-1 items-center space-x-8 text-sm font-medium tracking-widest uppercase">
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
      <div className="relative flex justify-center shrink-0 w-32 h-12">
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-0 z-50 flex justify-center">
          <motion.div
            animate={{
              height: scrolled ? 80 : 300,
              width: scrolled ? 80 : 160,
              y: scrolled ? 0 : -30
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative origin-top"
            style={{
              backgroundImage: 'url(/logo.svg)',
              backgroundSize: '300%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </Link>
      </div>

      {/* Right Icons */}
      <div className="flex flex-1 items-center justify-end space-x-6">
        <button className="hover:opacity-70 transition-opacity" aria-label="Search">
          <MagnifyingGlass size={24} weight="regular" />
        </button>
        <button className="hover:opacity-70 transition-opacity hidden sm:block" aria-label="User profile">
          <User size={24} weight="regular" />
        </button>
        <button className="hover:opacity-70 transition-opacity flex items-center border border-foreground px-3 py-1.5" aria-label="Shopping Cart">
          <ShoppingCart size={20} weight="regular" className="mr-2" />
          <span className="text-sm font-medium">(0)</span>
        </button>
      </div>
    </motion.nav>
  );
}
