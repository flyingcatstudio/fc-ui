import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

export const FcInput = ({ leading, trailing, placeholder, value, onChange, id, type='text', style }) => (
  <div data-fc-glass style={{
    display:'flex', alignItems:'center', gap:10, padding:'8px 14px',
    background:'var(--fc-elev)',
    border:'var(--fc-border-width) solid var(--fc-line)',
    borderRadius:'var(--fc-r-md)', ...style,
  }}>
    {leading}
    <input id={id} type={type} placeholder={placeholder} value={value} onChange={e=>onChange?.(e.target.value)} style={{
      flex:1, background:'transparent', border:'none', outline:'none',
      fontSize:13, color:'var(--fc-ink)',
    }}/>
    {trailing}
  </div>
);

export const FcTextarea = ({ placeholder, value, onChange, rows=3 }) => (
  <textarea rows={rows} placeholder={placeholder} value={value} onChange={e=>onChange?.(e.target.value)} style={{
    width:'100%', padding:'10px 14px', background:'var(--fc-elev)',
    border:'var(--fc-border-width) solid var(--fc-line)',
    borderRadius:'var(--fc-r-md)', fontSize:13, color:'var(--fc-ink)',
    outline:'none', resize:'vertical',
  }}/>
);

export const FcCheckbox = ({ checked, onChange, label }) => (
  <label style={{ display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:13, color:'var(--fc-ink)' }}>
    <span onClick={() => onChange?.(!checked)} style={{
      width:18, height:18, display:'grid', placeItems:'center',
      background: checked?'var(--fc-accent)':'var(--fc-surface)',
      border:'var(--fc-border-width) solid',
      borderColor: checked?'var(--fc-accent)':'var(--fc-line)',
      borderRadius:'var(--fc-r-sm)', color:'#fff', flexShrink:0,
    }}>
      {checked && <Check size={12} strokeWidth={3}/>}
    </span>
    {label}
  </label>
);

export const FcRadio = ({ checked, onChange, label }) => (
  <label style={{ display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:13, color:'var(--fc-ink)' }}>
    <span onClick={onChange} style={{
      width:18, height:18, display:'grid', placeItems:'center',
      background:'var(--fc-surface)',
      border:'var(--fc-border-width) solid',
      borderColor: checked?'var(--fc-accent)':'var(--fc-line)',
      borderRadius:'var(--fc-r-pill)', flexShrink:0,
    }}>
      {checked && <span style={{ width:8, height:8, background:'var(--fc-accent)', borderRadius:'var(--fc-r-pill)' }}/>}
    </span>
    {label}
  </label>
);

export const FcSelect = ({ options, value, onChange, placeholder='Select...' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const selected = options.find(o => o.value === value);
  return (
    <div ref={ref} style={{ position:'relative', display:'inline-block', minWidth:180 }}>
      <button onClick={() => setOpen(o=>!o)} style={{
        width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8,
        padding:'9px 14px', background:'var(--fc-elev)',
        border:'var(--fc-border-width) solid var(--fc-line)',
        borderRadius:'var(--fc-r-md)', fontSize:13,
        color: selected?'var(--fc-ink)':'var(--fc-ink-3)', cursor:'pointer',
      }}>
        {selected?.label ?? placeholder}
        <ChevronsUpDown size={13} color="var(--fc-ink-3)"/>
      </button>
      {open && (
        <div data-fc-glass style={{
          position:'absolute', top:'calc(100% + 4px)', left:0, right:0, zIndex:20,
          background:'var(--fc-surface)',
          border:'var(--fc-border-width) solid var(--fc-line)',
          borderRadius:'var(--fc-r-md)', boxShadow:'var(--fc-shadow-pop)',
          padding:4, animation:'fc-fadein 0.15s ease-out',
        }}>
          {options.map(opt => (
            <button key={opt.value} onClick={() => { onChange?.(opt.value); setOpen(false); }} style={{
              width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'7px 10px',
              background: opt.value===value?'var(--fc-accent-2)':'transparent',
              color: opt.value===value?'var(--fc-accent)':'var(--fc-ink)',
              border:'none', borderRadius:'var(--fc-r-sm)', cursor:'pointer',
              fontSize:13, textAlign:'left',
            }}>
              {opt.label}
              {opt.value===value && <Check size={13}/>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const FcSlider = ({ value, onChange, min=0, max=100, step=1, suffix='' }) => {
  const pct = ((value-min)/(max-min))*100;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, width:'100%' }}>
      <div style={{ flex:1, position:'relative', height:24, display:'flex', alignItems:'center' }}>
        <input type="range" value={value} min={min} max={max} step={step}
          onChange={e=>onChange?.(+e.target.value)}
          style={{ position:'absolute', inset:0, opacity:0, cursor:'pointer', margin:0 }}/>
        <div style={{
          width:'100%', height:6, background:'var(--fc-elev)',
          border:'var(--fc-border-width) solid var(--fc-line)',
          borderRadius:'var(--fc-r-pill)', position:'relative',
        }}>
          <div style={{
            position:'absolute', inset:0, width:`${pct}%`,
            background:'var(--fc-accent)', borderRadius:'var(--fc-r-pill)',
          }}/>
          <div style={{
            position:'absolute', top:'50%', left:`${pct}%`,
            transform:'translate(-50%, -50%)',
            width:16, height:16, background:'#fff',
            border:'var(--fc-border-width) solid var(--fc-accent)',
            borderRadius:'var(--fc-r-pill)',
            boxShadow:'0 2px 6px rgba(0,0,0,0.15)',
          }}/>
        </div>
      </div>
      <span style={{
        fontFamily:'var(--fc-font-mono)', fontSize:11,
        color:'var(--fc-ink-2)', minWidth:40, textAlign:'right',
      }}>{value}{suffix}</span>
    </div>
  );
};
