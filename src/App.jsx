import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import { ErrorBoundary } from './components/ui';

function App() {
  return (
    <div className="dark" style={{ background: '#000810' }}>
      <Helmet>
        <title>CNHora | Acelere sua Habilitação</title>
        <meta
          name="description"
          content="Conectamos alunos a instrutores independentes com tecnologia de ponta. Agende aulas, faça simulados e conquiste sua CNH sem burocracia."
        />
      </Helmet>

      <Navbar />
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
    </div>
  );
}

export default App;
