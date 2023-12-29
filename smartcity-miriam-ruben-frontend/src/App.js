import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './components/Main';
import Navbar from "./components/navbar/Navbar";
import logo from './logo.svg';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Main/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
