import React from 'react';

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-foreground text-background text-xs py-2 px-4 flex justify-between items-center border-b border-black/10">
      <div className="hidden sm:block">EN / USD</div>
      <div className="text-center flex-1 font-medium tracking-wide">
        ENVÍOS GRATIS EN COMPRAS SUPERIORES A $200.000 COP
      </div>
      <div className="hidden sm:block">SUPPORT</div>
    </div>
  );
}
