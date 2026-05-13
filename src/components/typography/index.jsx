export const FcTitle = ({ children, size=36 }) => (
  <h1 className="fc-display" style={{
    fontFamily:'var(--fc-font-display)',
    fontSize:`calc(${size}px * var(--fc-density))`,
    lineHeight:1.05, fontWeight:500,
    letterSpacing:'var(--fc-display-tracking)',
    margin:0, color:'var(--fc-ink)',
    fontVariationSettings:'"opsz" 144',
  }}>{children}</h1>
);

export const FcEm = ({ children }) => (
  <em style={{ fontStyle:'italic', fontWeight:400, color:'var(--fc-accent)' }}>{children}</em>
);

export const FcSubtitle = ({ children }) => (
  <p style={{ fontSize:14, color:'var(--fc-ink-2)', margin:'10px 0 0', maxWidth:560, lineHeight:1.55 }}>{children}</p>
);

export const FcText = ({ children, muted=false }) => (
  <p style={{ fontSize:13, color: muted?'var(--fc-ink-2)':'var(--fc-ink)', margin:0, lineHeight:1.55 }}>{children}</p>
);

export const FcCaption = ({ children }) => (
  <span style={{ fontSize:11, color:'var(--fc-ink-3)', fontFamily:'var(--fc-font-mono)', letterSpacing:'0.02em' }}>{children}</span>
);

export const FcEyebrow = ({ children, tone='accent' }) => (
  <div style={{
    fontFamily:'var(--fc-font-mono)', fontSize:10, letterSpacing:'0.16em',
    color: tone==='accent'?'var(--fc-accent)':'var(--fc-ink-3)',
    textTransform:'uppercase',
  }}>{children}</div>
);

export const FcLabel = ({ children, required=false, htmlFor }) => (
  <label htmlFor={htmlFor} style={{ display:'block', fontSize:12, fontWeight:500, color:'var(--fc-ink)', marginBottom:6 }}>
    {children}
    {required && <span style={{ color:'var(--fc-danger)', marginLeft:3 }}>*</span>}
  </label>
);
