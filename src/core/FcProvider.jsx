import { createContext, useContext, useMemo, useState } from 'react';
import { THEMES, FONTS_URL } from './themes.js';

const FcCtx = createContext({ theme: 'dashboard', setTheme: () => {} });
export const useFc = () => useContext(FcCtx);

export function FcProvider({ children, defaultTheme = 'dashboard' }) {
  const [theme, setTheme] = useState(defaultTheme);
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  const vars = THEMES[theme].vars;

  return (
    <FcCtx.Provider value={value}>
      <link rel="stylesheet" href={FONTS_URL} />
      <style>{`
        @keyframes fc-shimmer { 0%{background-position:200% 0;} 100%{background-position:-200% 0;} }
        @keyframes fc-pulse   { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.6);opacity:0;} }
        @keyframes fc-float   { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-3px);} }
        @keyframes fc-bounce  { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-4px);} }
        @keyframes fc-spin    { to { transform: rotate(360deg); } }
        @keyframes fc-fadein  { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fc-slidein { from { opacity: 0; transform: translateX(8px); } to { opacity: 1; transform: translateX(0); } }
        * { box-sizing: border-box; }
        input, button, textarea, select { font-family: inherit; }

        /* Glass theme: backdrop blur */
        [data-fc-theme="glass"] { background-attachment: fixed !important; }
        [data-fc-theme="glass"] [data-fc-slot],
        [data-fc-theme="glass"] [data-fc-glass] {
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
        }
        [data-fc-theme="glass"] [data-fc-slot] { position: relative; }
        [data-fc-theme="glass"] [data-fc-slot]::before {
          content:''; position:absolute; top:0; left:16px; right:16px; height:1px;
          background:linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);
          pointer-events:none;
        }

        /* 8-bit theme: pixel scanlines + press effect */
        [data-fc-theme="cute"] { image-rendering: pixelated; }
        [data-fc-theme="cute"]::before {
          content:''; position:fixed; inset:0;
          background:repeating-linear-gradient(transparent 0, transparent 2px, rgba(23,44,102,0.05) 2px, rgba(23,44,102,0.05) 3px);
          pointer-events:none; z-index:200; mix-blend-mode:multiply;
        }
        [data-fc-theme="cute"] [data-fc-sk] { animation: fc-shimmer 1.6s steps(8, end) infinite !important; }
        [data-fc-theme="cute"] [data-fc-mascot] { animation: fc-bounce 0.8s steps(2, end) infinite !important; }
        [data-fc-theme="cute"] button:active { transform: translate(2px,2px); box-shadow: 1px 1px 0 0 #172c66 !important; }
        [data-fc-theme="cute"] .fc-display { line-height: 1.4 !important; }
      `}</style>
      <div
        className="fc-root"
        data-fc-theme={theme}
        style={{
          ...vars,
          background: 'var(--fc-bg)',
          backgroundAttachment: 'fixed',
          color: 'var(--fc-ink)',
          fontFamily: 'var(--fc-font-body)',
          minHeight: '100vh',
        }}
      >
        {children}
      </div>
    </FcCtx.Provider>
  );
}
