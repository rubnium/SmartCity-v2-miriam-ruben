import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

import '../App.css';
import logo from '../logo.png';
import main_text from '../images/main-text.png';

const cardStyle = {
    margin: '10px',
    width: 'calc(100% - 20px)',
  };

export default function Main() {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25, ml: '10px', mt: '10px', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h3" className="page-main-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>¡Bienvenido a ... !</Typography>
                <Typography variant="h3" className="page-main-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={logo} className="app-logo" alt="logo" style={{ marginLeft: '2px', height: '4em' }} /></Typography>
                <Typography variant="h5" className="page-main-subtitle"><i>Una ciudad que viaja más allá de las fronteras de la imaginación.</i></Typography>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ minWidth: 275 }} style={cardStyle}>
                    <CardContent>
                        <Grid container justifyContent="center" spacing={3}>
                            <Grid item xs={12} sm={12} md={8} lg={9}>
                                <p>Ceretopía es una sistema gestor de ciudad inteligente basada en la capital española de Madrid. Sin embargo... está un poco diferente, esto se debe a que es el modelo que van a poder contemplar los habitantes de la ciudad y los internautas ¡en el futuro año 2051!</p>
                                <p>Este modelo ha sido desarrollado por los estudiantes de 4º curso de Ingeniería informática <a href="https://github.com/myria75">Miriam Fernández Osuna</a> y <a href="https://github.com/rubnium">Rubén Gómez Villegas</a>. Los estudiantes pretenden ofrecer a los ciudadanos un lugar sostenible e inteligente para futuras generaciones en la ciudad metropolitana de Madrid. En ella, los ciudadanos y los gestores podrán manejar y consultar las paradas de transporte público, puntos de recogida de bicicletas y saber cuáles son las áreas más contaminantes. Todo esto con el fin de reducir las emisiones, notificar a los ciudadanos, y concienciar de que colaborando entre todos se puede tener una ciudad mucho mejor.</p>
                            </Grid>
                            <Grid item xs={10} sm={7} md={3} lg={2} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <img src={main_text} alt="main_text" style={{ marginLeft: '2px', width: '100%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                
            </Grid>
        </Grid>
    )
};
