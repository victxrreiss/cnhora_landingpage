// src/utils/gsapPin.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createPinnedTimeline({ trigger, end = '+=300%', scrub = 1.2, onUpdate }) {
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top top',
      end,
      scrub,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate,
    },
  });
}
