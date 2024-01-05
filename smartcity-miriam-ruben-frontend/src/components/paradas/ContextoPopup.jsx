import { createContext, useState } from 'react';

export const ContextoPopup = createContext();

export function CtxPopupProvider({ children }) {
  const [mostrarPopup, setMostrarPopup] = useState(false);

  return (
    <ContextoPopup.Provider value={{ mostrarPopup, setMostrarPopup }}>
      {children}
    </ContextoPopup.Provider>
  );
}