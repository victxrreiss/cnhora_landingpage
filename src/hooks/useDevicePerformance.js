import { useEffect, useState } from 'react';
import { applyDevicePerformanceClass, detectDevicePerformance } from '../utils/devicePerformance';

const listen = (target, event, handler) => {
  if (!target) return () => {};

  if (target.addEventListener) {
    target.addEventListener(event, handler);
    return () => target.removeEventListener(event, handler);
  }

  if (target.addListener) {
    target.addListener(handler);
    return () => target.removeListener(handler);
  }

  return () => {};
};

export const useDevicePerformance = () => {
  const [profile, setProfile] = useState(() => detectDevicePerformance());

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setProfile(applyDevicePerformanceClass(detectDevicePerformance()));
      });
    };

    update();

    const cleanup = [
      listen(window, 'resize', update),
      listen(window, 'orientationchange', update),
    ];

    if (window.matchMedia) {
      cleanup.push(listen(window.matchMedia('(prefers-reduced-motion: reduce)'), 'change', update));
      cleanup.push(listen(window.matchMedia('(pointer: coarse)'), 'change', update));
    }

    return () => {
      cancelAnimationFrame(rafId);
      cleanup.forEach((stop) => stop());
    };
  }, []);

  return profile;
};
