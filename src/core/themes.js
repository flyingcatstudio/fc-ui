// ════════════════════════════════════════════════════════════
// fc-ui · Theme presets
// Each theme is a flat CSS-variable bag — swap the bag,
// the whole UI reskins.
// ════════════════════════════════════════════════════════════

export const FONTS_URL =
  'https://fonts.googleapis.com/css2?' +
  'family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&' +
  'family=IBM+Plex+Sans:wght@400;500;600&' +
  'family=IBM+Plex+Mono:wght@400;500&' +
  'family=Manrope:wght@400;500;600;700&' +
  'family=JetBrains+Mono:wght@400;500&' +
  'family=Press+Start+2P&' +
  'family=Pixelify+Sans:wght@400;500;600;700&' +
  'family=VT323&' +
  'display=swap';

export const THEMES = {
  dashboard: {
    name: 'Dashboard',
    mascot: '◐',
    vars: {
      '--fc-bg':'#f1f5f9','--fc-surface':'#ffffff','--fc-elev':'#f8fafc',
      '--fc-ink':'#0f172a','--fc-ink-2':'#475569','--fc-ink-3':'#94a3b8',
      '--fc-accent':'#2563eb','--fc-accent-2':'#dbeafe',
      '--fc-line':'#e2e8f0','--fc-line-2':'#f1f5f9',
      '--fc-success':'#15803d','--fc-success-2':'#dcfce7',
      '--fc-warn':'#b45309','--fc-warn-2':'#fef3c7',
      '--fc-danger':'#b91c1c','--fc-danger-2':'#fee2e2',
      '--fc-font-display':"'Fraunces', ui-serif, Georgia, serif",
      '--fc-font-body':"'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
      '--fc-font-mono':"'IBM Plex Mono', ui-monospace, Menlo, monospace",
      '--fc-r-sm':'6px','--fc-r-md':'10px','--fc-r-lg':'14px','--fc-r-xl':'16px','--fc-r-pill':'999px',
      '--fc-shadow-card':'0 1px 2px rgba(15,23,42,0.04)',
      '--fc-shadow-pop':'0 8px 24px -10px rgba(15,23,42,0.25)',
      '--fc-sk-from':'#e2e8f0','--fc-sk-to':'#f1f5f9',
      '--fc-display-tracking':'-0.02em','--fc-density':'1','--fc-grid-gap':'12px',
      '--fc-border-width':'1px','--fc-pulse-shadow':'rgba(21,128,61,0.15)',
    },
  },
  glass: {
    name: 'Glass',
    mascot: '◆',
    vars: {
      '--fc-bg':
        'radial-gradient(900px circle at 12% 8%, rgba(255,180,210,0.55), transparent 55%),' +
        'radial-gradient(900px circle at 88% 4%, rgba(180,220,255,0.55), transparent 55%),' +
        'radial-gradient(800px circle at 50% 95%, rgba(210,190,255,0.55), transparent 55%),' +
        '#f3f2f7',
      '--fc-surface':'rgba(255,255,255,0.55)','--fc-elev':'rgba(255,255,255,0.35)',
      '--fc-ink':'#1d1d1f','--fc-ink-2':'#3a3a3c','--fc-ink-3':'#86868b',
      '--fc-accent':'#0a84ff','--fc-accent-2':'rgba(10,132,255,0.14)',
      '--fc-line':'rgba(255,255,255,0.6)','--fc-line-2':'rgba(255,255,255,0.35)',
      '--fc-success':'#30d158','--fc-success-2':'rgba(48,209,88,0.18)',
      '--fc-warn':'#ff9f0a','--fc-warn-2':'rgba(255,159,10,0.18)',
      '--fc-danger':'#ff453a','--fc-danger-2':'rgba(255,69,58,0.18)',
      '--fc-font-display':"'Manrope', -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
      '--fc-font-body':"'Manrope', -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif",
      '--fc-font-mono':"'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
      '--fc-r-sm':'10px','--fc-r-md':'16px','--fc-r-lg':'24px','--fc-r-xl':'32px','--fc-r-pill':'999px',
      '--fc-shadow-card':'inset 0 1px 0 0 rgba(255,255,255,0.6), 0 8px 24px -8px rgba(31,31,46,0.18)',
      '--fc-shadow-pop':'inset 0 1px 0 0 rgba(255,255,255,0.7), 0 24px 48px -12px rgba(31,31,46,0.28)',
      '--fc-sk-from':'rgba(255,255,255,0.3)','--fc-sk-to':'rgba(255,255,255,0.7)',
      '--fc-display-tracking':'-0.022em','--fc-density':'1.1','--fc-grid-gap':'14px',
      '--fc-border-width':'1px','--fc-pulse-shadow':'rgba(48,209,88,0.3)',
    },
  },
  cute: {
    name: '8-bit',
    mascot: '🐱',
    vars: {
      '--fc-bg':'#fef6e4','--fc-surface':'#fffaf0','--fc-elev':'#fbe4d5',
      '--fc-ink':'#172c66','--fc-ink-2':'#001858','--fc-ink-3':'#7d92c4',
      '--fc-accent':'#f582ae','--fc-accent-2':'#ffd6e8',
      '--fc-line':'#172c66','--fc-line-2':'#fbe4d5',
      '--fc-success':'#3fb96a','--fc-success-2':'#d4f3d8',
      '--fc-warn':'#f9bc60','--fc-warn-2':'#fef5d8',
      '--fc-danger':'#e63946','--fc-danger-2':'#ffd6d6',
      '--fc-font-display':"'Press Start 2P', ui-monospace, monospace",
      '--fc-font-body':"'Pixelify Sans', 'VT323', ui-monospace, monospace",
      '--fc-font-mono':"'VT323', ui-monospace, monospace",
      '--fc-r-sm':'0px','--fc-r-md':'0px','--fc-r-lg':'0px','--fc-r-xl':'0px','--fc-r-pill':'0px',
      '--fc-shadow-card':'3px 3px 0 0 #172c66','--fc-shadow-pop':'5px 5px 0 0 #172c66',
      '--fc-sk-from':'#fbe4d5','--fc-sk-to':'#ffd6e8',
      '--fc-display-tracking':'0.02em','--fc-density':'0.55','--fc-grid-gap':'16px',
      '--fc-border-width':'2px','--fc-pulse-shadow':'rgba(63,185,106,0.4)',
    },
  },
};
