import React, { useState } from 'react';

// COMPONENTE PostCard
export default function PostCard({ post, onEliminar, onDestacar, onEditar }) {

  // ESTADOS LOCALES PARA LA EDICIÓN INLINE
  const [editando, setEditando] = useState(false);

  // Estados temporales para los campos mientras el usuario edita la publicación
  const [editTitulo, setEditTitulo] = useState(post.titulo);
  const [editDescripcion, setEditDescripcion] = useState(post.descripcion);

  // CONTROLADORES DE ACCIONES INTERNAS
  const iniciarEdicion = () => {
    setEditTitulo(post.titulo);
    setEditDescripcion(post.descripcion);
    setEditando(true);
  };

  const guardarCambios = (e) => {
    e.preventDefault();

    if (!editTitulo.trim() || !editDescripcion.trim()) {
      alert('Por favor, completa tanto el título como la descripción.');
      return;
    }

    onEditar(post.id, editTitulo, editDescripcion);
    setEditando(false);
  };

  const cancelarEdicion = () => {
    setEditando(false);
  };

  return (
    // RESALTADO VISUAL
    <article className={post.destacado ? 'post-card destacado' : 'post-card'}>

      {editando ? (
        // VISTA DE EDICIÓN
        <form onSubmit={guardarCambios} className="form-edicion-inline">
          <input
            type="text"
            value={editTitulo}
            onChange={(e) => setEditTitulo(e.target.value)}
            placeholder="Título del post"
            required
          />
          <textarea
            value={editDescripcion}
            onChange={(e) => setEditDescripcion(e.target.value)}
            placeholder="Descripción del post"
            rows="3"
            required
          />
          <div className="grupo-botones-edicion">
            <button type="submit" className="btn-guardar">Guardar</button>
            <button type="button" onClick={cancelarEdicion} className="btn-cancelar">Cancelar</button>
          </div>
        </form>
      ) : (
        // VISTA ESTÁTICA
        <>
          <div className="post-card-header">
            <h3 className="post-card-titulo">{post.titulo}</h3>

            {post.destacado && (
              <span className="destacado-estrella" aria-label="Publicación destacada">
                ★
              </span>
            )}
          </div>

          <p className="post-card-descripcion">{post.descripcion}</p>

          {/* ACCIONES DE LA TARJETA */}
          <div className="post-card-acciones">

            <button
              onClick={() => onDestacar(post.id)}
              className={post.destacado ? 'btn-accion btn-destacar activo' : 'btn-accion btn-destacar'}
              aria-label="Destacar publicación"
            >
              {post.destacado ? 'Destacado' : 'Destacar'}
            </button>

            <button
              onClick={iniciarEdicion}
              className="btn-accion"
              aria-label="Editar publicación"
            >
              Editar
            </button>

            <button
              onClick={() => onEliminar(post.id)}
              className="btn-accion btn-eliminar"
              aria-label="Eliminar publicación"
            >
              Eliminar
            </button>

          </div>
        </>
      )}

    </article>
  );
}
