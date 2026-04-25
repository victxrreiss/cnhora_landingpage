import React from 'react';
import { Helmet } from 'react-helmet-async';

const LGPD = () => (
  <main className="max-w-3xl mx-auto px-6 py-24 text-white">
    <Helmet>
      <title>LGPD | CNHora</title>
    </Helmet>
    <h1 className="text-3xl font-extrabold mb-4 text-white">LGPD</h1>
    <p className="text-white/50 text-sm mb-8">Lei Geral de Proteção de Dados — Lei nº 13.709/2018</p>
    <p className="text-white/60 leading-relaxed">
      Esta página está em construção. Em breve disponibilizaremos as informações sobre como a CNHora
      trata seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).
    </p>
  </main>
);

export default LGPD;
