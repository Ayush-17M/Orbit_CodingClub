import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function PageTransition() {
  const loc = useLocation();

  useEffect(() => {
    gsap.fromTo(
      '.page-transition',
      { scaleY: 1 },
      {
        scaleY: 0,
        duration: 0.65,
        ease: 'power4.inOut',
        transformOrigin: 'top'
      }
    );
  }, [loc.pathname]);

  return <div className="page-transition" />;
}