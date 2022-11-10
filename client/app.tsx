import React from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
// import './global.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage/AuthPage';

const container = document.getElementById('app') || document.createElement('div')
container.id = 'app'
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/auth/:method" element={<AuthPage />} />
        <Route path="/auth/:method/:accountType" element={<AuthPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
