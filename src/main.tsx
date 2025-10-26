import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import './index.css';

const container = document.getElementById('root');
console.log("DEBUG ENV:", import.meta.env);

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}