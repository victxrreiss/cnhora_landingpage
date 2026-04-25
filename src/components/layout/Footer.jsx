import React, { useEffect, useState } from 'react';
import { Instagram, Mail, ShieldCheck, X } from 'lucide-react';
import cnhoraLogo from '/cnhora-logo.svg';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.107 1.523 5.836L.057 24l6.304-1.654A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5-1.373l-.358-.214-3.717.975.992-3.622-.234-.372A9.78 9.78 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

const POLICY_SECTIONS = [
  {
    title: '1. Quem somos',
    body: 'A CNHora conecta alunos, instrutores independentes e parceiros da educação no trânsito. Tratamos dados pessoais para oferecer cadastro, agendamento, comunicação, segurança, suporte e melhoria da plataforma.',
  },
  {
    title: '2. Dados que podemos coletar',
    body: 'Podemos coletar nome, contato, cidade, preferências de aula, dados de uso do app/site, mensagens enviadas ao suporte, informações de agenda e dados necessários para pagamentos, prevenção a fraude e cumprimento legal.',
  },
  {
    title: '3. Como usamos seus dados',
    body: 'Usamos dados para criar e manter sua conta, conectar alunos e instrutores, exibir disponibilidade, processar solicitações, enviar comunicações importantes, melhorar a experiência, proteger a plataforma e cumprir obrigações legais.',
  },
  {
    title: '4. Compartilhamento',
    body: 'Compartilhamos dados somente quando necessário para operar o serviço, como com instrutores, alunos, provedores de hospedagem, meios de pagamento, ferramentas de atendimento, autoridades competentes ou parceiros contratados sob dever de confidencialidade.',
  },
  {
    title: '5. Segurança e retenção',
    body: 'Adotamos medidas técnicas e organizacionais para proteger dados pessoais. Mantemos as informações pelo tempo necessário para prestar o serviço, cumprir obrigações legais, resolver disputas e preservar segurança operacional.',
  },
  {
    title: '6. Seus direitos pela LGPD',
    body: 'Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio, eliminação, portabilidade, informação sobre compartilhamento, revisão de decisões automatizadas e revogação de consentimento quando aplicável.',
  },
  {
    title: '7. Cookies e tecnologias similares',
    body: 'Podemos usar cookies e tecnologias similares para manter sessões, medir desempenho, entender navegação e melhorar funcionalidades. Você pode gerenciar permissões pelo navegador, ciente de que alguns recursos podem ser afetados.',
  },
  {
    title: '8. Contato do titular',
    body: 'Para exercer direitos ou tirar dúvidas sobre privacidade e proteção de dados, entre em contato pelo e-mail contato@cnhora.com.br. Responderemos conforme os prazos e critérios previstos na legislação aplicável.',
  },
];

const FooterButton = ({ children, onClick }) => (
  <button type="button" className="footer-legal-button" onClick={onClick}>
    {children}
  </button>
);

const Footer = () => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (!isPolicyOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsPolicyOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isPolicyOpen]);

  return (
    <>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-grid">
            <div className="site-footer-brand">
              <div className="site-footer-logo-row">
                <img src={cnhoraLogo} alt="CNHora" className="site-footer-logo" />
                <span>CN<span>Hora</span></span>
              </div>
              <p>
                Acelerando o futuro da educação no trânsito através de tecnologia,
                segurança e conexões humanas.
              </p>
              <div className="site-footer-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram size={16} />
                </a>
                <a href="https://wa.me" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <WhatsAppIcon />
                </a>
                <a href="mailto:contato@cnhora.com.br" aria-label="Email">
                  <Mail size={16} />
                </a>
              </div>
            </div>

            <div className="site-footer-column">
              <h4>Plataforma</h4>
              <a href="#cta">Baixar app</a>
              <a href="#instrutores">Para instrutores</a>
              <a href="#cta">Começar grátis</a>
            </div>

            <div className="site-footer-column">
              <h4>Suporte</h4>
              <a href="mailto:contato@cnhora.com.br">Contato</a>
              <a href="#cta">Central de ajuda</a>
              <a href="#cta">Segurança</a>
            </div>

            <div className="site-footer-column">
              <h4>Legal</h4>
              <FooterButton onClick={() => setIsPolicyOpen(true)}>
                Políticas de Privacidade e LGPD
              </FooterButton>
              <span className="site-footer-compliance">
                <ShieldCheck size={14} />
                Em conformidade com a LGPD
              </span>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>© {year} CNHora. Todos os direitos reservados.</p>
          <button type="button" onClick={() => setIsPolicyOpen(true)}>
            Privacidade e LGPD
          </button>
        </div>
      </footer>

      {isPolicyOpen && (
        <div className="policy-modal-backdrop" role="presentation" onMouseDown={() => setIsPolicyOpen(false)}>
          <section
            className="policy-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="policy-modal-header">
              <div>
                <span className="policy-modal-kicker">Privacidade e LGPD</span>
                <h2 id="policy-modal-title">Políticas da CNHora</h2>
                <p>Última atualização: {year}</p>
              </div>
              <button type="button" className="policy-modal-close" onClick={() => setIsPolicyOpen(false)} aria-label="Fechar modal">
                <X size={20} />
              </button>
            </header>

            <div className="policy-modal-body">
              <p className="policy-modal-intro">
                Esta política explica, de forma objetiva, como a CNHora trata dados pessoais
                na operação da plataforma, conforme a Lei Geral de Proteção de Dados.
              </p>

              <div className="policy-modal-sections">
                {POLICY_SECTIONS.map((section) => (
                  <article key={section.title}>
                    <h3>{section.title}</h3>
                    <p>{section.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Footer;
