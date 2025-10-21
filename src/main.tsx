import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import '@/style/index.css';
import { AuthProvider } from '@/context/AuthContenxt';


const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}