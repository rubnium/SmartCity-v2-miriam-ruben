import React from "react";
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Typography, Select } from '@mui/material';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/locale/es';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import MapaContaminacion from "./MapaContaminacion";

dayjs.locale('es');

const cardStyle = {
    margin: '10px',
    width: 'calc(100% - 20px)', // Garantiza que ocupe el 100% menos el doble del margen
  };

export default function Contaminacion() {
    const [mes, setMes] = React.useState('01/2051');
    const [mesBoton, setMesBoton] = React.useState('');
    const [periodo, setPeriodo] = React.useState('nocturno');
    const [periodoBoton, setPeriodoBoton] = React.useState('');
    const [botonClick, setBotonClick] = React.useState(false);
    const [contadorClick, setContadorClick] = React.useState(0);
    const [error, setError] = React.useState(null);

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

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25, ml: '10px', mt: '10px' }}>
                <Typography variant="h5" className="page-title">Contaminación acústica</Typography>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ minWidth: 275 }} style={cardStyle}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <p>Hola mundo</p>
                            </Grid>
                            <Grid item container spacing={3} alignItems="center" xs={12}>
                                <Grid item xs={6} sm={4} md={3} lg={2}>
                                    <p>Holas</p>
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
                                    <p><br /> </p>
                                    <Button variant="outlined" onClick={handleBotonClick}>Cargar fecha</Button>
                                </Grid>
                            </Grid>
                            

                            {botonClick && 
                            <Grid item xs={12}>
                                <MapaContaminacion fecha={mesBoton} periodo={periodoBoton} contador={contadorClick} />
                            </Grid>}
                        </Grid>
                    </CardContent>
                </Card>
                
            </Grid>
        </Grid>
    )
}