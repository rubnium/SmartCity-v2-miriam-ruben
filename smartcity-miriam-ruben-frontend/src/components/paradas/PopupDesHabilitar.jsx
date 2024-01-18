import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useContext, useState } from 'react';

import { apiPut } from '../../utils/apiRequests';
import { ContextoPopup } from './ContextoPopup';

const PopupDesHabilitar = (props) => {
    const { tipo } = props;
    const { mostrarPopup, setMostrarPopup, parada, linea, motivoLeido, modo, contador, setContador } = useContext(ContextoPopup);
    const [ motivo, setMotivo ] = useState("");
    const [ error, setError ] = useState(null);
    const handleDialogClose = () => {
        setMostrarPopup(false);
    };

    const modificarMarcador = () => {
        setMostrarPopup(false);
        var cuerpo = {};
        if (modo === "habilitar") {
            cuerpo = {"deshabilitado": false, "motivo": ""};
        } else if (modo === "deshabilitar") {
            cuerpo = {"deshabilitado": true, "motivo": motivo};
        }
    
        apiPut('/paradas/'+tipo+'/'+linea+'/'+parada, cuerpo, setError);
        setContador(contador+1);
    };

    const handleMotivoChange = (event) => {
        setMotivo(event.target.value);
    };

    var tituloPopup = "";
    var boton = "";
    if (modo === "habilitar") {
        tituloPopup = "Habilitar parada";
        boton = "Habilitar";
    } else if (modo === "deshabilitar") {
        tituloPopup = "Deshabilitar parada";
        boton = "Deshabilitar";
    }

    return (
        <Dialog open={mostrarPopup} onClose={handleDialogClose} fullWidth maxWidth="sm">
            <DialogTitle>¿{tituloPopup}?</DialogTitle>
            <DialogContent>
            <p>Parada: {parada}, linea {linea}</p>
            { modo === "habilitar" && <p>Motivo de deshabilitación:<br/><i>{motivoLeido}</i></p>}
            { modo === "deshabilitar" && <TextField value={motivo} onChange={handleMotivoChange} label="Motivo de deshabilitación" fullWidth />}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDialogClose}>Cancelar</Button>
            <Button onClick={modificarMarcador}>{boton}</Button>
            </DialogActions>
      </Dialog>
    );
};

export default PopupDesHabilitar;
