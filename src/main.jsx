import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { applyDevicePerformanceClass, detectDevicePerformance } from './utils/devicePerformance'
import './index.css'

applyDevicePerformanceClass(detectDevicePerformance())

const rootElement = document.getElementById('root')

const tree = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, tree)
} else {
  ReactDOM.createRoot(rootElement).render(tree)
}
