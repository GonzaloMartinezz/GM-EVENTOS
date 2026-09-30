import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import ScrollProgressBar from './components/ScrollProgressBar';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmoothScrollProvider>
        <ScrollProgressBar />
        <App />
      </SmoothScrollProvider>
    </BrowserRouter>
  </React.StrictMode>
);
