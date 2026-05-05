import React from 'react';
import WaitlistForm from '../ui/WaitlistForm';

const WaitlistSection = () => (
  <section id="lista-de-espera" className="waitlist-section" aria-labelledby="waitlist-heading">
    <div className="waitlist-section-inner">
      <div className="waitlist-section-copy">
        <span className="waitlist-kicker">Em pré-lançamento</span>
        <h2 id="waitlist-heading">
          Garanta seu acesso<br />
          <span className="highlight">antes de todo mundo.</span>
        </h2>
        <p>
          O CNHora está chegando. Entre na lista e seja avisado quando o app estiver
          disponível na sua cidade — alunos com prioridade nas primeiras vagas,
          instrutores com onboarding antecipado.
        </p>
      </div>

      <div className="waitlist-section-form">
        <WaitlistForm />
      </div>
    </div>
  </section>
);

export default WaitlistSection;
