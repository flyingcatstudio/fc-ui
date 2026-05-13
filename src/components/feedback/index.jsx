import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Inbox, Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import { FcDot } from '../tags/index.jsx';

export const FcAlert = ({ tone='info', title, children, onClose }) => {
  const tones = {
    info:    { bg:'var(--fc-accent-2)', fg:'var(--fc-accent)', icon:Info },
    success: { bg:'var(--fc-success-2)', fg:'var(--fc-success)', icon:CheckCircle2 },
    warn:    { bg:'var(--fc-warn-2)', fg:'var(--fc-warn)', icon:AlertTriangle },
    danger:  { bg:'var(--fc-danger-2)', fg:'var(--fc-danger)', icon:XCircle },
  };
  const Icon = tones[tone].icon;
  return (
    <div data-fc-glass style={{
      display:'flex', gap:12, padding:'12px 14px', background:tones[tone].bg,
      border:'var(--fc-border-width) solid', borderColor:tones[tone].fg,
      borderRadius:'var(--fc-r-md)', alignItems:'flex-start',
    }}>
      <Icon size={16} color={tones[tone].fg} style={{ flexShrink:0, marginTop:2 }}/>
      <div style={{ flex:1, fontSize:13 }}>
        {title && <div style={{ fontWeight:600, color:tones[tone].fg, marginBottom:2 }}>{title}</div>}
        <div style={{ color:'var(--fc-ink-2)' }}>{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} style={{
          background:'transparent', border:'none', cursor:'pointer',
          color:tones[tone].fg, padding:0, display:'grid', placeItems:'center',
        }}>
          <X size={14}/>
        </button>
      )}
    </div>
  );
};

const ToastCtx = createContext(null);
export const useToast = () => useContext(ToastCtx);

export function FcToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((toast) => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, ...toast }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), toast.duration ?? 3000);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div style={{
        position:'fixed', bottom:64, right:18, zIndex:100,
        display:'flex', flexDirection:'column', gap:8, maxWidth:360,
      }}>
        {toasts.map(t => (
          <div key={t.id} data-fc-glass style={{
            display:'flex', alignItems:'center', gap:10, padding:'10px 14px',
            background:'var(--fc-surface)',
            border:'var(--fc-border-width) solid var(--fc-line)',
            borderRadius:'var(--fc-r-md)', boxShadow:'var(--fc-shadow-pop)',
            fontSize:13, color:'var(--fc-ink)',
            animation:'fc-slidein 0.25s ease-out',
          }}>
            <FcDot size={8} color={
              t.tone==='danger'?'var(--fc-danger)' :
              t.tone==='warn'?'var(--fc-warn)' :
              'var(--fc-success)'
            }/>
            <span style={{ flex:1 }}>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const FcEmpty = ({ icon:Icon=Inbox, title='Nothing here', message, action }) => (
  <div style={{
    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
    padding:'40px 20px', gap:10, textAlign:'center',
  }}>
    <div style={{
      width:48, height:48, display:'grid', placeItems:'center',
      background:'var(--fc-elev)',
      border:'var(--fc-border-width) solid var(--fc-line)',
      borderRadius:'var(--fc-r-md)', color:'var(--fc-ink-3)',
    }}>
      <Icon size={20}/>
    </div>
    <div style={{ fontSize:14, fontWeight:600, color:'var(--fc-ink)' }}>{title}</div>
    {message && <div style={{ fontSize:12, color:'var(--fc-ink-2)', maxWidth:280 }}>{message}</div>}
    {action && <div style={{ marginTop:6 }}>{action}</div>}
  </div>
);

export const FcTooltip = ({ label, children, side='top' }) => {
  const [show, setShow] = useState(false);
  const positions = {
    top:    { bottom:'calc(100% + 6px)', left:'50%', transform:'translateX(-50%)' },
    bottom: { top:'calc(100% + 6px)',    left:'50%', transform:'translateX(-50%)' },
  };
  return (
    <span style={{ position:'relative', display:'inline-block' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span style={{
          position:'absolute', ...positions[side], zIndex:50,
          padding:'5px 9px', background:'var(--fc-ink)', color:'#fff',
          fontSize:11, fontWeight:500, borderRadius:'var(--fc-r-sm)',
          whiteSpace:'nowrap', pointerEvents:'none',
          animation:'fc-fadein 0.15s',
        }}>{label}</span>
      )}
    </span>
  );
};

export const FcModal = ({ open, onClose, title, children, footer }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = e => e.key==='Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.4)',
      backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)',
      display:'grid', placeItems:'center', zIndex:200, padding:20,
      animation:'fc-fadein 0.18s',
    }}>
      <div onClick={e=>e.stopPropagation()} data-fc-glass style={{
        background:'var(--fc-surface)',
        border:'var(--fc-border-width) solid var(--fc-line)',
        borderRadius:'var(--fc-r-lg)', boxShadow:'var(--fc-shadow-pop)',
        maxWidth:480, width:'100%',
        animation:'fc-fadein 0.2s ease-out',
      }}>
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'16px 20px',
          borderBottom:'var(--fc-border-width) solid var(--fc-line-2)',
        }}>
          <div style={{ fontSize:14, fontWeight:600 }}>{title}</div>
          <button onClick={onClose} style={{
            background:'transparent', border:'none', cursor:'pointer',
            color:'var(--fc-ink-3)', display:'grid', placeItems:'center',
          }}>
            <X size={16}/>
          </button>
        </div>
        <div style={{ padding:'18px 20px', fontSize:13, color:'var(--fc-ink-2)', lineHeight:1.6 }}>{children}</div>
        {footer && (
          <div style={{
            display:'flex', justifyContent:'flex-end', gap:8, padding:'14px 20px',
            borderTop:'var(--fc-border-width) solid var(--fc-line-2)',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
