import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import cnhoraLogo from '/cnhora-logo.svg';

const navLinks = [
  { name: 'Como funciona', href: '#manifesto' },
  { name: 'Para instrutores', href: '#instrutores' },
  { name: 'Preços', href: '#cta' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        {/* Mobile hamburger button */}
        <button
          className="md:hidden mobile-hamburger"
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-drawer"
        >
          {isMenuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>

      </div>

      {/* Mobile navigation drawer */}
      {isMenuOpen && (
        <div id="mobile-nav-drawer" className="mobile-nav-drawer">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#cta"
            className="btn-nav-primary mobile-nav-cta"
            onClick={() => setIsMenuOpen(false)}
          >
            Começar grátis
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
