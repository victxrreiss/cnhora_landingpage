import React, { useState } from 'react';

const UFS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT;

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [role, setRole] = useState('aluno');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === 'submitting') return;

    if (!ENDPOINT) {
      setStatus('error');
      setErrorMsg('Endpoint não configurado. Defina VITE_WAITLIST_ENDPOINT.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          email,
          cidade,
          uf,
          role,
          website,
          source: typeof window !== 'undefined' ? window.location.href : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        }),
      });

      const data = await response.json().catch(() => ({ ok: false }));

      if (!data.ok) {
        throw new Error(data.error || 'falha no envio');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Erro ao enviar. Tente novamente.');
    }
  };

  if (status === 'success') {
    return (
      <div className="waitlist-success" role="status" aria-live="polite">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3>Você está na lista!</h3>
        <p>Em breve enviamos novidades sobre o lançamento na sua cidade.</p>
      </div>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
      <div className="waitlist-field">
        <label htmlFor="waitlist-email">Email</label>
        <input
          id="waitlist-email"
          type="email"
          required
          autoComplete="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'submitting'}
        />
      </div>

      <div className="waitlist-row">
        <div className="waitlist-field waitlist-field-cidade">
          <label htmlFor="waitlist-cidade">Cidade</label>
          <input
            id="waitlist-cidade"
            type="text"
            required
            autoComplete="address-level2"
            placeholder="Campinas"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            disabled={status === 'submitting'}
          />
        </div>
        <div className="waitlist-field waitlist-field-uf">
          <label htmlFor="waitlist-uf">UF</label>
          <select
            id="waitlist-uf"
            required
            value={uf}
            onChange={(e) => setUf(e.target.value)}
            disabled={status === 'submitting'}
          >
            <option value="" disabled>UF</option>
            {UFS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="waitlist-roles" disabled={status === 'submitting'}>
        <legend>Você é</legend>
        <label className={role === 'aluno' ? 'is-active' : ''}>
          <input
            type="radio"
            name="role"
            value="aluno"
            checked={role === 'aluno'}
            onChange={() => setRole('aluno')}
          />
          <span>Aluno</span>
        </label>
        <label className={role === 'instrutor' ? 'is-active' : ''}>
          <input
            type="radio"
            name="role"
            value="instrutor"
            checked={role === 'instrutor'}
            onChange={() => setRole('instrutor')}
          />
          <span>Instrutor</span>
        </label>
      </fieldset>

      {/* Honeypot — invisible to humans, bots fill it */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, overflow: 'hidden' }}>
        <label htmlFor="waitlist-website">Não preencha este campo</label>
        <input
          id="waitlist-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="waitlist-submit"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Enviando…' : 'Entrar na lista'}
      </button>

      {status === 'error' && (
        <p className="waitlist-error" role="alert">{errorMsg}</p>
      )}

      <p className="waitlist-fineprint">
        Ao entrar na lista você concorda em receber novidades por email. Nada de spam.
      </p>
    </form>
  );
};

export default WaitlistForm;
