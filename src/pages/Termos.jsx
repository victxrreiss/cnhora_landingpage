import React from 'react';
import { Helmet } from 'react-helmet-async';

const Termos = () => (
  <main className="max-w-3xl mx-auto px-6 py-24 text-white">
    <Helmet>
      <title>Termos de Uso | CNHora</title>
    </Helmet>
    <h1 className="text-3xl font-extrabold mb-4 text-white">Termos de Uso</h1>
    <p className="text-white/50 text-sm mb-8">Última atualização: {new Date().getFullYear()}</p>
    <p className="text-white/60 leading-relaxed">
      Esta página está em construção. Em breve disponibilizaremos nossos Termos de Uso completos.
    </p>
  </main>
);

export default Termos;
