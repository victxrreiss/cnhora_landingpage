import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cnhoraLogo from '/cnhora-logo.svg';
import Features from './Features';

gsap.registerPlugin(ScrollTrigger);

/* ─── Perspective grid SVG ─── */
const PerspectiveGrid = React.forwardRef((_, ref) => (
  <div
    ref={ref}
    style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: '55%', zIndex: 3, opacity: 0.18,
      pointerEvents: 'none', overflow: 'hidden',
    }}
  >
    <svg viewBox="0 0 1200 600" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="40%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="gridMask">
          <rect width="1200" height="600" fill="url(#gridFade)" />
        </mask>
      </defs>
      <g mask="url(#gridMask)" stroke="rgba(100,160,255,0.5)" strokeWidth="0.8" fill="none">
        <line x1="0" y1="600" x2="1200" y2="600" />
        <line x1="100" y1="540" x2="1100" y2="540" />
        <line x1="200" y1="490" x2="1000" y2="490" />
        <line x1="280" y1="450" x2="920" y2="450" />
        <line x1="340" y1="418" x2="860" y2="418" />
        <line x1="390" y1="392" x2="810" y2="392" />
        <line x1="430" y1="370" x2="770" y2="370" />
        <line x1="460" y1="352" x2="740" y2="352" />
        <line x1="485" y1="337" x2="715" y2="337" />
        <line x1="505" y1="324" x2="695" y2="324" />
        <line x1="520" y1="313" x2="680" y2="313" />
        <line x1="533" y1="304" x2="667" y2="304" />
        <line x1="543" y1="296" x2="657" y2="296" />
        <line x1="552" y1="289" x2="648" y2="289" />
        <line x1="559" y1="283" x2="641" y2="283" />
        <line x1="600" y1="280" x2="0" y2="600" />
        <line x1="600" y1="280" x2="120" y2="600" />
        <line x1="600" y1="280" x2="240" y2="600" />
        <line x1="600" y1="280" x2="360" y2="600" />
        <line x1="600" y1="280" x2="480" y2="600" />
        <line x1="600" y1="280" x2="600" y2="600" />
        <line x1="600" y1="280" x2="720" y2="600" />
        <line x1="600" y1="280" x2="840" y2="600" />
        <line x1="600" y1="280" x2="960" y2="600" />
        <line x1="600" y1="280" x2="1080" y2="600" />
        <line x1="600" y1="280" x2="1200" y2="600" />
      </g>
    </svg>
  </div>
));

