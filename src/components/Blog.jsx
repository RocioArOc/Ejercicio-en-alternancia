import React, { useState } from 'react';
import PostCard from './PostCard';
import './Blog.css';

export default function Blog() {

  // ARRAY DE POSTS
  const [posts, setPosts] = useState([
    {
      id: 1,
      titulo: 'Este es un post de ejemplo',
      descripcion: 'Este es un texto de ejemplo para el blog. Tres tristes trigres tragaban trigo en un trigal.',
      destacado: true
    },
    {
      id: 2,
      titulo: 'Diseño UX/UI para la web',
      descripcion: 'El diseño es muy bello cual camello.',
      destacado: false
    }
  ]);

  // ESTADOS DE CONTROL PARA EL FORMULARIO DE NUEVO POST
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');

  // FUNCIONES CRUD INMUTABLES
  const agregarPost = (e) => {
    e.preventDefault();

    if (!nuevoTitulo.trim() || !nuevaDescripcion.trim()) {
      alert('Por favor, introduce un título y descripción válidos.');
      return;
    }

    const nuevoPost = {
      id: Date.now(),
      titulo: nuevoTitulo.trim(),
      descripcion: nuevaDescripcion.trim(),
      destacado: false
    };

    setPosts((prevPosts) => [...prevPosts, nuevoPost]);
    setNuevoTitulo('');
    setNuevaDescripcion('');
  };

  const eliminarPost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const destacarPost = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, destacado: !post.destacado } : post
      )
    );
  };

  const editarPost = (id, nuevoTituloPost, nuevaDescripcionPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? { ...post, titulo: nuevoTituloPost, descripcion: nuevaDescripcionPost }
          : post
      )
    );
  };

  return (
    <section className="seccion-blog-contenedor">

      <h2 className="seccion-blog-titulo">Componente Blog / CMS</h2>

      {/* FORMULARIO PARA CREAR NUEVO POST */}
      <form onSubmit={agregarPost} className="formulario-blog">

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="post-titulo">Título del Post</label>
          <input
            type="text"
            id="post-titulo"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
            placeholder="Escribe un título llamativo"
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="post-descripcion">Descripción / Contenido</label>
          <textarea
            id="post-descripcion"
            value={nuevaDescripcion}
            onChange={(e) => setNuevaDescripcion(e.target.value)}
            placeholder="Escribe el cuerpo o contenido de tu publicación..."
            rows="4"
            required
          />
        </div>

        <button type="submit" className="boton-crear-post">
          Crear Publicación
        </button>

      </form>
      <div className="separador-seccion"></div>
      {/* RENDERIZADO DINÁMICO DE LAS PUBLICACIONES */}
      {posts.length === 0 ? (
        <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '1.1rem', margin: '3rem 0' }}>
          No hay publicaciones en este momento. ¡Utiliza el formulario de arriba para redactar la primera!
        </p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEliminar={eliminarPost}
              onDestacar={destacarPost}
              onEditar={editarPost}
            />
          ))}
        </div>
      )}
      <div className="separador-seccion"></div>
    </section>

  );
}
