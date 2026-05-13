import React from 'react';
import { cloneElement, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FcAccordion = ({ children, defaultOpen=null }) => {
  const [open, setOpen] = useState(defaultOpen);
  const arr = Array.isArray(children) ? children : [children];
  return (
    <div style={{
      border:'var(--fc-border-width) solid var(--fc-line)',
      borderRadius:'var(--fc-r-md)', overflow:'hidden',
      background:'var(--fc-surface)',
    }}>
      {arr.map((child, i) =>
        child ? cloneElement(child, {
          key: i,
          isOpen: open===i,
          onToggle: () => setOpen(open===i ? null : i),
          isLast: i===arr.length-1,
        }) : null
      )}
    </div>
  );
};

export const FcAccordionItem = ({ title, children, icon, isOpen, onToggle, isLast }) => (
  <div style={{ borderBottom: isLast?'none':'var(--fc-border-width) solid var(--fc-line-2)' }}>
    <button onClick={onToggle} style={{
      width:'100%', display:'flex', alignItems:'center', gap:10, padding:'14px 16px',
      background:'transparent', border:'none', cursor:'pointer', textAlign:'left',
      fontSize:13, fontWeight:500, color:'var(--fc-ink)',
    }}>
      {icon}
      <span style={{ flex:1 }}>{title}</span>
      <ChevronDown size={15} style={{
        transform: isOpen?'rotate(180deg)':'none',
        transition:'transform 0.2s', color:'var(--fc-ink-3)',
      }}/>
    </button>
    {isOpen && (
      <div style={{ padding:'0 16px 14px', fontSize:13, color:'var(--fc-ink-2)', lineHeight:1.6, animation:'fc-fadein 0.2s' }}>
        {children}
      </div>
    )}
  </div>
);

export const FcTabs = ({ tabs, value, onChange }) => (
  <div>
    <div style={{
      display:'flex', gap:2,
      borderBottom:'var(--fc-border-width) solid var(--fc-line)',
      marginBottom:16,
    }}>
      {tabs.map(t => (
        <button key={t.value} onClick={() => onChange?.(t.value)} style={{
          padding:'8px 14px', fontSize:12, fontWeight:500,
          background:'transparent', border:'none', cursor:'pointer',
          color: value===t.value?'var(--fc-ink)':'var(--fc-ink-3)',
          borderBottom:'2px solid',
          borderColor: value===t.value?'var(--fc-accent)':'transparent',
          marginBottom:'-1px',
        }}>{t.label}</button>
      ))}
    </div>
    <div style={{ animation:'fc-fadein 0.2s' }}>
      {tabs.find(t => t.value===value)?.content}
    </div>
  </div>
);