/* ─── Main Hero component ─── */
const Hero = () => {
  const [activeTab, setActiveTab] = useState('aluno');
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const animGroupRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const gridRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const finalRef = useRef(null);
  const progressRef = useRef(null);
  const indicatorRef = useRef(null);

  const goToCards = (tab) => {
    setActiveTab(tab);
    const heroTop = heroRef.current
      ? heroRef.current.getBoundingClientRect().top + window.scrollY
      : 0;
    window.scrollTo({ top: heroTop + window.innerHeight * 2.8, behavior: 'smooth' });
  };

  /* ─── Three.js particles ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const COUNT = 180;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      const orange = Math.random() > 0.5;
      colors[i * 3] = orange ? 1.0 : 0.0;
      colors[i * 3 + 1] = orange ? 0.42 + Math.random() * 0.2 : 0.3 + Math.random() * 0.3;
      colors[i * 3 + 2] = orange ? 0.0 : 0.8 + Math.random() * 0.2;
      sizes[i] = Math.random() * 3 + 1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.06, vertexColors: true, transparent: true,
      opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = e => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    document.addEventListener('mousemove', onMouseMove);

    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = Date.now() * 0.0003;
      particles.rotation.y = t * 0.15 + mouseX;
      particles.rotation.x = t * 0.08 + mouseY;
      const pos = geo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += Math.sin(t + i) * 0.002;
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  /* ─── GSAP scroll timeline ─── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Initial states
    gsap.set(finalRef.current, { opacity: 1, x: 0 });
    gsap.set(animGroupRef.current, { opacity: 1, x: 0, scale: 1 });
    gsap.set(cardsContainerRef.current, { opacity: 0, x: '100vw' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=450%',
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    // 1. Initial Content Fade Out (Hero Text + Logo Animation)
    tl.to(finalRef.current, { 
      opacity: 0, 
      y: -50, 
      duration: 3,
      ease: 'power2.inOut'
    }, 0);

    tl.to(animGroupRef.current, { 
      opacity: 0, 
      scale: 0.8,
      x: 100,
      duration: 3,
      ease: 'power2.inOut'
    }, 0);
    
    tl.to(gridRef.current, { opacity: 0.4, duration: 2, ease: 'power1.in' }, 0);
    tl.to(gridRef.current, { opacity: 0, duration: 2, ease: 'power2.in' }, 2);

    // 2. Feature cards slide-in from right and occupy the whole screen
    tl.fromTo(cardsContainerRef.current, 
      { x: '100vw', opacity: 0 },
      { x: '0vw', opacity: 1, ease: 'expo.out', duration: 4 },
      2.5
    );

    // Stagger individual cards within the container
    cardRefs.current.forEach((card, index) => {
      tl.fromTo(card,
        { x: 150, opacity: 0, scale: 0.8, filter: 'blur(10px)' },
        { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'back.out(1.2)', duration: 2.5 },
        3.5 + (index * 0.5)
      );
    });

    // Enable pointer events appropriately
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      onEnter: () => {
        if (finalRef.current) finalRef.current.style.pointerEvents = 'auto';
      }
    });

    ScrollTrigger.create({
      trigger: hero,
      start: '+=250%',
      onEnter: () => {
        if (cardsContainerRef.current) cardsContainerRef.current.style.pointerEvents = 'auto';
        if (finalRef.current) finalRef.current.style.pointerEvents = 'none';
      },
      onLeaveBack: () => {
        if (cardsContainerRef.current) cardsContainerRef.current.style.pointerEvents = 'none';
        if (finalRef.current) finalRef.current.style.pointerEvents = 'auto';
      }
    });

    // Mouse parallax on logo (active only when visible)
    const onParallax = e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      const logoGroup = animGroupRef.current;
      if (logoGroup && parseFloat(getComputedStyle(logoGroup).opacity) > 0.1) {
        gsap.to(logoGroup, { x: x, y: y, duration: 1.5, ease: 'power2.out', overwrite: 'auto' });
      }
    };
    document.addEventListener('mousemove', onParallax);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
      document.removeEventListener('mousemove', onParallax);
    };
  }, []);

  /* ─── Custom cursor ─── */
  useEffect(() => {
    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    const onMove = e => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      setTimeout(() => {
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
      }, 80);
    };
    document.addEventListener('mousemove', onMove);

    const enlarge = () => { dot.classList.add('enlarged'); ring.classList.add('enlarged'); };
    const shrink = () => { dot.classList.remove('enlarged'); ring.classList.remove('enlarged'); };
    const targets = document.querySelectorAll('a, button');
    targets.forEach(el => { el.addEventListener('mouseenter', enlarge); el.addEventListener('mouseleave', shrink); });

    return () => {
      document.removeEventListener('mousemove', onMove);
      targets.forEach(el => { el.removeEventListener('mouseenter', enlarge); el.removeEventListener('mouseleave', shrink); });
      dot.remove();
      ring.remove();
    };
  }, []);

  /* ─── Progress bar + scroll indicator ─── */
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.width = ((scrollTop / docHeight) * 100) + '%';
      }
      if (indicatorRef.current) {
        indicatorRef.current.style.opacity = scrollTop > 200 ? '0' : '1';
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div ref={progressRef} id="hero-progress-bar" />

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        style={{
          position: 'fixed', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 100,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '0.5rem', opacity: 1, transition: 'opacity 0.5s', pointerEvents: 'none',
        }}
      >
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span className="scroll-text">Role para explorar</span>
      </div>

      {/* ─── Pinned hero section ─── */}
      <section
        ref={heroRef}
        style={{
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #003366 0%, #001428 50%, #000810 100%)',
        }}
      >
        {/* Three.js canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none',
          }}
        />

        {/* Ambient light */}
        <div className="ambient-light" style={{ zIndex: 2 }} />

        {/* Perspective grid */}
        <PerspectiveGrid ref={gridRef} />

        {/* Animation Group (Logo + Rings) - Positioned Right */}
        <div ref={animGroupRef} className="hero-animation-group">
          {/* Orbital rings - absolute centered in group */}
          <div
            ref={ring1Ref}
            className="orbital-ring ring-1"
            style={{ width: 380, height: 360, border: '1px solid rgba(255,107,0,0.25)', zIndex: 15 }}
          />
          <div
            ref={ring2Ref}
            className="orbital-ring ring-2"
            style={{ width: 460, height: 440, border: '1px solid rgba(0,102,204,0.25)', zIndex: 15 }}
          />
          <div
            ref={ring3Ref}
            className="orbital-ring ring-3"
            style={{ width: 540, height: 520, border: '1px solid rgba(255,107,0,0.12)', zIndex: 15 }}
          />

          {/* Logo container - relative centered in group */}
          <div className="logo-container">
            <div
              ref={logoRef}
              style={{
                width: 280, height: 280,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                filter: 'drop-shadow(0 0 35px rgba(255,107,0,0.45)) drop-shadow(0 0 70px rgba(0,100,255,0.25))',
              }}
            >
              <img
                src={cnhoraLogo}
                alt="CNHora"
                className="logo-glow-anim"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        {/* Features section — tab switcher + cards */}
        <Features
          ref={cardsContainerRef}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cardRefs={cardRefs}
        />

        {/* Main hero content - Positioned Left */}
        <div ref={finalRef} className="hero-content-wrapper">
          {/* Badge */}
          <div className="hero-badge">
            <span className="dot" />
            O marketplace da educação no trânsito
          </div>

          {/* Title */}
          <h1 className="hero-title">
            Seu tempo.<br />
            <span className="highlight">Sua direção.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Conectamos alunos a instrutores independentes com tecnologia de ponta.
            Agende aulas, faça simulados e conquiste sua CNH sem burocracia.
          </p>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">+12k</div>
              <div className="stat-label">Alunos aprovados</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">+800</div>
              <div className="stat-label">Instrutores ativos</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">4.9★</div>
              <div className="stat-label">Avaliação média</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="btn-cta-group">
            <a href="#cta" className="btn-primary" onClick={(e) => { e.preventDefault(); goToCards('aluno'); }}>
              Sou Aluno
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a href="#instrutores" className="btn-secondary" onClick={(e) => { e.preventDefault(); goToCards('instrutor'); }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Sou Instrutor
            </a>
            <button className="btn-download">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Baixar App
            </button>
          </div>

          {/* Trust badges */}
          <div className="trust-badges">
            <div className="trust-badge">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              LGPD Compliant
            </div>
            <div className="trust-badge">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Pagamento Seguro
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
