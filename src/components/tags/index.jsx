import React from 'react';
import { X } from 'lucide-react';

export const FcTag = ({ tone='default', children, leading }) => {
  const tones = {
    default: { bg:'var(--fc-elev)', fg:'var(--fc-ink-2)' },
    accent:  { bg:'var(--fc-accent-2)', fg:'var(--fc-accent)' },
    success: { bg:'var(--fc-success-2)', fg:'var(--fc-success)' },
    warn:    { bg:'var(--fc-warn-2)', fg:'var(--fc-warn)' },
    danger:  { bg:'var(--fc-danger-2)', fg:'var(--fc-danger)' },
  };
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:4,
      fontFamily:'var(--fc-font-mono)', fontSize:10, padding:'3px 9px',
      borderRadius:'var(--fc-r-pill)', letterSpacing:'0.02em',
      border:'var(--fc-border-width) solid transparent',
      background:tones[tone].bg, color:tones[tone].fg,
    }}>{leading}{children}</span>
  );
};

export const FcBadge = ({ count, max=99, dot=false, children }) => (
  <span style={{ position:'relative', display:'inline-flex' }}>
    {children}
    {(count > 0 || dot) && (
      <span style={{
        position:'absolute', top:-4, right:-4,
        minWidth: dot?8:16, height: dot?8:16, padding: dot?0:'0 4px',
        background:'var(--fc-danger)', color:'#fff', fontSize:9, fontWeight:600,
        fontFamily:'var(--fc-font-mono)', borderRadius:'var(--fc-r-pill)',
        display:'grid', placeItems:'center', border:'2px solid var(--fc-surface)',
      }}>{!dot && (count > max ? `${max}+` : count)}</span>
    )}
  </span>
);

export const FcKbd = ({ children, inline=false }) => (
  <span style={{
    fontFamily:'var(--fc-font-mono)', fontSize:10,
    padding: inline?'1px 5px':'2px 6px',
    border:'var(--fc-border-width) solid var(--fc-line)',
    borderRadius:'var(--fc-r-sm)',
    background:'var(--fc-surface)', color:'var(--fc-ink-3)',
  }}>{children}</span>
);

export const FcChip = ({ selected, onClick, onRemove, children, icon }) => (
  <span onClick={onClick} style={{
    display:'inline-flex', alignItems:'center', gap:6,
    padding:'5px 10px', fontSize:12, fontWeight:500,
    cursor: onClick?'pointer':'default',
    background: selected?'var(--fc-accent-2)':'var(--fc-elev)',
    color: selected?'var(--fc-accent)':'var(--fc-ink-2)',
    border:'var(--fc-border-width) solid',
    borderColor: selected?'var(--fc-accent)':'var(--fc-line)',
    borderRadius:'var(--fc-r-pill)',
  }}>
    {icon}{children}
    {onRemove && (
      <button onClick={(e)=>{e.stopPropagation(); onRemove();}} style={{
        display:'grid', placeItems:'center', width:14, height:14, marginRight:-4,
        background:'transparent', border:'none', cursor:'pointer', color:'inherit', padding:0,
      }}><X size={10}/></button>
    )}
  </span>
);

export const FcDot = ({ size=6, color='var(--fc-success)', pulse=false, style }) => (
  <span style={{
    width:size, height:size, borderRadius:'var(--fc-r-pill)', background:color,
    boxShadow: pulse?`0 0 0 4px var(--fc-pulse-shadow)`:'none',
    animation: pulse?'fc-pulse 1.6s ease-out infinite':'none',
    flexShrink:0, ...style,
  }}/>
);
