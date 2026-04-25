import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import { ErrorBoundary } from './components/ui';
import Privacidade from './pages/Privacidade';
import LGPD from './pages/LGPD';
import Termos from './pages/Termos';

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

      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Hero />
            </ErrorBoundary>
          }
        />
        <Route path="/privacidade" element={<ErrorBoundary><Privacidade /></ErrorBoundary>} />
        <Route path="/lgpd" element={<ErrorBoundary><LGPD /></ErrorBoundary>} />
        <Route path="/termos" element={<ErrorBoundary><Termos /></ErrorBoundary>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
