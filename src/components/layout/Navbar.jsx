import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import cnhoraLogo from '/cnhora-logo.svg';
import { useDevicePerformance } from '../../hooks';

const navLinks = [
  { name: 'Como funciona', href: '#manifesto' },
  { name: 'Para instrutores', href: '#instrutores' },
  { name: 'Preços', href: '#cta' },
];

const Navbar = () => {
  const { animationLevel } = useDevicePerformance();
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldAnimate = animationLevel === 'full';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-400 ${
        isScrolled
          ? 'glass-nav border-b border-white/5 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, x: -20 } : false}
          animate={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
          className="flex items-center gap-2.5"
        >
          <img src={cnhoraLogo} alt="CNHora Logo" className="h-7 w-auto" />
          <span
            className="text-xl font-black tracking-tight"
            style={{ color: 'white' }}
          >
            CN<span style={{ color: '#FF6B00' }}>Hora</span>
          </span>
        </motion.div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={shouldAnimate ? { opacity: 0, y: -10 } : false}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={shouldAnimate ? { delay: i * 0.1 } : undefined}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: 'rgba(200,220,255,0.7)' }}
              onMouseEnter={e => (e.target.style.color = 'white')}
              onMouseLeave={e => (e.target.style.color = 'rgba(200,220,255,0.7)')}
            >
              {link.name}
            </motion.a>
          ))}

          <motion.a
            href="#cta"
            initial={shouldAnimate ? { opacity: 0, y: -10 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={shouldAnimate ? { delay: 0.3 } : undefined}
            whileTap={shouldAnimate ? { scale: 0.97 } : undefined}
            className="btn-nav-primary"
          >
            Começar grátis
          </motion.a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
