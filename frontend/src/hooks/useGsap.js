import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useGsap(callback, deps = []) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    const ctx = gsap.context(() => {
      callback(gsap, ScrollTrigger, ref.current);
    }, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
