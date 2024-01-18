import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';
import { Alert, Box, Button, Card, CardContent, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';

import api from '../utils/api';
import { apiGet } from '../utils/apiRequests'

const cardStyle = {
    margin: '10px',
    width: 'calc(100% - 20px)',
};

const cookieOptions = {
    expires: 7, //expira en 7 dias
    sameSite: 'Lax'
};

const obtenerToken = async (email) => {
    try {
        const res = await api.post('/secure/login', { "email": email });
        return res.data.token;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error.message || 'Error en la solicitud';
    }
};

const probarAutenticacion = (setAutenticado) => {
    api.get('/secure/test')
    .then((res) => {
        if (res.status === 200) {
            setAutenticado(true);
        } else {
            setAutenticado(false);
        }
    })
    .catch((error) => { console.error('Error al obtener datos:', error); });
};

export default function Login(props) {
    const {tabTitle} = props;
    document.title = tabTitle;

    const [email, setEmail] = useState('');
    const [cookieAceptada, setCookieAceptada] = useState(false);
    const [cookieEmail, setCookieEmail] = useState('');
    const [checkDisabled, setCheckDisabled] = useState(false);
    const [error, setError] = useState(null);
    const [autenticado, setAutenticado] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleCookiesChange = (event) => {
        setCookieAceptada(event.target.checked);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = await obtenerToken(email);
            Cookies.set('email', email, cookieOptions);
            Cookies.set('token', token, cookieOptions);
            Cookies.set('cookieAceptada', true, cookieOptions);
            window.location.href = '/';
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        setCookieAceptada(Cookies.get('cookieAceptada'));
        setCheckDisabled(Cookies.get('cookieAceptada'));
        setCookieEmail(Cookies.get('email'));
        probarAutenticacion(setAutenticado); 
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
                                <p>Para hacer uso del sistema, debe autenticarse introduciendo su correo electrónico. El correo solo es para identificar quién está usando el sistema, y no se utilizará con ningún otro fin distinto.</p>
                            </Grid>
                            <Grid item xs={12} sm={10} md={8} lg={5}>
                                {autenticado && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Estás actualmente autenticado.</Alert>}
                                {!autenticado && <Alert severity="error">Estás actualmente sin autenticar.</Alert> }
                                <p><br /></p>
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
