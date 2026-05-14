import React, { useEffect, useState } from 'react';
import catStareUrl from '../assets/cat_stare.png';

const FIRST_DELAY_MS = 1500;
const INTERVAL_MIN_MS = 5 * 60 * 1000;
const INTERVAL_MAX_MS = 7 * 60 * 1000;
const SLIDE_IN_MS = 650;
const HOLD_MS = 2400;
const SLIDE_OUT_MS = 550;
const CYCLE_MS = SLIDE_IN_MS + HOLD_MS + SLIDE_OUT_MS;

const CAT_W = 160;
const CAT_ASPECT = 454 / 512;
const CAT_H = Math.round(CAT_W * CAT_ASPECT);
const EDGE_GAP = 18;

const KEYFRAMES_ID = 'fc-cat-keyframes';
const KEYFRAMES_CSS = `
@keyframes fc-cat-slide-right {
  0%   { transform: translateX(calc(100% + ${EDGE_GAP * 2}px)); }
  ${((SLIDE_IN_MS / CYCLE_MS) * 100).toFixed(2)}%  { transform: translateX(0); }
  ${(((SLIDE_IN_MS + HOLD_MS) / CYCLE_MS) * 100).toFixed(2)}%  { transform: translateX(0); }
  100% { transform: translateX(calc(100% + ${EDGE_GAP * 2}px)); }
}
@keyframes fc-cat-slide-left {
  0%   { transform: translateX(calc(-100% - ${EDGE_GAP * 2}px)); }
  ${((SLIDE_IN_MS / CYCLE_MS) * 100).toFixed(2)}%  { transform: translateX(0); }
  ${(((SLIDE_IN_MS + HOLD_MS) / CYCLE_MS) * 100).toFixed(2)}%  { transform: translateX(0); }
  100% { transform: translateX(calc(-100% - ${EDGE_GAP * 2}px)); }
}
`;

const ensureKeyframes = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAMES_ID)) return;
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = KEYFRAMES_CSS;
  document.head.appendChild(style);
};

const rand = (lo, hi) => lo + Math.random() * (hi - lo);

export function FcCat() {
  const [visit, setVisit] = useState(null);

  useEffect(() => {
    ensureKeyframes();
    let timer = null;
    let cancelled = false;

    const show = () => {
      if (cancelled) return;
      const fromLeft = Math.random() < 0.5;
      setVisit({ id: Date.now(), fromLeft });
      timer = setTimeout(() => {
        if (cancelled) return;
        setVisit(null);
        timer = setTimeout(show, rand(INTERVAL_MIN_MS, INTERVAL_MAX_MS));
      }, CYCLE_MS);
    };

    timer = setTimeout(show, FIRST_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  if (!visit) return null;

  const sideStyle = visit.fromLeft
    ? { left: EDGE_GAP }
    : { right: EDGE_GAP };
  const animation = visit.fromLeft
    ? `fc-cat-slide-left ${CYCLE_MS}ms ease-in-out forwards`
    : `fc-cat-slide-right ${CYCLE_MS}ms ease-in-out forwards`;

  return (
    <div
      key={visit.id}
      data-fc-cat
      aria-hidden="true"
      style={{
        position: 'fixed',
        bottom: '14%',
        ...sideStyle,
        width: CAT_W,
        height: CAT_H,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 80,
        animation,
        willChange: 'transform',
      }}
    >
      <img
        src={catStareUrl}
        alt=""
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none',
          userSelect: 'none',
          transform: visit.fromLeft ? 'scaleX(-1)' : 'none',
          filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.18))',
        }}
      />
    </div>
  );
}

export default FcCat;
