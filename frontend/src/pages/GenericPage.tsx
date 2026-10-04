import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

export default function GenericPage() {
  const location = useLocation();
  const pageName = location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Página';

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-on-surface font-mono selection:bg-accent selection:text-white">
      <Header />
      <div className="pt-32 px-6 lg:px-12 max-w-7xl mx-auto pb-20">
        <h1 className="font-display text-4xl lg:text-7xl uppercase text-[#f5f1e8] mb-8">
          {pageName}
        </h1>
        <p className="text-xl text-neutral-400 max-w-2xl">
          Esta sección de <strong className="uppercase text-[#ff3c00]">{pageName}</strong> se encuentra en construcción. Muy pronto encontrarás toda la información detallada aquí.
        </p>
      </div>
    </div>
  );
}
