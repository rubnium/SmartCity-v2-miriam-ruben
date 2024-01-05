import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ContextoPopup } from './ContextoPopup';

const PopupDesHabilitar = (props) => {
    const { modo, tipo, parada, linea } = props;
    const { mostrarPopup } = useContext(ContextoPopup);
    const handleDialogClose = () => {};

    var tituloPopup = "";
    var boton = "";
    if (modo === "habilitar") {
        tituloPopup = "Habilitar parada";
        boton = "Habilitar";
    } else if (modo === "deshabiilitar") {
        tituloPopup = "Deshabilitar parada";
        boton = "Deshabilitar";
    }

    return (
        <Dialog open={mostrarPopup} onClose={handleDialogClose} fullWidth maxWidth="sm">
            <DialogTitle>{tituloPopup}</DialogTitle>
            <DialogContent>
            <p>Parada: X, linea X</p>
            { modo === "habilitar" && <p>Motivo de deshabilitación:<br/><i>Insertar motivo</i></p>}
            { modo === "deshabilitar" && <TextField label="Motivo de deshabilitación" fullWidth />}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDialogClose}>Cancelar</Button>
            <Button /*onClick={handleDeshabilitarParada}*/>{boton}</Button>
            </DialogActions>
      </Dialog>
    );
}

export default PopupDesHabilitar;
