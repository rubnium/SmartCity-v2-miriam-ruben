import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';

import api from '../../utils/api';

const cardStyle = {
    margin: '10px',
    width: 'calc(100% - 20px)',
};

const cookieOptions = {
    expires: 7, //expira en 7 dias
    sameSite: 'Lax'
};

const obtenerToken = (email, setData, setError) => {
    try {
        api.get('/bicicletasDisponibilidad').then((res) => { //TODO: cambiar URI
            setData(res.data);
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        setError(error.message || 'Error en la solicitud');
    }
};

export default function Login(props) {
    const {tabTitle} = props;
    document.title = tabTitle;

    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [cookieAceptada, setCookieAceptada] = useState(false);
    const [cookieEmail, setCookieEmail] = useState('');
    const [checkDisabled, setCheckDisabled] = useState(false);
    const [error, setError] = useState(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleCookiesChange = (event) => {
        setCookieAceptada(event.target.checked);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        obtenerToken(email, setToken, setError);
        Cookies.set('email', email, cookieOptions);
        Cookies.set('token', token, cookieOptions);
        Cookies.set('cookieAceptada', true, cookieOptions);
    }

    useEffect(() => {
        setCookieAceptada(Cookies.get('cookieAceptada'));
        setCheckDisabled(Cookies.get('cookieAceptada'));
        setCookieEmail(Cookies.get('email'));
    }, []);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -4.25, ml: '10px', mt: '10px' }}>
                <Typography variant="h5" className="page-title"><PersonIcon sx={{ fontSize: 28, verticalAlign: 'middle', marginRight: 1 }}/>Autenticarse</Typography>
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ minWidth: 275 }} style={cardStyle}>
                    <CardContent>
                        <Grid container justifyContent="center" spacing={3}>
                            <Grid item xs={12}>
                                <p>"info de como el usuario se puede logear"</p>
                            </Grid>
                            <Grid item xs={12} sm={10} md={8} lg={5}>
                                <Box component="form" onSubmit={handleSubmit}>
                                    {cookieEmail ? <p><i>Email usado anteriormente:</i> {cookieEmail}</p> : null}
                                    <TextField onChange={handleEmailChange}  variant="outlined" margin="normal" required fullWidth id="email" label="Email" name="email" autoFocus/>
                                    <FormControlLabel control={<Checkbox value="remember" color="primary" required checked={cookieAceptada} onChange={handleCookiesChange} disabled={checkDisabled}/>} label="Acepto los términos y condiciones de uso, y el uso de cookies"/>
                                    <p><br /></p>
                                    <Button type="submit" fullWidth variant="contained" color="primary">Autenticarse</Button>
                                    <p />
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                
            </Grid>
        </Grid>
    )
};
