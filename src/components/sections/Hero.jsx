import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cnhoraLogo from '/cnhora-logo.svg';
import Features from './Features';
import { isWebGLSupported } from '../../utils';

const HeroFallback = () => (
  <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #003366 0%, #001428 50%, #000810 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
    <div style={{ maxWidth: 600, textAlign: 'center', color: '#fff' }}>
      <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: '#ff6b00', fontWeight: 600, letterSpacing: '0.05em' }}>
        O marketplace da educação no trânsito
      </div>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem' }}>
        Seu tempo.<br /><span style={{ color: '#ff6b00' }}>Sua direção.</span>
      </h1>
      <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.7 }}>
        Conectamos alunos a instrutores independentes com tecnologia de ponta.
        Agende aulas, faça simulados e conquiste sua CNH sem burocracia.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <a href="#cta" style={{ background: '#ff6b00', color: '#fff', padding: '0.9rem 2rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>Sou Aluno</a>
        <a href="#instrutores" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '0.9rem 2rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>Sou Instrutor</a>
      </div>
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
        <span><strong style={{ color: '#fff', fontSize: '1.2rem' }}>+12k</strong><br />Alunos aprovados</span>
        <span><strong style={{ color: '#fff', fontSize: '1.2rem' }}>+800</strong><br />Instrutores ativos</span>
        <span><strong style={{ color: '#fff', fontSize: '1.2rem' }}>4.9★</strong><br />Avaliação média</span>
      </div>
    </div>
  </div>
);

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_TOPICS = [
  {
    titleParts: ['Tenha a área da sua aula no ', 'mapa', ''],
    desc: 'O instrutor define previamente o local da aula. O aluno chega sabendo exatamente onde vai ser.',
    gradient: 'linear-gradient(135deg, #003366 0%, #002244 100%)',
    screenIcon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    screenLabel: 'Área da Aula',
    screenContent: (
      <>
        <div className="screen-app-bar" style={{ background: 'rgba(0,30,60,0.95)' }}>
          <div className="screen-app-bar-back" />
          <span className="screen-app-bar-title">Área da Aula</span>
        </div>
        <div className="screen-map" style={{ background: 'linear-gradient(180deg, #001e3c 0%, #002a52 100%)' }}>
          <div className="screen-map-grid" />
          <div className="screen-map-road-h" style={{ top: '38%', left: '10%', right: '10%' }} />
          <div className="screen-map-road-h" style={{ top: '62%', left: '5%', right: '5%' }} />
          <div className="screen-map-road-v" style={{ left: '35%', top: '10%', bottom: '10%' }} />
          <div className="screen-map-road-v" style={{ left: '65%', top: '10%', bottom: '10%' }} />
          <div className="screen-pin-marker">
            <div className="screen-pin-dot" />
            <div className="screen-pin-shadow" />
          </div>
        </div>
        <div className="screen-bottom-card">
          <div className="screen-card-title">Rua das Acácias, 42</div>
          <div className="screen-card-row">
            <span className="screen-tag screen-tag-orange">Aula às 14h</span>
            <span className="screen-tag screen-tag-blue">15 min</span>
          </div>
        </div>
      </>
    ),
  },
  {
    titleParts: ['Veja onde você ', 'errou', ', para não errar de novo'],
    desc: 'Erros registrados no mapa com localização exata. Aluno evolui, instrutor acompanha.',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #0d0222 100%)',
    screenIcon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    screenLabel: 'Mapa de Erros',
    screenContent: (
      <>
        <div className="screen-app-bar" style={{ background: 'rgba(18,0,32,0.95)' }}>
          <div className="screen-app-bar-back" />
          <span className="screen-app-bar-title">Mapa de Erros</span>
        </div>
        <div className="screen-map" style={{ background: 'linear-gradient(180deg, #120020 0%, #1a0030 100%)' }}>
          <div className="screen-map-grid" />
          <div className="screen-map-road-h" style={{ top: '45%', left: '5%', right: '5%' }} />
          <div className="screen-map-road-v" style={{ left: '50%', top: '5%', bottom: '5%' }} />
          <div className="screen-error-pin" style={{ background: '#FF3B30', top: '30%', left: '30%' }} />
          <div className="screen-error-pin" style={{ background: '#FF9500', top: '55%', left: '60%' }} />
          <div className="screen-error-pin" style={{ background: '#FF3B30', top: '65%', left: '25%' }} />
          <div className="screen-error-pin" style={{ background: '#FF9500', top: '25%', left: '65%' }} />
        </div>
        <div className="screen-bottom-card">
          <div className="screen-card-title">Últimos erros registrados</div>
          <div className="screen-card-row">
            <span className="screen-tag" style={{ background: 'rgba(255,59,48,0.2)', color: '#FF6B6B' }}>4 erros</span>
            <span className="screen-tag screen-tag-blue">Zona Sul</span>
          </div>
        </div>
      </>
    ),
  },
  {
    titleParts: ['Painel ', 'financeiro', ' completo'],
    desc: 'Controle de ganhos, aulas confirmadas e histórico de pagamentos em um único lugar.',
    gradient: 'linear-gradient(135deg, #1a2a00 0%, #0d1500 100%)',
    screenIcon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    screenLabel: 'Financeiro',
    screenContent: (
      <>
        <div className="screen-app-bar" style={{ background: 'rgba(10,18,0,0.95)' }}>
          <div className="screen-app-bar-back" />
          <span className="screen-app-bar-title">Financeiro</span>
        </div>
        <div className="screen-finance-balance">
          <div className="screen-balance-label">Saldo disponível</div>
          <div className="screen-balance-value">R$ 2.840</div>
          <div className="screen-balance-change">↑ +R$ 360 esta semana</div>
        </div>
        <div className="screen-divider" />
        <div className="screen-tx-list">
          <div className="screen-tx-item">
            <div className="screen-tx-info">
              <div className="screen-tx-label">Aula confirmada</div>
              <div className="screen-tx-sub">Hoje, 14:00</div>
            </div>
            <div className="screen-tx-amount positive">+R$ 180</div>
          </div>
          <div className="screen-tx-item">
            <div className="screen-tx-info">
              <div className="screen-tx-label">Pagamento recebido</div>
              <div className="screen-tx-sub">Ontem</div>
            </div>
            <div className="screen-tx-amount positive">+R$ 360</div>
          </div>
          <div className="screen-tx-item">
            <div className="screen-tx-info">
              <div className="screen-tx-label">Aula agendada</div>
              <div className="screen-tx-sub">Amanhã, 10:00</div>
            </div>
            <div className="screen-tx-amount pending">R$ 180</div>
          </div>
        </div>
      </>
    ),
  },
];

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
const Hero = ({ onPinEnd, onPinEnterBack }) => {
  const [webglOk, setWebglOk] = useState(() => isWebGLSupported());
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 1024px)').matches : false
  );
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
  const showcaseRef = useRef(null);
  const showcaseScreenRefs = useRef([]);
  const showcaseTextRefs = useRef([]);
  const showcaseDotRefs = useRef([]);
  const showcaseMobileCardRefs = useRef([]);
  const ctaRef = useRef(null);
  const ctaLogoRef = useRef(null);
  const ctaTitleRef = useRef(null);
  const ctaTextRef = useRef(null);
  const ctaButtonsRef = useRef(null);

  const goToCards = (tab) => {
    setActiveTab(tab);
    if (isMobile && cardsContainerRef.current) {
      const cardsTop = cardsContainerRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: cardsTop - 84, behavior: 'smooth' });
      return;
    }
    const heroTop = heroRef.current
      ? heroRef.current.getBoundingClientRect().top + window.scrollY
      : 0;
    window.scrollTo({ top: heroTop + window.innerHeight * 2.8, behavior: 'smooth' });
  };

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);

    if (mq.addEventListener) {
      mq.addEventListener('change', onChange);
    } else {
      mq.addListener(onChange);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', onChange);
      } else {
        mq.removeListener(onChange);
      }
    };
  }, []);

  /* ─── Three.js particles ─── */
  useEffect(() => {
    if (!webglOk || isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch (err) {
      console.error('[Hero] WebGL init failed:', err);
      setWebglOk(false);
      return;
    }
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
  }, [webglOk, isMobile]);

  /* ─── GSAP scroll timeline ─── */
  useEffect(() => {
    if (isMobile) {
      const mobileTriggers = [];
      const registerReveal = (el) => {
        if (!el) return;
        const tween = gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
        if (tween.scrollTrigger) mobileTriggers.push(tween.scrollTrigger);
      };

      registerReveal(cardsContainerRef.current);
      registerReveal(showcaseRef.current);
      registerReveal(ctaRef.current);

      const screens = showcaseScreenRefs.current.filter(Boolean);
      const texts = showcaseTextRefs.current.filter(Boolean);
      const dots = showcaseDotRefs.current.filter(Boolean);

      if (screens.length > 0) {
        gsap.set(screens, { opacity: 0 });
        gsap.set(screens[0], { opacity: 1 });
      }

      if (texts.length > 0) {
        gsap.set(texts, { opacity: 0, y: 22 });
        gsap.set(texts[0], { opacity: 1, y: 0 });
      }

      dots.forEach((dot, i) => dot.classList.toggle('active', i === 0));

      let showcaseTl;
      if (showcaseRef.current && screens.length > 1) {
        showcaseTl = gsap.timeline({
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: 'top 72%',
            end: 'bottom 28%',
            scrub: 0.75,
            onUpdate: (self) => {
              if (!dots.length) return;
              const idx = Math.min(Math.floor(self.progress * screens.length), screens.length - 1);
              dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
            },
          },
        });

        for (let i = 0; i < screens.length - 1; i++) {
          const at = i * 1.15;
          showcaseTl
            .to(screens[i], { opacity: 0, duration: 1 }, at)
            .to(screens[i + 1], { opacity: 1, duration: 1 }, at + 0.14);

          if (texts[i]) {
            showcaseTl.to(texts[i], { opacity: 0, y: -18, duration: 0.9 }, at);
          }
          if (texts[i + 1]) {
            showcaseTl.to(texts[i + 1], { opacity: 1, y: 0, duration: 0.9 }, at + 0.18);
          }
        }

        if (showcaseTl.scrollTrigger) mobileTriggers.push(showcaseTl.scrollTrigger);
      }

      return () => {
        if (showcaseTl) showcaseTl.kill();
        mobileTriggers.forEach((st) => st.kill());
      };
    }

    const hero = heroRef.current;
    if (!hero) return;

    // Initial states
    gsap.set(finalRef.current, { opacity: 1, x: 0 });
    gsap.set(animGroupRef.current, { opacity: 1, x: 0, scale: 1 });
    gsap.set(cardsContainerRef.current, { opacity: 0, x: '100vw' });
    gsap.set(showcaseRef.current, { opacity: 0 });
    gsap.set(ctaRef.current, { opacity: 0 });
    gsap.set(ctaLogoRef.current, { opacity: 0, y: 50 });
    gsap.set(ctaTitleRef.current, { opacity: 0, y: 40 });
    gsap.set(ctaTextRef.current, { opacity: 0, y: 35 });
    gsap.set(ctaButtonsRef.current, { opacity: 0, y: 30 });
    showcaseScreenRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });
    showcaseTextRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 50 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=680%',
        scrub: 0.9,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Update showcase dots based on position within showcase phase
          const phaseStart = 9.5 / 21;
          const phaseEnd = 17 / 21;
          if (self.progress >= phaseStart && self.progress <= phaseEnd) {
            const p = (self.progress - phaseStart) / (phaseEnd - phaseStart);
            const idx = Math.min(Math.floor(p * 3), 2);
            showcaseDotRefs.current.forEach((dot, i) => {
              if (!dot) return;
              dot.classList.toggle('active', i === idx);
            });
          }
        },
        onLeave: () => {
          gsap.set(hero, { height: 0, minHeight: 0 });
          onPinEnd?.();
        },
        onEnterBack: () => {
          gsap.set(hero, { height: '100vh', minHeight: '100vh' });
          onPinEnterBack?.();
        },
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

    // ── AppShowcase phase ──

    // Features slide out
    tl.to(cardsContainerRef.current, { x: '100vw', opacity: 0, duration: 2, ease: 'power2.inOut' }, 8);

    // AppShowcase fades in
    tl.to(showcaseRef.current, { opacity: 1, duration: 1.5, ease: 'power2.out' }, 9.5);

    // Topic 0 → 1  (positions 11–13)
    tl.to(showcaseTextRefs.current[0], { opacity: 0, y: -50, duration: 2, ease: 'power2.inOut' }, 11);
    tl.to(showcaseScreenRefs.current[0], { opacity: 0, duration: 1.5, ease: 'power1.inOut' }, 11);
    tl.to(showcaseScreenRefs.current[1], { opacity: 1, duration: 1.5, ease: 'power1.inOut' }, 11.5);
    tl.fromTo(showcaseTextRefs.current[1], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }, 12);

    // Topic 1 → 2  (positions 14–16)
    tl.to(showcaseTextRefs.current[1], { opacity: 0, y: -50, duration: 2, ease: 'power2.inOut' }, 14);
    tl.to(showcaseScreenRefs.current[1], { opacity: 0, duration: 1.5, ease: 'power1.inOut' }, 14);
    tl.to(showcaseScreenRefs.current[2], { opacity: 1, duration: 1.5, ease: 'power1.inOut' }, 14.5);
    tl.fromTo(showcaseTextRefs.current[2], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }, 15);

    // AppShowcase fades out before CTA
    tl.to(showcaseRef.current, { opacity: 0, duration: 1, ease: 'power2.inOut' }, 17);

    // CTA section staggered entrance
    tl.to(ctaRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 18);
    tl.to(ctaLogoRef.current, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 18);
    tl.to(ctaTitleRef.current, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 18.5);
    tl.to(ctaTextRef.current, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 19);
    tl.to(ctaButtonsRef.current, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 19.5);

    // End pad
    tl.to({}, { duration: 1 }, 22);

    // Enable pointer events appropriately
    const cardsTrigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      onEnter: () => {
        if (finalRef.current) finalRef.current.style.pointerEvents = 'auto';
      }
    });

    const showcaseTrigger = ScrollTrigger.create({
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

    const ctaTrigger = ScrollTrigger.create({
      trigger: hero,
      start: '+=870%',
      onEnter: () => {
        if (ctaRef.current) ctaRef.current.style.pointerEvents = 'auto';
      },
      onLeaveBack: () => {
        if (ctaRef.current) ctaRef.current.style.pointerEvents = 'none';
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
      cardsTrigger.kill();
      showcaseTrigger.kill();
      ctaTrigger.kill();
      document.removeEventListener('mousemove', onParallax);
    };
  }, [isMobile]);

  /* ─── Custom cursor ─── */
  useEffect(() => {
    if (isMobile) return;

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
      if (dot.parentNode) dot.parentNode.removeChild(dot);
      if (ring.parentNode) ring.parentNode.removeChild(ring);
    };
  }, [isMobile]);

  /* ─── Progress bar + scroll indicator ─── */
  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  return (
    <>
      {/* Progress bar */}
      {!isMobile && <div ref={progressRef} id="hero-progress-bar" />}

      {/* Scroll indicator */}
      {!isMobile && (
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
      )}

      {/* ─── Pinned hero section ─── */}
      <section
        ref={heroRef}
        style={{
          height: isMobile ? 'auto' : '100vh',
          minHeight: isMobile ? '100svh' : '100vh',
          position: 'relative',
          overflow: isMobile ? 'visible' : 'hidden',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: isMobile ? 'flex-start' : 'center',
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #003366 0%, #001428 50%, #000810 100%)',
        }}
      >
        {/* Three.js canvas */}
        {webglOk && !isMobile && (
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none',
            }}
          />
        )}

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
        <div style={{ order: isMobile ? 2 : undefined, width: isMobile ? '100%' : undefined }}>
          <Features
            ref={cardsContainerRef}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            cardRefs={cardRefs}
          />
        </div>

        {/* AppShowcase — animated in by Hero timeline */}
        <div ref={showcaseRef} className="showcase-in-hero" style={{ order: isMobile ? 3 : undefined }}>
          <div className="showcase-header">
            <h2>O app que <span className="highlight">trabalha</span> por você</h2>
            <p>Três funcionalidades que mudam como alunos e instrutores vivem a habilitação.</p>
          </div>
          <div className="showcase-layout">
            <div className="phone-mockup">
              {/* Side buttons */}
              <div className="phone-btn-vol-up" />
              <div className="phone-btn-vol-down" />

              {/* Inner glass */}
              <div className="phone-inner">

                {/* Status bar */}
                <div className="phone-status-bar">
                  <span className="phone-status-time">9:41</span>
                  <div className="phone-status-icons">
                    {/* Signal bars */}
                    <svg width="14" height="10" viewBox="0 0 17 12" fill="white">
                      <rect x="0" y="6" width="3" height="6" rx="1"/>
                      <rect x="4.5" y="4" width="3" height="8" rx="1"/>
                      <rect x="9" y="2" width="3" height="10" rx="1"/>
                      <rect x="13.5" y="0" width="3" height="12" rx="1"/>
                    </svg>
                    {/* WiFi */}
                    <svg width="14" height="10" viewBox="0 0 16 12" fill="none">
                      <circle cx="8" cy="10.5" r="1.5" fill="white"/>
                      <path d="M5 7.5a4.5 4.5 0 016 0" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M2 4.5a8 8 0 0112 0" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {/* Battery */}
                    <svg width="22" height="10" viewBox="0 0 25 12" fill="none">
                      <rect x="0.5" y="0.5" width="20" height="11" rx="3.5" stroke="white" strokeOpacity="0.35"/>
                      <rect x="2" y="2" width="15" height="8" rx="2" fill="white"/>
                      <path d="M22 4.5v3a1.5 1.5 0 000-3z" fill="white" fillOpacity="0.4"/>
                    </svg>
                  </div>
                </div>

                {/* Dynamic Island */}
                <div className="phone-dynamic-island" />

                {/* Screen area — crossfaded by GSAP */}
                <div className="phone-screen-area">
                  {SHOWCASE_TOPICS.map((topic, i) => (
                    <div
                      key={i}
                      ref={el => showcaseScreenRefs.current[i] = el}
                      className="phone-screen-item"
                      style={{ background: topic.gradient }}
                    >
                      {topic.screenContent}
                    </div>
                  ))}
                </div>

              </div>
            </div>
            <div className="showcase-text-panel">
              <div className="showcase-topic-items">
                {SHOWCASE_TOPICS.map((topic, i) => (
                  <div
                    key={i}
                    ref={el => showcaseTextRefs.current[i] = el}
                    className="showcase-topic-item"
                  >
                    <h3>
                      {topic.titleParts[0]}
                      <span className="highlight">{topic.titleParts[1]}</span>
                      {topic.titleParts[2]}
                    </h3>
                    <p>{topic.desc}</p>
                  </div>
                ))}
              </div>
              <div className="showcase-dots">
                {SHOWCASE_TOPICS.map((_, i) => (
                  <span
                    key={i}
                    ref={el => showcaseDotRefs.current[i] = el}
                    className={`showcase-dot${i === 0 ? ' active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile cards — visible only on mobile, replaces phone mockup */}
          <div className="showcase-mobile-cards">
            {SHOWCASE_TOPICS.map((topic, i) => (
              <div
                key={i}
                ref={el => showcaseMobileCardRefs.current[i] = el}
                className="showcase-mobile-card"
              >
                {/* Screen content preview */}
                <div
                  className="showcase-mobile-card-preview"
                  style={{ background: topic.gradient }}
                >
                  <div className="showcase-mobile-card-preview-inner">
                    {topic.screenContent}
                  </div>
                </div>

                {/* Text body */}
                <div className="showcase-mobile-card-body">
                  <span className="card-badge">{topic.screenLabel}</span>
                  <h3>
                    {topic.titleParts[0]}
                    <span className="highlight">{topic.titleParts[1]}</span>
                    {topic.titleParts[2]}
                  </h3>
                  <p>{topic.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Download Section — animated in after AppShowcase */}
        <div ref={ctaRef} className="cta-download-section" style={{ order: isMobile ? 4 : undefined }}>

          {/* Animated logo with orbital rings */}
          <div ref={ctaLogoRef} className="cta-logo-wrapper">
            <div
              className="orbital-ring ring-1"
              style={{ width: 200, height: 190, border: '1px solid rgba(255,107,0,0.2)', zIndex: 1 }}
            />
            <div
              className="orbital-ring ring-2"
              style={{ width: 250, height: 240, border: '1px solid rgba(0,102,204,0.18)', zIndex: 1 }}
            />
            <div className="logo-container" style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  width: 90, height: 90,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  filter: 'drop-shadow(0 0 24px rgba(255,107,0,0.5)) drop-shadow(0 0 48px rgba(0,100,255,0.2))',
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

          {/* Headline */}
          <h2 ref={ctaTitleRef} className="cta-title">
            Baixe o app e comece sua{' '}
            <span className="highlight">jornada hoje</span>
          </h2>

          {/* Description */}
          <p ref={ctaTextRef} className="cta-desc">
            Tenha o controle total da sua habilitação na palma da mão.
            Agende aulas, acompanhe seu progresso e conecte‑se com instrutores.
          </p>

          {/* Store buttons */}
          <div ref={ctaButtonsRef} className="cta-buttons">
            <a href="#playstore" className="cta-btn cta-btn-play">
              {/* Play Store triangle icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 20.5v-17c0-.83 1-.9 1.4-.42l14 8.5a.5.5 0 010 .84l-14 8.5C4 21.4 3 21.33 3 20.5z"/>
              </svg>
              Baixar na Playstore
            </a>
            <a href="#appstore" className="cta-btn cta-btn-apple">
              {/* Apple logo icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Baixar na Apple Store
            </a>
          </div>

        </div>

        {/* Main hero content - Positioned Left */}
        <div ref={finalRef} className="hero-content-wrapper" style={{ order: isMobile ? 1 : undefined }}>
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
