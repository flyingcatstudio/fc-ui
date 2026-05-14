import React from 'react';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useFc } from '../../core/FcProvider.jsx';
import { THEMES } from '../../core/themes.js';
import catJumpUrl from '../../assets/cat_jump.png';

export const FcNavGroup = ({ label, children }) => (
  <div style={{ marginBottom:18 }}>
    <div style={{
      fontFamily:'var(--fc-font-mono)', fontSize:9, letterSpacing:'0.12em',
      color:'var(--fc-ink-3)', padding:'0 10px', marginBottom:6,
    }}>{label}</div>
    <ul style={{ listStyle:'none', margin:0, padding:0 }}>{children}</ul>
  </div>
);

export const FcNavItem = ({ icon:Icon, children, active=false, count, onClick }) => (
  <li>
    <button onClick={onClick} style={{
      width:'100%', display:'flex', alignItems:'center', gap:10, padding:'8px 10px',
      fontSize:13, color: active?'var(--fc-ink)':'var(--fc-ink-2)',
      background: active?'var(--fc-elev)':'transparent',
      fontWeight: active?500:400, border:'none', textAlign:'left',
      borderRadius:'var(--fc-r-sm)', cursor:'pointer', marginBottom:2,
    }}>
      {Icon && <Icon size={14} strokeWidth={1.8}/>}
      <span style={{ flex:1 }}>{children}</span>
      {count != null && (
        <span style={{
          fontFamily:'var(--fc-font-mono)', fontSize:10,
          color:'var(--fc-ink-3)', background:'var(--fc-elev)',
          padding:'1px 6px', borderRadius:'var(--fc-r-pill)',
        }}>{count}</span>
      )}
    </button>
  </li>
);

export const FcBreadcrumb = ({ items }) => (
  <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:12 }}>
    {items.map((it, i) => (
      <span key={i} style={{ display:'flex', alignItems:'center', gap:6 }}>
        {i > 0 && <ChevronRight size={12} color="var(--fc-ink-3)"/>}
        <a style={{
          color: i===items.length-1?'var(--fc-ink)':'var(--fc-ink-2)',
          fontWeight: i===items.length-1?500:400,
          textDecoration:'none', cursor:'pointer',
        }}>{it}</a>
      </span>
    ))}
  </nav>
);

export const FcLogo = ({ subtitle, name='fc-ui' }) => {
  const { theme } = useFc();
  const isCute = theme === 'cute';
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
      <div data-fc-mascot style={{
        width:38, height:38, display:'grid', placeItems:'center',
        animation: isCute?'none':'fc-float 2.4s ease-in-out infinite',
      }}>
        <img
          src={catJumpUrl}
          alt=""
          draggable={false}
          style={{
            width:'100%', height:'100%', objectFit:'contain',
            pointerEvents:'none', userSelect:'none',
          }}
        />
      </div>
      <div>
        <div className="fc-display" style={{
          fontFamily:'var(--fc-font-display)', fontSize: isCute?11:16,
          fontWeight:600, letterSpacing:'var(--fc-display-tracking)',
          lineHeight: isCute?1.4:1,
        }}>{name}</div>
        <div style={{
          fontFamily:'var(--fc-font-mono)', fontSize:10,
          color:'var(--fc-ink-3)', marginTop:4,
        }}>{subtitle}</div>
      </div>
    </div>
  );
};

export const FcThemeSwitcher = () => {
  const { theme, setTheme } = useFc();
  return (
    <div data-fc-glass style={{
      display:'inline-flex', alignItems:'center', gap:4, padding:4,
      background:'var(--fc-surface)',
      border:'var(--fc-border-width) solid var(--fc-line)',
      borderRadius:'var(--fc-r-pill)', boxShadow:'var(--fc-shadow-card)',
    }}>
      {Object.entries(THEMES).map(([k, t]) => (
        <button key={k} onClick={() => setTheme(k)} style={{
          padding:'6px 12px', fontSize:11, fontWeight:500,
          background: theme===k?'var(--fc-ink)':'transparent',
          color: theme===k?'#fff':'var(--fc-ink-2)',
          border:'none', borderRadius:'var(--fc-r-pill)', cursor:'pointer',
          display:'flex', alignItems:'center', gap:6,
        }}>
          <span style={{ fontSize: k==='cute'?12:11 }}>{t.mascot}</span>
          {t.name}
        </button>
      ))}
    </div>
  );
};

