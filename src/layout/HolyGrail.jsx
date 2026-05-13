import React from 'react';
import { useEffect, useState } from 'react';

function makeSlot(area, padding) {
  return function Slot({ children, style }) {
    return (
      <section
        data-fc-slot={area}
        style={{
          background: 'var(--fc-surface)',
          border: 'var(--fc-border-width) solid var(--fc-line)',
          borderRadius: 'var(--fc-r-lg)',
          boxShadow: 'var(--fc-shadow-card)',
          overflow: 'hidden',
          padding,
          gridArea: area,
          ...style,
        }}
      >
        {children}
      </section>
    );
  };
}

export function HolyGrail({
  children,
  navWidth = 220,
  asideWidth = 260,
  breakpoint = 960,
  padding = 16,
  maxWidth = 1500,
}) {
  const [stacked, setStacked] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const apply = () => setStacked(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [breakpoint]);

  const grid = stacked
    ? {
        gridTemplateColumns: '1fr',
        gridTemplateAreas: `"header" "nav" "main" "aside" "footer"`,
      }
    : {
        gridTemplateColumns: `${navWidth}px 1fr ${asideWidth}px`,
        gridTemplateAreas: `"header header header" "nav main aside" "footer footer footer"`,
      };

  return (
    <div style={{ padding }}>
      <div
        style={{
          display: 'grid',
          gap: 'var(--fc-grid-gap)',
          maxWidth,
          margin: '0 auto',
          minHeight: `calc(100vh - ${padding * 2}px)`,
          gridTemplateRows: 'auto 1fr auto',
          ...grid,
        }}
      >
        {children}
      </div>
    </div>
  );
}

HolyGrail.Header = makeSlot('header', '14px 20px');
HolyGrail.Nav    = makeSlot('nav',    '18px 12px');
HolyGrail.Main   = makeSlot('main',   '28px 32px');
HolyGrail.Aside  = makeSlot('aside',  '20px 18px');
HolyGrail.Footer = makeSlot('footer', '12px 20px');
