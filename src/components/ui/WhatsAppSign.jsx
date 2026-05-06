import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '554191057535';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const DEFAULT_BOTTOM = 32; // px — resting position
const FOOTER_GAP = 20;     // px gap between button bottom edge and footer top

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="white"
    width="30"
    height="30"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.107 1.523 5.836L.057 24l6.304-1.654A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5-1.373l-.358-.214-3.717.975.992-3.622-.234-.372A9.78 9.78 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

const WhatsAppSign = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    let rafId;

    // Poll every animation frame — GSAP scrub lerps the panel transform on each
    // RAF tick, so scroll events alone miss intermediate frames. Reading
    // getBoundingClientRect() here always reflects the current post-transform position.
    const loop = () => {
      if (wrapperRef.current) {
        const rect = footer.getBoundingClientRect();
        const vh = window.innerHeight;
        const bottom =
          rect.top < vh
            ? Math.max(DEFAULT_BOTTOM, vh - rect.top + FOOTER_GAP)
            : DEFAULT_BOTTOM;
        wrapperRef.current.style.bottom = bottom + 'px';
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="whatsapp-sign-wrapper"
      style={{ bottom: DEFAULT_BOTTOM + 'px' }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        {/* Circular sign plate */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-sign"
          aria-label="Fale conosco pelo WhatsApp"
        >
          <WhatsAppIcon />
        </a>

        {/* Horizontal arm to right edge */}
        <div className="whatsapp-sign-post" />
        <div className="whatsapp-sign-base" />
      </motion.div>
    </div>
  );
};

export default WhatsAppSign;
