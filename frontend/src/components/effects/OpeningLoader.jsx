import React, { useEffect, useState } from 'react';

export default function OpeningLoader() {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const exitTimer = window.setTimeout(
      () => setLeaving(true),
      reducedMotion ? 120 : 2150
    );
    const removeTimer = window.setTimeout(
      () => setVisible(false),
      reducedMotion ? 160 : 3000
    );

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`opening-loader${leaving ? ' opening-loader-leaving' : ''}`}
      aria-label="Loading Orbit"
      role="status"
    >
      <div className="opening-logo-wrap">
        <span className="opening-orbit opening-orbit-one" />
        <span className="opening-orbit opening-orbit-two" />
        <span className="opening-orbit-dot" />
        <img src="/orbitlogo.png" alt="" />
      </div>

      <div className="opening-loader-copy">
        <strong>ORBIT</strong>
        <span>CLUB / LOADING</span>
      </div>

      <div className="opening-progress" />
    </div>
  );
}
