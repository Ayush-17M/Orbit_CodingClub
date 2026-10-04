import React, { useRef } from 'react';

export default function MagneticButton({
  children,
  className = '',
  ...props
}) {
  const ref = useRef();

  const move = (e) => {
    if (!ref.current) return;

    const r = ref.current.getBoundingClientRect();

    const x =
      (e.clientX - r.left - r.width / 2) * 0.12;

    const y =
      (e.clientY - r.top - r.height / 2) * 0.12;

    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const leave = () => {
    if (!ref.current) return;

    ref.current.style.transform =
      'translate(0, 0)';
  };

  return (
    <button
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={move}
      onMouseLeave={leave}
      {...props}
    >
      {children}
    </button>
  );
}