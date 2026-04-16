import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import cnhoraLogo from '/cnhora-logo.svg';

const navLinks = [
  { name: 'Como funciona', href: '#manifesto' },
  { name: 'Para instrutores', href: '#instrutores' },
  { name: 'Preços', href: '#cta' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.97 }}
            className="btn-nav-primary"
          >
            Começar grátis
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t overflow-hidden"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
          >
            <div className="px-8 py-6 flex flex-col gap-5">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-semibold"
                  style={{ color: 'rgba(200,220,255,0.85)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#cta"
                className="btn-nav-primary justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Começar grátis
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
