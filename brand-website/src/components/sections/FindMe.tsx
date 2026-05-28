"use client";

import React, { useState } from 'react';
import { MapPin, InstagramLogo, TiktokLogo, XLogo, PinterestLogo } from '@phosphor-icons/react';
import { locationsData, socialLinks } from '@/lib/data';

export default function FindMe() {
  const [activeLocId, setActiveLocId] = useState(locationsData[0].id);

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
        return <InstagramLogo size={24} weight="regular" />; // Fallback icon
    }
  };

  const activeLocation = locationsData.find(loc => loc.id === activeLocId) || locationsData[0];
  const mapQuery = encodeURIComponent(`${activeLocation.addressLine1}, ${activeLocation.city}`);
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-8 md:py-12 bg-background text-foreground border-t border-foreground/10">
      
      {/* Header */}
      <div className="mb-8 border-b border-foreground/10 pb-4">
        <h2 className="text-sm font-bold tracking-widest uppercase">
          // FIND ME
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Column: Locations */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter uppercase mb-12 leading-[0.9]">
              VISIT OUR<br />FLAGSHIP<br />STORES
            </h3>
            
            <div className="flex flex-col gap-12">
              {locationsData.map((loc) => {
                const isActive = activeLocId === loc.id;
                
                return (
                  <div 
                    key={loc.id} 
                    onClick={() => setActiveLocId(loc.id)}
                    className={`flex flex-col border-l-2 pl-6 cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? 'border-foreground opacity-100' 
                        : 'border-foreground/20 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={20} className="text-foreground" weight={isActive ? "fill" : "regular"} />
                      <h4 className="text-xl font-bold tracking-widest uppercase">
                        {loc.city}
                      </h4>
                    </div>
                    <p className="text-sm font-medium tracking-widest text-foreground/70 uppercase mb-1">
                      {loc.addressLine1} {loc.addressLine2 ? `- ${loc.addressLine2}` : ''}
                    </p>
                    <p className="text-xs font-bold tracking-widest text-foreground/40 uppercase">
                      {loc.type}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-16 lg:mt-0">
            <button className="border border-foreground text-foreground text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-foreground/5 transition-colors">
              VIEW ALL STOCKISTS
            </button>
          </div>
        </div>

        {/* Right Column: Visual Map & Socials */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          
          {/* Google Maps Integration */}
          <div className="relative w-full aspect-[4/3] bg-foreground/5 border border-foreground/10 p-2 overflow-hidden">
            <div className="relative w-full h-full overflow-hidden bg-background group">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale contrast-125 dark:invert dark:hue-rotate-180 transition-all duration-500"
              />
              <div className="absolute inset-0 border border-foreground/10 pointer-events-none" />
              
              {/* Navigate Button Overlay */}
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 bg-foreground text-background text-xs font-bold tracking-widest uppercase px-6 py-3 flex items-center gap-2 hover:opacity-80 transition-opacity shadow-xl"
              >
                CÓMO LLEGAR
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col border-t border-foreground/10 pt-8">
            <h4 className="text-xs font-bold tracking-widest uppercase text-foreground/50 mb-6">
              // CONNECT
            </h4>
            <div className="flex gap-8">
              {socialLinks.map((social) => (
                <a 
                  key={social.platform} 
                  href={social.href}
                  className="flex items-center gap-2 text-foreground hover:opacity-50 transition-opacity"
                  aria-label={social.platform}
                >
                  {renderSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
