import { memo, useEffect, useState } from 'react';
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Typography, Select } from '@mui/material';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/locale/es';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import EstadisticasBicicletas from "./EstadisticasBicicletas";
import MapaBicicletas from "./MapaBicicletas";

dayjs.locale('es');

const cardStyle = {
    margin: '10px',
    width: 'calc(100% - 20px)', // Garantiza que ocupe el 100% menos el doble del margen
  };

export default function Bicicletas() {
    const [fecha, setFecha] = useState('01/01/2051');
    const [fechaBoton, setFechaBoton] = useState('');
    const [hora, setHora] = useState('0:00');
    const [botonClick, setBotonClick] = useState(false);
    const [contadorClick, setContadorClick] = useState(0);
    const [error, setError] = useState(null);

    const handleHoraChange = (event) => {
        setHora(event.target.value);
    };

    const handleFechaChange = (newValue) => {
        const fechaFormateada = newValue.format('DD/MM/YYYY');
        setFecha(fechaFormateada);
    };

    const handleBotonClick = () => {
        setBotonClick(true);
        setFechaBoton(fecha);
        setContadorClick(contadorClick + 1);
    };

    const MemoizedMapaBicicletas = memo(MapaBicicletas);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25, ml: '10px', mt: '10px' }}>
                <Typography variant="h5" className="page-title">Bicicletas</Typography>
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
                                    <LocalizationProvider locale="es" dateAdapter={AdapterDayjs}>
                                        <DatePicker label="Fecha" value={dayjs(fecha, 'DD/MM/YYYY')} format="DD/MM/YYYY" minDate={dayjs('2051-01-01')} maxDate={dayjs('2051-12-31')} onChange={handleFechaChange} />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3} lg={2}>
                                    <p><br /> </p>
                                    <Button variant="outlined" onClick={handleBotonClick} >Cargar fecha</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} />
                            {botonClick &&
                            <Grid item xs={12}>
                                <EstadisticasBicicletas fecha={fechaBoton} contador={contadorClick}/>
                            </Grid>}
                            <Grid item xs={12} />
                            {botonClick &&
                            <Grid item xs={12}>
                                <Typography variant="h6">Mapa de disponibilidad</Typography>
                            </Grid>}
                            {botonClick && 
                            <Grid item xs={6} sm={4} md={3} lg={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="hora-elegir-label">Hora</InputLabel>
                                    <Select id="hora-elegir" value={hora} label="Hora" onChange={handleHoraChange} >
                                        <MenuItem value={"0:00"}>0:00</MenuItem>
                                        <MenuItem value={"1:00"}>1:00</MenuItem>
                                        <MenuItem value={"2:00"}>2:00</MenuItem>
                                        <MenuItem value={"3:00"}>3:00</MenuItem>
                                        <MenuItem value={"4:00"}>4:00</MenuItem>
                                        <MenuItem value={"5:00"}>5:00</MenuItem>
                                        <MenuItem value={"6:00"}>6:00</MenuItem>
                                        <MenuItem value={"7:00"}>7:00</MenuItem>
                                        <MenuItem value={"8:00"}>8:00</MenuItem>
                                        <MenuItem value={"9:00"}>9:00</MenuItem>
                                        <MenuItem value={"10:00"}>10:00</MenuItem>
                                        <MenuItem value={"11:00"}>11:00</MenuItem>
                                        <MenuItem value={"12:00"}>12:00</MenuItem>
                                        <MenuItem value={"13:00"}>13:00</MenuItem>
                                        <MenuItem value={"14:00"}>14:00</MenuItem>
                                        <MenuItem value={"15:00"}>15:00</MenuItem>
                                        <MenuItem value={"16:00"}>16:00</MenuItem>
                                        <MenuItem value={"17:00"}>17:00</MenuItem>
                                        <MenuItem value={"18:00"}>18:00</MenuItem>
                                        <MenuItem value={"19:00"}>19:00</MenuItem>
                                        <MenuItem value={"20:00"}>20:00</MenuItem>
                                        <MenuItem value={"21:00"}>21:00</MenuItem>
                                        <MenuItem value={"22:00"}>22:00</MenuItem>
                                        <MenuItem value={"23:00"}>23:00</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>}

                            {botonClick && 
                            <Grid item xs={12}>
                                <MemoizedMapaBicicletas fecha={fechaBoton} hora={hora} contador={contadorClick} />
                            </Grid>}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}