import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
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
    </nav>
  );
}
