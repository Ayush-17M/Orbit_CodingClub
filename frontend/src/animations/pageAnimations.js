import { gsap } from './gsapConfig';

export function pageEnter(container) {
  if (!container) return;

  return gsap.fromTo(
    container,
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out'
    }
  );
}

export function pageExit(container) {
  if (!container) return;

  return gsap.to(container, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: 'power2.in'
  });
}

export function staggerPageEnter(
  elements
) {
  if (!elements) return;

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 40
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out'
    }
  );
}
