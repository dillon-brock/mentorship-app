import React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage/AuthPage';
import { UserProvider } from './context/UserContext';


const container = document.getElementById('app') || document.createElement('div')
container.id = 'app'
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/auth/:method" element={<AuthPage />} />
          <Route path="/auth/:method/:accountType" element={<AuthPage />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);
