"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MagnifyingGlass, User, ShoppingCart, CaretDown } from '@phosphor-icons/react';
import Image from 'next/image';
import logo from '@/assets/logo.svg';
import { navigationLinks } from '@/lib/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        {navigationLinks.map((link) => (
          <div key={link.label} className="relative group flex items-center gap-1 cursor-pointer">
            <Link href={link.href} className="hover:opacity-70 transition-opacity">
              {link.label}
            </Link>
            {link.dropdown && <CaretDown size={12} weight="bold" />}
            
            {/* Simple Dropdown representation */}
            {link.dropdown && (
              <div className="absolute top-full left-0 mt-4 hidden group-hover:flex flex-col bg-background border border-foreground/10 py-2 min-w-[150px]">
                {link.dropdown.map((subLink) => (
                  <Link key={subLink.label} href={subLink.href} className="px-4 py-2 hover:bg-foreground/5 text-xs">
                    {subLink.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Center Logo */}
      <div className="w-24 h-12 relative flex justify-center shrink-0">
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-0 z-50">
          <motion.div
            animate={{
              height: scrolled ? 56 : 160,
              width: scrolled ? 56 : 90,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative origin-top bg-black"
            style={{
              backgroundImage: 'url(/logo.svg)',
              backgroundSize: '220%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
          
          </motion.div>
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
