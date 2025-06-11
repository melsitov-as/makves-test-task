import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';

const THEME = 'light';

if (THEME == 'light') {
  document.querySelector('html').style.background = '#e2e8f0';
} else {
  document.querySelector('html').style.background = '#1e293b';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App theme={THEME} />
  </React.StrictMode>
);
