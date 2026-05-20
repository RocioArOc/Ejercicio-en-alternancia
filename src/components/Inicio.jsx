import React from 'react';
import Blog from './Blog';
import './Inicio.css';

export default function Inicio() {
  return (
    <div className="contenedor-pagina">
      {/* SISTEMA DE POSTS DINÁMICOS / CMS BLOG */}
      <Blog />

    </div>
  );
}
