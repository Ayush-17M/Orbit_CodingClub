import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [p, setP] = useState({
    x: -100,
    y: -100,
    active: false,
    label: ''
  });

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;

    const move = (e) => {
      const el = e.target.closest('a,button,[data-cursor]');

      setP({
        x: e.clientX,
        y: e.clientY,
        active: !!el,
        label: el?.dataset.cursor || ''
      });
    };

    window.addEventListener('mousemove', move);

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <div
      className={`cursor ${p.active ? 'cursor-active' : ''}`}
      style={{
        left: p.x,
        top: p.y
      }}
    >
      {p.label}
    </div>
  );
}