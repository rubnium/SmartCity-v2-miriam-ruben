import logo from '../logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from './Main';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Routes>
            <Route path="/" element={<Main/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
