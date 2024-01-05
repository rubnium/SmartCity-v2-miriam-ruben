import { createContext, useState } from 'react';

export const ContextoPopup = createContext();

export function CtxPopupProvider({ children }) {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [parada, setParada] = useState("");
  const [linea, setLinea] = useState("");
  const [modo, setModo] = useState("");

  return (
    <ContextoPopup.Provider value={{ mostrarPopup, setMostrarPopup, parada, setParada, linea, setLinea, modo, setModo }}>
      {children}
    </ContextoPopup.Provider>
  );
}