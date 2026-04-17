// src/components/sections/AppShowcase.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createPinnedTimeline } from '../../utils';

gsap.registerPlugin(ScrollTrigger);

const TOPICS = [
  {
    titleParts: ['Tenha a área da sua aula no ', 'mapa', ''],
    desc: 'O instrutor define previamente o local da aula. O aluno chega sabendo exatamente onde vai ser.',
    gradient: 'linear-gradient(135deg, #003366 0%, #002244 100%)',
    screenIcon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    screenLabel: 'Área da Aula',
  },
  {
    titleParts: ['Veja onde você ', 'errou', ', para não errar de novo'],
    desc: 'Erros registrados no mapa com localização exata. Aluno evolui, instrutor acompanha.',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #0d0222 100%)',
    screenIcon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    screenLabel: 'Mapa de Erros',
  },
  {
    titleParts: ['Painel ', 'financeiro', ' completo'],
    desc: 'Controle de ganhos, aulas confirmadas e histórico de pagamentos em um único lugar.',
    gradient: 'linear-gradient(135deg, #1a2a00 0%, #0d1500 100%)',
    screenIcon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    screenLabel: 'Financeiro',
  },
];

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const screenRefs = useRef([]);
  const textRefs = useRef([]);
  const dotRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // ── Entry animation (before pin) ──
    const entryAnim = gsap.from(section, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        once: true,
      },
    });

    // ── Initial states ──
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 50 });
    });
    screenRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });

    // ── Pinned timeline ──
    const tl = createPinnedTimeline({
      trigger: section,
      end: '+=300%',
      onUpdate: (self) => {
        const idx = Math.min(Math.floor(self.progress * 3), 2);
        dotRefs.current.forEach((dot, i) => {
          if (!dot) return;
          dot.classList.toggle('active', i === idx);
        });
      },
    });

    // Topic 0 → 1 (positions 3–5)
    tl.to(textRefs.current[0], { opacity: 0, y: -50, duration: 2, ease: 'power2.inOut' }, 3);
    tl.to(screenRefs.current[0], { opacity: 0, duration: 1.5, ease: 'power1.inOut' }, 3);
    tl.to(screenRefs.current[1], { opacity: 1, duration: 1.5, ease: 'power1.inOut' }, 3.5);
    tl.fromTo(textRefs.current[1], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }, 4);

    // Topic 1 → 2 (positions 6–8)
    tl.to(textRefs.current[1], { opacity: 0, y: -50, duration: 2, ease: 'power2.inOut' }, 6);
    tl.to(screenRefs.current[1], { opacity: 0, duration: 1.5, ease: 'power1.inOut' }, 6);
    tl.to(screenRefs.current[2], { opacity: 1, duration: 1.5, ease: 'power1.inOut' }, 6.5);
    tl.fromTo(textRefs.current[2], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }, 7);

    // ensure timeline duration reaches 9
    tl.to({}, { duration: 1 }, 8);

    return () => {
      tl.kill();
      entryAnim.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="showcase-section">
      <div className="showcase-header">
        <h2>O app que <span style={{ color: '#FF6B00' }}>trabalha</span> por você</h2>
        <p>Três funcionalidades que mudam como alunos e instrutores vivem a habilitação.</p>
      </div>

      <div className="showcase-layout">
        {/* Phone mockup */}
        <div className="phone-mockup">
          <div className="phone-notch" />
          <div className="phone-screen-area">
            {TOPICS.map((topic, i) => (
              <div
                key={i}
                ref={el => screenRefs.current[i] = el}
                className="phone-screen-item"
                style={{ background: topic.gradient }}
              >
                <svg className="screen-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={topic.screenIcon} />
                </svg>
                <span className="screen-label">{topic.screenLabel}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Text panel */}
        <div className="showcase-text-panel">
          <div className="showcase-topic-items">
            {TOPICS.map((topic, i) => (
              <div
                key={i}
                ref={el => textRefs.current[i] = el}
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
            {TOPICS.map((_, i) => (
              <span
                key={i}
                ref={el => dotRefs.current[i] = el}
                className={`showcase-dot${i === 0 ? ' active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
