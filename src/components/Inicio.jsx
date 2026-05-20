import React from 'react';
import Blog from './Blog';
import './Inicio.css';

export default function Inicio() {
  return (
    <div className="contenedor-pagina">
      <p>Esto es una prueba de actualización en Vercel</p>




      {/* SISTEMA DE POSTS DINÁMICOS / CMS BLOG */}
      <Blog />

    </div>
  );
}