// ── FcDotNavigation: 9-dot expandable navigation ────────────
export const FcDotNavigation = ({
  items = [],
  closedSize = 70,
  openSize = 200,
  surface = '#212532',
  dotColor = '#ffffff',
}) => {
  const [open, setOpen] = useState(false);
  const slots = Array.from({ length: 9 }, (_, i) => items[i] || null);
  const dotPx = 7;
  const iconPx = 50;
  const closedGap = 12;
  const openGap = 60;

  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        position:'relative',
        width: open ? openSize : closedSize,
        height: open ? openSize : closedSize,
        background: surface,
        borderRadius: open ? 'var(--fc-r-lg)' : 'var(--fc-r-md)',
        cursor:'pointer',
        transition:'width 0.5s, height 0.5s, border-radius 0.5s',
        transitionDelay: open ? '0s' : '0.8s',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'var(--fc-shadow-card)',
        border:'var(--fc-border-width) solid var(--fc-line)',
      }}
    >
      {slots.map((item, i) => {
        const x = (i % 3) - 1;
        const y = Math.floor(i / 3) - 1;
        const Icon = item?.icon;
        const delay = open ? i * 0.05 : (8 - i) * 0.05;
        return (
          <span
            key={i}
            onClick={(e) => {
              if (!open) return;
              e.stopPropagation();
              item?.onClick?.();
            }}
            style={{
              position:'absolute',
              width: open ? iconPx : dotPx,
              height: open ? iconPx : dotPx,
              background: open ? 'rgba(255,255,255,0.06)' : dotColor,
              border: open ? '1px solid rgba(255,255,255,0.15)' : 'none',
              borderRadius:'50%',
              transform:`translate(${x * (open ? openGap : closedGap)}px, ${y * (open ? openGap : closedGap)}px)`,
              transition:'all 0.4s ease',
              transitionDelay:`${delay}s`,
              display:'grid', placeItems:'center', color:'#fff',
              cursor: open && item ? 'pointer' : 'inherit',
              opacity: !item && open ? 0.25 : 1,
            }}
          >
            {open && Icon && <Icon size={20} strokeWidth={1.5}/>}
          </span>
        );
      })}
    </div>
  );
};

// ── FcDialNav: rotary dial navigation ────────────────────────
export const FcDialNav = ({
  items = [],
  value,
  onChange,
  size = 220,
  iconSize = 16,
  showLabel = true,
}) => {
  const selectedIdx = Math.max(0, items.findIndex(it => it.value === value));
  const n = items.length;
  const step = n > 0 ? 360 / n : 0;
  const knobAngle = selectedIdx * step;
  const radius = size * 0.38;

  return (
    <div style={{ position:'relative', display:'inline-block' }}>
      <div style={{
        position:'relative', width:size, height:size,
        borderRadius:'50%',
        background:'radial-gradient(circle at 30% 25%, var(--fc-surface), var(--fc-elev) 65%, var(--fc-bg))',
        border:'var(--fc-border-width) solid var(--fc-line)',
        boxShadow:'var(--fc-shadow-card), inset 0 2px 8px rgba(0,0,0,0.06)',
      }}>
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          width:64, height:64, marginLeft:-32, marginTop:-32,
          transform:`rotate(${knobAngle}deg) translateY(-${radius}px)`,
          transformOrigin:'center',
          background:'radial-gradient(circle, var(--fc-accent) 0%, transparent 60%)',
          opacity:0.35, borderRadius:'50%',
          transition:'transform 0.55s cubic-bezier(0.34, 1.4, 0.64, 1)',
          pointerEvents:'none', zIndex:1,
        }}/>

        {items.map((item, i) => {
          const angle = i * step - 90;
          const rad = angle * Math.PI / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const Icon = item.icon;
          const isSelected = i === selectedIdx;
          return (
            <button
              key={item.value ?? i}
              onClick={() => onChange?.(item.value ?? i)}
              title={item.label}
              style={{
                position:'absolute', top:'50%', left:'50%',
                width:36, height:36, marginLeft:-18, marginTop:-18,
                transform:`translate(${x}px, ${y}px)`,
                display:'grid', placeItems:'center',
                background:'transparent', border:'none',
                borderRadius:'50%', cursor:'pointer',
                color: isSelected ? 'var(--fc-accent)' : 'var(--fc-ink-3)',
                transition:'color 0.3s', zIndex:3,
              }}
            >
              <Icon size={iconSize} strokeWidth={isSelected ? 2.2 : 1.6}/>
            </button>
          );
        })}

        <div style={{
          position:'absolute', top:'50%', left:'50%',
          width: size*0.45, height: size*0.45,
          marginLeft: -size*0.225, marginTop: -size*0.225,
          transform:`rotate(${knobAngle}deg)`,
          transition:'transform 0.55s cubic-bezier(0.34, 1.4, 0.64, 1)',
          borderRadius:'50%',
          background:'radial-gradient(circle at 50% 30%, var(--fc-surface), var(--fc-elev))',
          boxShadow:'inset 0 4px 12px rgba(0,0,0,0.08), 0 6px 14px rgba(0,0,0,0.12)',
          border:'var(--fc-border-width) solid var(--fc-line)',
          zIndex:2,
        }}>
          <div style={{
            position:'absolute', top:'8%', left:'50%',
            width:3, height:'20%', transform:'translateX(-50%)',
            background:'var(--fc-accent)',
            borderRadius:'var(--fc-r-pill)',
            boxShadow:'0 0 10px var(--fc-accent), 0 0 4px var(--fc-accent)',
          }}/>
        </div>
      </div>

      {showLabel && items[selectedIdx]?.label && (
        <div style={{
          textAlign:'center', marginTop:12,
          fontSize:11, fontFamily:'var(--fc-font-mono)',
          color:'var(--fc-ink-2)', letterSpacing:'0.12em',
          textTransform:'uppercase',
        }}>{items[selectedIdx].label}</div>
      )}
    </div>
  );
};
