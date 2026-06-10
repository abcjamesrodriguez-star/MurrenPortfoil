import React from 'react';
import Link from 'next/link';
import { InstagramLogo, TiktokLogo, XLogo, ArrowRight, PinterestLogo } from '@phosphor-icons/react/dist/ssr';
import { footerInformation, socialLinks } from '@/lib/data';
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
      case "PINTEREST":
        return <PinterestLogo size={24} weight="regular" />;
      default:
        return <InstagramLogo size={24} weight="regular" />;
    }
  };

  return (
    <footer id="site-footer" className="w-full bg-foreground text-background pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 mb-16 items-start">
        
        {/* Brand Logo & Contact Column */}
        <div className="flex flex-col gap-8">
          <div className="relative w-[180px] h-[360px] md:h-[400px]">
            <Image src={logo} alt="Murren Logo" fill className="object-contain object-left brightness-0 invert" />
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-sm font-medium tracking-widest text-background/60 uppercase max-w-xs leading-relaxed">
              ÚNETE AL FLUJO. RECIBE ACCESO ANTICIPADO A DROPS EXCLUSIVOS Y EVENTOS SECRETOS.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=573017581950"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden border border-background/30 hover:border-background text-background text-xs font-bold tracking-widest uppercase py-4 px-6 flex items-center justify-center bg-transparent group w-full max-w-[280px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-2"
            >
              <div className="absolute inset-0 bg-background scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0" />
              <span className="relative z-10 flex items-center justify-center gap-3 text-background group-hover:text-foreground transition-colors duration-300">
                HABLEMOS POR WHATSAPP
                <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
              </span>
            </a>
          </div>
        </div>

        {/* Information Column */}
        <div className="flex flex-col md:pt-4">
          <h3 className="text-xs font-bold tracking-widest uppercase mb-8 text-background/50">
            // {footerInformation.title}
          </h3>
          <ul className="flex flex-col gap-4">
            {footerInformation.links.map((link) => (
              <li key={link.label}>
                <Link 
                  href={link.href} 
                  className="text-sm font-bold tracking-widest uppercase text-background/80 hover:text-background hover:translate-x-2 transition-all duration-300 transform inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials Column */}
        <div className="flex flex-col md:pt-4">
          <h3 className="text-xs font-bold tracking-widest uppercase mb-8 text-background/50">
            // SÍGUENOS
          </h3>
          <ul className="flex flex-col gap-4">
            {socialLinks.map((social) => (
              <li key={social.platform}>
                <a 
                  href={social.href} 
                  className="text-sm font-bold tracking-widest uppercase text-background/80 hover:text-background hover:translate-x-2 transition-all duration-300 transform inline-flex items-center gap-2"
                >
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
        {/* <ThemeSwitcher /> */}
      </div>
    </footer>
  );
}
