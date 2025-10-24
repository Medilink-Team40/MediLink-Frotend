import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import '@/style/index.css';

const container = document.getElementById('root');

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