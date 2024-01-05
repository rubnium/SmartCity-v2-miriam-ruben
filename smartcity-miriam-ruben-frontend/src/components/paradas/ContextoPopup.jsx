//Usado para pasar valores entre MapaParadas y PopupDesHabilitar

import { createContext, useState } from 'react';

export const ContextoPopup = createContext();

export function CtxPopupProvider({ children }) {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [parada, setParada] = useState("");
  const [linea, setLinea] = useState("");
  const [modo, setModo] = useState("");
  const [contador, setContador] = useState(0);

  return (
    <ContextoPopup.Provider value={{ mostrarPopup, setMostrarPopup, parada, setParada, linea, setLinea, modo, setModo, contador, setContador }}>
      {children}
    </ContextoPopup.Provider>
  );
}