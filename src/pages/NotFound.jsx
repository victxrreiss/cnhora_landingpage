import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="max-w-3xl mx-auto px-6 py-24 text-white">
    <Helmet>
      <title>404 — Página não encontrada | CNHora</title>
      <meta name="robots" content="noindex,follow" />
    </Helmet>
    <h1 className="text-3xl font-extrabold mb-4 text-white">Página não encontrada</h1>
    <p className="text-white/60 leading-relaxed mb-6">
      A página que você procura não existe ou foi removida.
    </p>
    <Link to="/" className="text-orange-400 underline hover:text-orange-300">
      Voltar à home
    </Link>
  </main>
);

export default NotFound;
