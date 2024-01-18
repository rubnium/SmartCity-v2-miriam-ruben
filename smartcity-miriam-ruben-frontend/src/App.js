import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import config from './config';
import Main from './components/Main';
import Paradas from './components/paradas/Paradas';
import Bicicletas from './components/bicicletas/Bicicletas';
import Contaminacion from './components/contaminacion/Contaminacion';
import Login from './components/Login';
import Navbar from "./components/navbar/Navbar";
import ExampleMap from "./utils/ExampleMap"; //evita que el mapa se rompa

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Main/>} />
              <Route path="/paradas" element={<Paradas tabTitle={"Paradas | "+config.tabTitle}/>} />
              <Route path="/bicicletas" element={<Bicicletas tabTitle={"Bicicletas | "+config.tabTitle}/>} />
              <Route path="/contaminacion" element={<Contaminacion tabTitle={"Contaminación | "+config.tabTitle} />} />
              <Route path="/login" element={<Login tabTitle={"Autenticarse | "+config.tabTitle} />} />
          </Routes>
          <footer className="footer-container"><p>
            Desarrollado por Miriam Fernández Osuna y Rubén Gómez Villegas<br/>
            UCLM Talavera de la Reina - Grado en Ingeniería Informática<br/>
            Sistemas de Información Ubicuos 23/24
          </p></footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
