import React from 'react';
import Link from 'next/link';
import { InstagramLogo, TiktokLogo, XLogo, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { footerCategories, footerInformation, socialLinks } from '@/lib/data';
import ThemeSwitcher from './ThemeSwitcher';
import Image from 'next/image';
import logo from '@/assets/LogoUnitono.svg';

export default function Footer() {
  const renderSocialIcon = (platform: string) => {
    switch (platform.toUpperCase()) {
      case "INSTAGRAM":
        return <InstagramLogo size={24} weight="regular" />;
      case "TIKTOK":
        return <TiktokLogo size={24} weight="regular" />;
      case "X":
      case "TWITTER":
        return <XLogo size={24} weight="regular" />;
      default:
        return <InstagramLogo size={24} weight="regular" />;
    }
  };

  return (
    <footer className="w-full bg-foreground text-background pt-12 pb-6 px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 mb-12">
        
        {/* Newsletter / Brand Column */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="relative w-[200px] h-[400px] mb-6">
              <Image src={logo} alt="Murren Logo" fill className="object-contain object-left brightness-0 invert" />
            </div>
            <p className="text-sm font-medium tracking-widest text-background/60 uppercase mb-8 max-w-sm">
              ÚNETE AL FLUJO. RECIBE ACCESO ANTICIPADO A DROPS EXCLUSIVOS Y EVENTOS SECRETOS.
            </p>
          </div>
          
          <div className="flex w-full max-w-md border-b border-background/30 pb-2">
            <input 
              type="email" 
              placeholder="CORREO ELECTRÓNICO" 
              className="bg-transparent border-none outline-none text-sm font-medium tracking-widest uppercase flex-1 placeholder:text-background/40 text-background"
            />
            <button className="hover:opacity-70 transition-opacity">
              <ArrowRight size={20} weight="bold" />
            </button>
          </div>
        </div>

        {/* Categories Column */}
        <div className="flex flex-col">
          <h3 className="text-xs font-bold tracking-widest uppercase mb-8 text-background/50">
            // {footerCategories.title}
          </h3>
          <ul className="flex flex-col gap-4">
            {footerCategories.links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm font-bold tracking-widest uppercase hover:opacity-60 transition-opacity">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Information Column */}
        <div className="flex flex-col">
          <h3 className="text-xs font-bold tracking-widest uppercase mb-8 text-background/50">
            // {footerInformation.title}
          </h3>
          <ul className="flex flex-col gap-4">
            {footerInformation.links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm font-bold tracking-widest uppercase hover:opacity-60 transition-opacity">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials Column */}
        <div className="flex flex-col">
          <h3 className="text-xs font-bold tracking-widest uppercase mb-8 text-background/50">
            // SÍGUENOS
          </h3>
          <ul className="flex flex-col gap-4">
            {socialLinks.map((social) => (
              <li key={social.platform}>
                <a href={social.href} className="text-sm font-bold tracking-widest uppercase hover:opacity-60 transition-opacity flex items-center gap-2">
                  {renderSocialIcon(social.platform)} {social.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-background/20 gap-6">
        <p className="text-xs font-bold tracking-widest uppercase text-background/50">
          © {new Date().getFullYear()} MURREN. TODOS LOS DERECHOS RESERVADOS.
        </p>
        <ThemeSwitcher />
      </div>
    </footer>
  );
}
