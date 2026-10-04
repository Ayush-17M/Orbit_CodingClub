import { gsap } from './gsapConfig';

export function scrollReveal(
  elements,
  options = {}
) {
  if (!elements) return [];

  const {
    y = 60,
    duration = 0.8,
    stagger = 0.1,
    start = 'top 85%',
    once = true,
    blur = 0
  } = options;

  return gsap.fromTo(
    elements,
    {
      y,
      opacity: 0,
      filter: blur ? `blur(${blur}px)` : 'none'
    },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      filter: 'blur(0px)',
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements,
        start,
        once
      }
    }
  );
}

export function parallax(
  element,
  {
    yPercent = -20,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
    trigger = element
  } = {}
) {
  if (!element) return null;

  return gsap.to(element, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub
    }
  });
}

export function horizontalScroll(
  track,
  section
) {
  if (!track || !section) return null;

  const getDistance = () =>
    Math.max(
      0,
      track.scrollWidth -
        window.innerWidth
    );

  return gsap.to(track, {
    x: () => -getDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      end: () =>
        `+=${getDistance()}`
    }
  });
}
