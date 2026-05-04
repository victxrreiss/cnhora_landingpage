import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import { ErrorBoundary, WhatsAppSign } from './components/ui';
import Privacidade from './pages/Privacidade';
import LGPD from './pages/LGPD';
import Termos from './pages/Termos';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();

  return (
    <div className="dark" style={{ background: '#000810' }}>
      <Helmet>
        <title>CNHora — Acelere sua habilitação com instrutores independentes</title>
        <meta
          name="description"
          content="Conectamos alunos a instrutores independentes para acelerar sua CNH. Agende aulas no app, faça simulados e tire sua habilitação sem burocracia."
        />
        <link rel="canonical" href="https://cnhora.com.br/" />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CNHora" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:title" content="CNHora — Acelere sua habilitação" />
        <meta property="og:description" content="Conectamos alunos a instrutores independentes. Agende aulas no app, faça simulados e tire sua CNH sem burocracia." />
        <meta property="og:url" content="https://cnhora.com.br/" />
        <meta property="og:image" content="https://cnhora.com.br/og-image.png" />
      </Helmet>

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <main>
                <Hero />
              </main>
            </ErrorBoundary>
          }
        />
        <Route path="/privacidade" element={<ErrorBoundary><Privacidade /></ErrorBoundary>} />
        <Route path="/lgpd" element={<ErrorBoundary><LGPD /></ErrorBoundary>} />
        <Route path="/termos" element={<ErrorBoundary><Termos /></ErrorBoundary>} />
        <Route path="*" element={<ErrorBoundary><NotFound /></ErrorBoundary>} />
      </Routes>

      {location.pathname !== '/' && <Footer />}
      <WhatsAppSign />
    </div>
  );
}

export default App;
