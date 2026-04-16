import React, { useState } from 'react';

const ALUNO_CARDS = [
  {
    id: 'aluno-1',
    badge: 'Teoria',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    title: 'Simulados Inteligentes',
    desc: 'Banco com +5.000 questões por categoria, cronometradas e corrigidas em tempo real. Aprove na teoria com confiança.',
  },
  {
    id: 'aluno-2',
    badge: 'Aulas',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: 'Escolha seu Instrutor',
    desc: 'Filtre por região, disponibilidade, preço e avaliação. Veja o perfil completo e reserve com 1 clique.',
  },
  {
    id: 'aluno-3',
    badge: 'Progresso',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Acompanhe sua Evolução',
    desc: 'Veja horas concluídas, taxa de acerto nos simulados e o quanto falta para conquistar sua CNH.',
  },
];

const INSTRUTOR_CARDS = [
  {
    id: 'inst-1',
    badge: 'Agenda',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Gerencie sua Agenda',
    desc: 'Defina sua disponibilidade e receba reservas automáticas. Bloqueio de conflitos em tempo real, sem ligação.',
  },
  {
    id: 'inst-2',
    badge: 'Financeiro',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Receba em D+1',
    desc: 'Cada aula confirmada gera crédito automático. Dashboard financeiro completo, sem taxas escondidas.',
  },
  {
    id: 'inst-3',
    badge: 'Crescimento',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    title: 'Expanda sua Clientela',
    desc: 'Perfil público ranqueado por avaliações verificadas, selos de qualidade e destaque para novos alunos na sua região.',
  },
];

const FeatureCard = React.forwardRef(({ badge, icon, title, desc }, ref) => (
  <div ref={ref} className="hero-feature-card">
    <div className="card-badge">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
        <circle cx="5" cy="5" r="5" />
      </svg>
      {badge}
    </div>
    <div className="card-icon-wrap">
      <svg
        style={{ width: 32, height: 32, color: '#FF6B00' }}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
      </svg>
    </div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
      {title}
    </h3>
    <p style={{ color: '#93C5FD', fontSize: '0.875rem', lineHeight: 1.6 }}>{desc}</p>
  </div>
));

const Features = React.forwardRef(({ activeTab, setActiveTab, cardRefs }, ref) => (
  <div ref={ref} className="hero-cards-container">
    <div className="hero-tabs-wrapper">
      <div className="hero-tab-switcher">
        <div
          className="hero-tab-indicator"
          style={{ left: activeTab === 'aluno' ? '4px' : 'calc(50%)' }}
        />
        <button
          className={`hero-tab ${activeTab === 'aluno' ? 'active' : ''}`}
          onClick={() => setActiveTab('aluno')}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          Sou Aluno
        </button>
        <button
          className={`hero-tab ${activeTab === 'instrutor' ? 'active' : ''}`}
          onClick={() => setActiveTab('instrutor')}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Sou Instrutor
        </button>
      </div>
    </div>

    <div key={activeTab} className="hero-cards-grid">
      {(activeTab === 'aluno' ? ALUNO_CARDS : INSTRUTOR_CARDS).map((card, idx) => (
        <FeatureCard
          key={card.id}
          ref={el => cardRefs.current[idx] = el}
          {...card}
        />
      ))}
    </div>
  </div>
));

export default Features;
