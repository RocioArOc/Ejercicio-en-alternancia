import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ tema, toggleTema }) {
  return (
    <nav className="barra-navegacion">
      <ul className="enlaces-navegacion">
        <li>
          {/* NavLink nos permite saber qué sección está activa */}
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "enlace activo" : "enlace"}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/servicios"
            className={({ isActive }) => isActive ? "enlace activo" : "enlace"}
          >
            Servicios
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contacto"
            className={({ isActive }) => isActive ? "enlace activo" : "enlace"}
          >
            Contacto
          </NavLink>
        </li>
      </ul>

      {/* Botón para cambiar dinámicamente las clases del body de la aplicación */}
      <button
        onClick={toggleTema}
        className="boton-tema"
        aria-label={`Cambiar a modo ${tema === 'oscuro' ? 'claro' : 'oscuro'}`}
        title={`Cambiar a modo ${tema === 'oscuro' ? 'claro' : 'oscuro'}`}
      >
        {tema === 'oscuro' ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}
