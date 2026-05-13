import React from 'react';
export const FcButton = ({ variant='primary', size='md', icon, children, onClick, disabled, style }) => {
  const sizes = { sm:{ p:'6px 12px', f:11 }, md:{ p:'10px 16px', f:12 }, lg:{ p:'12px 20px', f:13 } };
  const variants = {
    primary: { background:'var(--fc-accent)', color:'#fff', border:'var(--fc-border-width) solid var(--fc-line)' },
    ghost:   { background:'transparent', color:'var(--fc-ink-2)', border:'var(--fc-border-width) solid transparent' },
    outline: { background:'transparent', color:'var(--fc-ink)', border:'var(--fc-border-width) solid var(--fc-line)' },
    soft:    { background:'var(--fc-accent-2)', color:'var(--fc-accent)', border:'var(--fc-border-width) solid transparent' },
    danger:  { background:'var(--fc-danger)', color:'#fff', border:'var(--fc-border-width) solid var(--fc-line)' },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display:'inline-flex', alignItems:'center', gap:6,
      padding:sizes[size].p, fontSize:sizes[size].f, fontWeight:500,
      fontFamily:'var(--fc-font-body)', borderRadius:'var(--fc-r-md)',
      cursor: disabled?'not-allowed':'pointer', whiteSpace:'nowrap',
      boxShadow:'var(--fc-shadow-card)',
      opacity: disabled?0.5:1, ...variants[variant], ...style,
    }}>{icon}{children}</button>
  );
};

export const FcIconButton = ({ children, onClick, active, size=32, style }) => (
  <button onClick={onClick} style={{
    width:size, height:size, display:'grid', placeItems:'center',
    background: active?'var(--fc-accent-2)':'transparent',
    border:'var(--fc-border-width) solid var(--fc-line)',
    borderRadius:'var(--fc-r-md)',
    color: active?'var(--fc-accent)':'var(--fc-ink-2)',
    cursor:'pointer', ...style,
  }}>{children}</button>
);

export const FcSwitch = ({ checked, onChange, size='md' }) => {
  const dims = size==='sm' ? { w:32, h:18, thumb:14 } : { w:42, h:24, thumb:18 };
  return (
    <button onClick={() => onChange?.(!checked)} style={{
      width:dims.w, height:dims.h, padding:2,
      border:'var(--fc-border-width) solid var(--fc-line)',
      background: checked?'var(--fc-accent)':'var(--fc-elev)',
      borderRadius:'var(--fc-r-pill)', cursor:'pointer', position:'relative',
      transition:'background 0.18s', boxShadow:'var(--fc-shadow-card)',
    }}>
      <span style={{
        position:'absolute', top:'50%',
        left: checked?`calc(100% - ${dims.thumb+2}px)`:2,
        transform:'translateY(-50%)',
        width:dims.thumb, height:dims.thumb, background:'#fff',
        borderRadius:'var(--fc-r-pill)', transition:'left 0.18s',
        boxShadow:'0 1px 3px rgba(0,0,0,0.15)',
      }}/>
    </button>
  );
};

export const FcSegmented = ({ options, value, onChange }) => (
  <div style={{
    display:'inline-flex', padding:3, gap:2,
    background:'var(--fc-elev)',
    border:'var(--fc-border-width) solid var(--fc-line)',
    borderRadius:'var(--fc-r-md)',
  }}>
    {options.map(opt => (
      <button key={opt.value} onClick={() => onChange?.(opt.value)} style={{
        padding:'5px 12px', fontSize:11, fontWeight:500,
        background: value===opt.value?'var(--fc-surface)':'transparent',
        color: value===opt.value?'var(--fc-ink)':'var(--fc-ink-2)',
        border:'none', borderRadius:'calc(var(--fc-r-md) - 3px)',
        cursor:'pointer',
        boxShadow: value===opt.value?'var(--fc-shadow-card)':'none',
      }}>{opt.label}</button>
    ))}
  </div>
);
