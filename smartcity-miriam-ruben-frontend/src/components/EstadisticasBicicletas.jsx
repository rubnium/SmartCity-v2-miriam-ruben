import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../utils/api';

const obtenerEstadisticas = async (fecha, setData, setError) => {
    try {
      const response = await api.get('/bicicletasDisponibilidad/'+ fecha);
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setError(error.message || 'Error en la solicitud');
    }
};

const EstadisticasBicicletas = (props) => {
    const { fecha, contador } = props;
    const [estadisticas, setEstadisticas] = useState(['']);

    const [error, setError] = useState(null);

    useEffect(() => {
        obtenerEstadisticas(fecha, setEstadisticas, setError);
    }, [contador]);

    return (
        <div>
            <Typography variant="h6">Estadísticas generales</Typography>
            <ul>
                <li>Horas totales de uso: {estadisticas[0].horas_totales_uso}</li>
                <li>Horas de disponibilidad: {estadisticas[0].horas_totales_disponibilidad}</li>
                <li>Sumatorio de horas: {estadisticas[0].total_horas_servicio}</li>
                <li>Tiempo medio de servicio: {estadisticas[0].media_disponibles} (horas de servicio / 24 horas)</li>
                <br />
                <li>Viajes efectuados por usuarios con abono anual: {estadisticas[0].usos_abonado_anual}</li>
                <li>Viajes efectuados por usuarios con abono ocasional: {estadisticas[0].usos_abonado_ocasional}</li>
                <li>Total de viajes: {estadisticas[0].total_usos}</li>
            </ul>
        </div>
    );
}

export default EstadisticasBicicletas;