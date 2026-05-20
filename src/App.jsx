import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./components/Inicio";
import Servicios from "./components/Servicios";
import Contacto from "./components/Contacto";
import Navbar from "./components/Navbar";

// Componente Principal de la Aplicación
function App() {
  // Estado para leer el tema desde localStorage.
  const [tema, setTema] = useState(() => {
    const temaGuardado = localStorage.getItem("tema");
    return temaGuardado || "oscuro";
  });

  // useEffect se ejecuta cada vez que el estado de 'tema' cambia.
  // Se encarga de interactuar de manera directa con el DOM global del navegador
  useEffect(() => {
    if (tema === "claro") {
      document.body.classList.add("claro");
    } else {
      document.body.classList.remove("claro");
    }
    localStorage.setItem("tema", tema);
  }, [tema]);

  // Función conmutadora que alterna entre los dos estados de tema disponibles
  const toggleTema = () => {
    setTema((prevTema) => (prevTema === "oscuro" ? "claro" : "oscuro"));
  };

  return (
    <BrowserRouter>
      {/* El menú de navegación recibe la prop del tema y la función conmutadora 
          para que podamos renderizar el botón interactivo de cambio de tema */}
      <Navbar tema={tema} toggleTema={toggleTema} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;