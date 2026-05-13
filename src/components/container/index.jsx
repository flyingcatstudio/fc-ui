export const FcCard = ({ children, padding=20, style }) => (
  <div data-fc-glass style={{
    background:'var(--fc-surface)',
    border:'var(--fc-border-width) solid var(--fc-line)',
    borderRadius:'var(--fc-r-md)', boxShadow:'var(--fc-shadow-card)',
    padding, ...style,
  }}>{children}</div>
);

export const FcPanel = ({ title, action, children }) => (
  <section data-fc-glass style={{
    border:'var(--fc-border-width) solid var(--fc-line-2)',
    borderRadius:'var(--fc-r-md)', overflow:'hidden',
    background:'var(--fc-surface)',
  }}>
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'14px 16px',
      borderBottom:'var(--fc-border-width) solid var(--fc-line-2)',
    }}>
      <h2 style={{ fontSize:13, fontWeight:600, margin:0, color:'var(--fc-ink)' }}>{title}</h2>
      {action}
    </div>
    {children}
  </section>
);

export const FcDivider = ({ label }) => (
  <div style={{ display:'flex', alignItems:'center', gap:12, color:'var(--fc-ink-3)' }}>
    <div style={{ flex:1, height:1, background:'var(--fc-line)' }}/>
    {label && (
      <span style={{
        fontFamily:'var(--fc-font-mono)', fontSize:10,
        letterSpacing:'0.12em', textTransform:'uppercase',
      }}>{label}</span>
    )}
    {label && <div style={{ flex:1, height:1, background:'var(--fc-line)' }}/>}
  </div>
);

export const FcSection = ({ icon:Icon, title, action, children }) => (
  <section style={{
    paddingBottom:18, marginBottom:18,
    borderBottom:'var(--fc-border-width) solid var(--fc-line-2)',
  }}>
    <div style={{
      display:'flex', alignItems:'center', gap:8,
      fontSize:12, fontWeight:600, color:'var(--fc-ink)', marginBottom:14,
    }}>
      {Icon && <Icon size={13}/>}
      <span>{title}</span>
      {action && <span style={{ marginLeft:'auto' }}>{action}</span>}
    </div>
    {children}
  </section>
);

export const FcRow = ({ leading, title, meta, trailing }) => (
  <div style={{
    display:'flex', alignItems:'center', gap:12, padding:'12px 16px',
    borderTop:'var(--fc-border-width) solid var(--fc-line-2)',
  }}>
    {leading}
    <div style={{ flex:1 }}>
      <div style={{ fontSize:13, fontWeight:500, color:'var(--fc-ink)' }}>{title}</div>
      {meta && <div style={{ fontSize:11, color:'var(--fc-ink-3)', marginTop:2 }}>{meta}</div>}
    </div>
    {trailing}
  </div>
);
