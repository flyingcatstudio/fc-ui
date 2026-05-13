import React from 'react';
import { Loader2, TrendingUp } from 'lucide-react';
import { FcCaption } from '../typography/index.jsx';

export const FcAvatar = ({ children, size=36, tone='accent', src }) => (
  <div style={{
    width:size, height:size, display:'grid', placeItems:'center',
    background: tone==='accent'?'var(--fc-accent)':'var(--fc-elev)',
    color: tone==='accent'?'#fff':'var(--fc-ink)',
    border:'var(--fc-border-width) solid var(--fc-line)',
    borderRadius:'var(--fc-r-pill)', overflow:'hidden',
    fontFamily:'var(--fc-font-mono)', fontSize: size*0.32, fontWeight:500,
  }}>
    {src ? <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : children}
  </div>
);

export const FcAvatarGroup = ({ avatars, max=4 }) => {
  const shown = avatars.slice(0, max);
  const rest = avatars.length - max;
  return (
    <div style={{ display:'inline-flex' }}>
      {shown.map((a, i) => (
        <div key={i} style={{ marginLeft: i===0?0:-10, position:'relative', zIndex: shown.length-i }}>
          <FcAvatar size={32} tone={a.tone || 'accent'}>{a.label}</FcAvatar>
        </div>
      ))}
      {rest > 0 && (
        <div style={{ marginLeft:-10 }}>
          <FcAvatar size={32} tone="muted">+{rest}</FcAvatar>
        </div>
      )}
    </div>
  );
};

export const FcProgress = ({ value=0, max=100, indeterminate=false }) => {
  const pct = (value/max)*100;
  return (
    <div style={{
      width:'100%', height:6, background:'var(--fc-elev)',
      border:'var(--fc-border-width) solid var(--fc-line)',
      borderRadius:'var(--fc-r-pill)', overflow:'hidden',
    }}>
      <div style={{
        height:'100%',
        width: indeterminate?'40%':`${pct}%`,
        background:'var(--fc-accent)',
        borderRadius:'var(--fc-r-pill)',
        transition: indeterminate?'none':'width 0.3s',
        animation: indeterminate?'fc-shimmer 1.4s ease-in-out infinite':'none',
        backgroundSize:'200% 100%',
        backgroundImage: indeterminate
          ? 'linear-gradient(90deg, var(--fc-accent), var(--fc-accent-2), var(--fc-accent))'
          : 'none',
      }}/>
    </div>
  );
};

export const FcSpinner = ({ size=20 }) => (
  <Loader2 size={size} style={{ animation:'fc-spin 0.9s linear infinite', color:'var(--fc-accent)' }}/>
);

export const FcMetric = ({ label, value, delta, tone='up' }) => (
  <div data-fc-glass style={{
    padding:16, background:'var(--fc-elev)',
    border:'var(--fc-border-width) solid var(--fc-line-2)',
    borderRadius:'var(--fc-r-md)', boxShadow:'var(--fc-shadow-card)',
    display:'flex', flexDirection:'column', gap:8,
  }}>
    <FcCaption>{label}</FcCaption>
    <div className="fc-display" style={{
      fontFamily:'var(--fc-font-display)',
      fontSize:`calc(26px * var(--fc-density))`,
      fontWeight:500, letterSpacing:'-0.02em', lineHeight:1.1,
    }}>{value}</div>
    {delta && (
      <div style={{
        display:'flex', alignItems:'center', gap:4,
        fontSize:11, fontFamily:'var(--fc-font-mono)',
        color: tone==='up'?'var(--fc-success)':'var(--fc-warn)',
      }}>
        <TrendingUp size={11}/> {delta}
      </div>
    )}
  </div>
);
