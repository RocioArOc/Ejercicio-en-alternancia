import React, { useState } from 'react';
import './Contacto.css';

export default function Contacto() {

  //Objeto que almacena el contenido actual de cada campo en tiempo real.
  const [valores, setValores] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  // Objeto que almacena los mensajes de error de validación para cada campo.

  const [errores, setErrores] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  // Objeto que registra si el usuario ha interactuado (hizo clic y salió) en un campo.
  const [tocados, setTocados] = useState({
    nombre: false,
    email: false,
    mensaje: false
  });

  //Estado booleano para controlar si el formulario se envió con éxito.
  // Permite renderizar un banner de agradecimiento y confirmación en la UI.
  const [enviado, setEnviado] = useState(false);


  // Esta función evalúa las reglas de negocio para un campo y valor específicos.
  const validarCampo = (name, value) => {
    let error = '';


    if (!value.trim()) {
      error = 'Este campo es obligatorio.';
    }
    else if (name === 'nombre') {
      if (value.trim().length < 3) {
        error = 'El nombre debe tener al menos 3 caracteres.';
      }
    }

    else if (name === 'email') {
      // Expresión regular estándar para verificar un formato de correo válido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Por favor, introduce un correo electrónico válido (ej: usuario@dominio.com).';
      }
    }
    // Reglas específicas para el campo 'mensaje'
    else if (name === 'mensaje') {
      if (value.trim().length < 10) {
        error = 'El mensaje debe tener al menos 10 caracteres para que sea descriptivo.';
      }
    }

    return error;
  };


  //Se activa cada vez que el usuario escribe o cambia una letra.
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualizamos el valor del campo modificado en el estado
    setValores((prevValores) => ({
      ...prevValores,
      [name]: value
    }));

    // Si el usuario ya había salido previamente de este campo (ya está "tocado"),
    // actualizamos la validación en tiempo real a medida que escribe para corregir el error de inmediato.
    if (tocados[name]) {
      const mensajeError = validarCampo(name, value);
      setErrores((prevErrores) => ({
        ...prevErrores,
        [name]: mensajeError
      }));
    }
  };

  // Se activa cuando el usuario sale del input (pierde el foco).
  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Marcamos el campo como "tocado" para habilitar la visualización del estado visual
    setTocados((prevTocados) => ({
      ...prevTocados,
      [name]: true
    }));

    // Evaluamos y guardamos el error inmediatamente al salir del campo
    const mensajeError = validarCampo(name, value);
    setErrores((prevErrores) => ({
      ...prevErrores,
      [name]: mensajeError
    }));
  };

  //Se activa al hacer clic en el botón de Enviar del formulario.
  const handleSubmit = (e) => {
    e.preventDefault();

    // todos los errores pendientes si el usuario intenta enviar sin rellenar nada.
    const todosTocados = { nombre: true, email: true, mensaje: true };
    setTocados(todosTocados);

    const nuevosErrores = {
      nombre: validarCampo('nombre', valores.nombre),
      email: validarCampo('email', valores.email),
      mensaje: validarCampo('mensaje', valores.mensaje)
    };
    setErrores(nuevosErrores);

    // Verificamos si existe algún error activo en el formulario
    const tieneErrores = Object.values(nuevosErrores).some((error) => error !== '');

    if (!tieneErrores) {
      // Si NO hay errores, el formulario es válido. 
      setEnviado(true);

      setValores({ nombre: '', email: '', mensaje: '' });
      setTocados({ nombre: false, email: false, mensaje: false });
      setErrores({ nombre: '', email: '', mensaje: '' });

      setTimeout(() => {
        setEnviado(false);
      }, 5000);
    }
  };

  // para pintar el borde del input según su estado de validez actual.
  const obtenerClaseInput = (nombreCampo) => {
    if (!tocados[nombreCampo]) return '';

    // Si ha sido tocado, devolvemos la clase según la presencia de un error
    return errores[nombreCampo] ? 'campo-invalido' : 'campo-valido';
  };

  return (
    <div className="contenedor-pagina">
      <h1>Ponte en Contacto</h1>

      {/* Mensaje de éxito */}
      {enviado && (
        <div className="mensaje-exito" id="success-banner">
          <h3>¡Mensaje Enviado!</h3>
          <p>Tu formulario ha sido validado correctamente y enviado sin recargar la página.</p>
        </div>
      )}

      {/* FORMULARIO DE CONTACTO */}
      <form onSubmit={handleSubmit} className="formulario-contacto" noValidate>

        {/* CAMPO: NOMBRE */}
        <div className="grupo-campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={valores.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            className={obtenerClaseInput('nombre')}
            placeholder="Introduce tu nombre completo"
            required
          />
          {/* Mostramos el error si el campo ha sido tocado y tiene un mensaje de error */}
          {tocados.nombre && errores.nombre && (
            <span className="mensaje-error" id="error-nombre">
              ⚠️ {errores.nombre}
            </span>
          )}
        </div>

        {/* CAMPO: EMAIL */}
        <div className="grupo-campo">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={valores.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={obtenerClaseInput('email')}
            placeholder="correo@ejemplo.com"
            required
          />
          {tocados.email && errores.email && (
            <span className="mensaje-error" id="error-email">
              {errores.email}
            </span>
          )}
        </div>

        {/* CAMPO: MENSAJE */}
        <div className="grupo-campo">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={valores.mensaje}
            onChange={handleChange}
            onBlur={handleBlur}
            className={obtenerClaseInput('mensaje')}
            placeholder="Escribe tu mensaje aquí..."
            rows="5"
            required
          />
          {tocados.mensaje && errores.mensaje && (
            <span className="mensaje-error" id="error-mensaje">
              ⚠️ {errores.mensaje}
            </span>
          )}
        </div>

        {/* BOTÓN DE ENVÍO */}
        <button
          type="submit"
          className="boton-enviar"
          // Opcional: El botón se puede deshabilitar si ya se ha enviado el mensaje
          disabled={enviado}
        >
          {enviado ? 'Enviando...' : 'Enviar Mensaje'}
        </button>

      </form>
    </div>
  );
}
