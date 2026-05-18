import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./components/Inicio";
import Servicios from "./components/Servicios";
import Contacto from "./components/Contacto";
import Navbar from "./components/Navbar";

// Componente Principal de la Aplicación
function App() {
  return (
    // BrowserRouter envuelve la aplicación para habilitar el enrutamiento
    <BrowserRouter>
      {/* El menú de navegación se muestra en todas las rutas */}
      <Navbar />

      {/* Routes define las diferentes vistas y sus rutas */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;