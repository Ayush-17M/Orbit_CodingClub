import { gsap } from './gsapConfig';

export function revealUp(
  elements,
  {
    y = 60,
    duration = 0.8,
    stagger = 0.1,
    delay = 0,
    ease = 'power3.out'
  } = {}
) {
  if (!elements) return null;

  return gsap.fromTo(
    elements,
    {
      y,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease
    }
  );
}

export function revealBlur(
  elements,
  {
    y = 50,
    blur = 8,
    duration = 1,
    stagger = 0.08,
    ease = 'power3.out'
  } = {}
) {
  if (!elements) return null;

  return gsap.fromTo(
    elements,
    {
      y,
      opacity: 0,
      filter: `blur(${blur}px)`
    },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration,
      stagger,
      ease
    }
  );
}

export function revealScale(
  elements,
  {
    scale = 0.96,
    duration = 0.8,
    stagger = 0.08,
    ease = 'power3.out'
  } = {}
) {
  if (!elements) return null;

  return gsap.fromTo(
    elements,
    {
      scale,
      opacity: 0
    },
    {
      scale: 1,
      opacity: 1,
      duration,
      stagger,
      ease
    }
  );
}
