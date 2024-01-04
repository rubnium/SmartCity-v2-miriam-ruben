import { memo, useEffect, useState } from 'react';
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Typography, Select } from '@mui/material';
import NoiseAwareIcon from '@mui/icons-material/NoiseAware';

import MapaContaminacion from "./MapaContaminacion";

const cardStyle = {
    margin: '10px',
    width: 'calc(100% - 20px)',
  };

export default function Contaminacion() {
    const [mes, setMes] = useState('01/2051');
    const [mesBoton, setMesBoton] = useState('');
    const [periodo, setPeriodo] = useState('nocturno');
    const [periodoBoton, setPeriodoBoton] = useState('');
    const [botonClick, setBotonClick] = useState(false);
    const [contadorClick, setContadorClick] = useState(0);
    const [error, setError] = useState(null);

    const handlePeriodoChange = (event) => {
        setPeriodo(event.target.value);
    };

    const handleMesChange = (event) => {
        setMes(event.target.value);
    };

    const handleBotonClick = () => {
        setBotonClick(true);
        setMesBoton(mes);
        setPeriodoBoton(periodo);
        setContadorClick(contadorClick + 1);
    };

    const MemoizedMapaContaminacion = memo(MapaContaminacion);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -4.25, ml: '10px', mt: '10px' }}>
                <Typography variant="h5" className="page-title"><NoiseAwareIcon sx={{ fontSize: 28, verticalAlign: 'middle', marginRight: 1 }}/>Contaminación acústica</Typography>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ minWidth: 275 }} style={cardStyle}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <p>La contaminación acústica es un problema que afecta la calidad de vida de los ciudadanos en entornos urbanos, y proviene de fuentes como el tráfico, actividad industrial y eventos urbanos.</p>
                                <p>Con el siguiente mapa se puede mostrar la magnitud del problema, lo cual puede promover cambios por parte de la sociedad como por las autoridades para implementar medidas y mejorar la planificación urbana.</p>
                            </Grid>
                            <Grid item container spacing={3} alignItems="center" xs={12}>
                                <Grid item xs={6} sm={4} md={3} lg={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="mes-elegir-label">Mes</InputLabel>
                                        <Select id="mes-elegir" value={mes} label="Mes" onChange={handleMesChange} >
                                            <MenuItem value={"01/2051"}>Enero de 2051</MenuItem>
                                            <MenuItem value={"02/2051"}>Febrero de 2051</MenuItem>
                                            <MenuItem value={"03/2051"}>Marzo de 2051</MenuItem>
                                            <MenuItem value={"04/2051"}>Abril de 2051</MenuItem>
                                            <MenuItem value={"05/2051"}>Mayo de 2051</MenuItem>
                                            <MenuItem value={"06/2051"}>Junio de 2051</MenuItem>
                                            <MenuItem value={"07/2051"}>Julio de 2051</MenuItem>
                                            <MenuItem value={"08/2051"}>Agosto de 2051</MenuItem>
                                            <MenuItem value={"09/2051"}>Septiembre de 2051</MenuItem>
                                            <MenuItem value={"10/2051"}>Octubre de 2051</MenuItem>
                                            <MenuItem value={"11/2051"}>Noviembre de 2051</MenuItem>
                                            <MenuItem value={"12/2051"}>Diciembre de 2051</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3} lg={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="periodo-elegir-label">Periodo</InputLabel>
                                        <Select id="periodo-elegir" value={periodo} label="Periodo" onChange={handlePeriodoChange} >
                                            <MenuItem value={"nocturno"}>Madrugada (23-07)</MenuItem>
                                            <MenuItem value={"diurno"}>Mañana-Tarde (07-19)</MenuItem>
                                            <MenuItem value={"vespertino"}>Tarde-Noche (19-23)</MenuItem>
                                            <MenuItem value={"24h"}>24 horas</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3} lg={2}>
                                    <Button variant="outlined" onClick={handleBotonClick}>Cargar fecha</Button>
                                </Grid>
                            </Grid>
                                                        
                            {botonClick &&
                                <MemoizedMapaContaminacion fecha={mesBoton} periodo={periodoBoton} contador={contadorClick} />
                            }
                        </Grid>
                    </CardContent>
                </Card>
                
            </Grid>
        </Grid>
    )
}