import React from 'react';
const skBase = {
  background:'linear-gradient(90deg, var(--fc-sk-from) 0%, var(--fc-sk-to) 50%, var(--fc-sk-from) 100%)',
  backgroundSize:'200% 100%',
  animation:'fc-shimmer 1.4s ease-in-out infinite',
  display:'block',
};

export const Sk = {
  Box:    ({ w='100%', h=14, r='var(--fc-r-sm)', style }) =>
    <span data-fc-sk style={{ ...skBase, width:w, height:h, borderRadius:r, ...style }}/>,

  Circle: ({ size=32, style }) =>
    <span data-fc-sk style={{ ...skBase, width:size, height:size, borderRadius:'var(--fc-r-pill)', ...style }}/>,

  Text:   ({ lines=1, width, h=11, gap=6 }) => (
    <span style={{ display:'flex', flexDirection:'column', gap }}>
      {Array.from({length:lines}).map((_,i)=>(
        <Sk.Box key={i} w={Array.isArray(width)?width[i]??'100%':width??'100%'} h={h}/>
      ))}
    </span>
  ),
};
