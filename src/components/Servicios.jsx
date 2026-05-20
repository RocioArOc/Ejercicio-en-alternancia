import React, { useState } from 'react';
import './Servicios.css';

export default function Servicios() {
  // Definimos un array estático de objetos que representan los servicios que se ofrecen.
  const listaServicios = [
    {
      id: 1,
      titulo: 'Diseño y Desarrollo Web',
      descripcion: 'Diseñamos y desarrollamos sitios web corporativos modernos, optimizados para buscadores (SEO) y completamente adaptables a cualquier dispositivo móvil. Creados con las últimas tecnologías del ecosistema de React para garantizar la máxima velocidad.',
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      titulo: 'Diseño de Interfaces (UI/UX)',
      descripcion: 'Creamos experiencias digitales intuitivas y atractivas. Llevamos a cabo investigaciones con usuarios, prototipado rápido y diseño visual centrado en la usabilidad, asegurando que tus clientes naveguen con facilidad y disfruten de tu producto.',
      url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      titulo: 'Desarrollo de Aplicaciones Móviles',
      descripcion: 'Llevamos tu idea a las tiendas de aplicaciones más importantes (App Store y Google Play). Desarrollamos aplicaciones móviles robustas, fluidas y seguras utilizando arquitecturas modernas que garantizan un rendimiento óptimo de los dispositivos.',
      url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      titulo: 'Consultoría e Infraestructura Cloud',
      descripcion: 'Te asesoramos en la modernización de tus procesos tecnológicos. Diseñamos arquitecturas en la nube escalables, seguras y eficientes para optimizar costes de servidores, automatizar despliegues y asegurar la alta disponibilidad de tu servicio.',
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80'
    }
  ];


  // Creamos el estado 'imagenActiva' para almacenar el objeto del servicio seleccionado.
  const [imagenActiva, setImagenActiva] = useState(listaServicios[0]);

  return (
    <div className="contenedor-pagina">
      <h1>Nuestros Servicios</h1>

      {/*CONTENEDOR PRINCIPAL DE LA GALERÍA */}
      <div className="galeria-contenedor">

        {/* ÁREA DEL VISOR PRINCIPAL */}
        {/* Usamos renderizado condicional para asegurarnos 
            de que el visor solo se renderice si hay una imagen activa en el estado. */}
        {imagenActiva && (
          <div className="visor-principal">

            {/* Contenedor de la Imagen Grande */}
            <div className="imagen-principal-wrapper">
              <img
                key={imagenActiva.id}
                src={imagenActiva.url}
                alt={imagenActiva.titulo}
                className="imagen-principal"
              />
            </div>

            {/* Detalles del Servicio Seleccionado */}
            <div className="info-servicio">
              <h2>{imagenActiva.titulo}</h2>
              <p>{imagenActiva.descripcion}</p>
            </div>

          </div>
        )}

        {/* CARRUSEL*/}
        <div className="contenedor-miniaturas">
          {listaServicios.map((servicio) => {
            // Evaluamos si esta miniatura es la que está seleccionada en el estado.
            // Si coincide, le añadimos la clase 'activa' para aplicar el resaltado visual mostaza definido en el CSS.
            const esActiva = servicio.id === imagenActiva.id;
            const claseMiniatura = esActiva ? 'miniatura-boton activa' : 'miniatura-boton';

            return (
              <button
                key={servicio.id}
                onClick={() => setImagenActiva(servicio)}
                className={claseMiniatura}
                // Atributo que ayuda a lectores de pantalla
                aria-label={`Ver servicio de ${servicio.titulo}`}
              >
                <img
                  // Miniatura de la imagen
                  src={servicio.url}
                  alt={`Miniatura de ${servicio.titulo}`}
                  className="miniatura-img"
                />
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
