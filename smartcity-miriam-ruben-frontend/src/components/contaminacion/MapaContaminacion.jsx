import { memo, useEffect, useState } from 'react';
import { MapContainer, useMap } from 'react-leaflet';

import L from 'leaflet';

import api from '../../utils/api';
import gM from '../../utils/generalMap';
import '../ExampleMap.css';

const colores = ['1', '2', '3', '4'];

const obtenerMarcadores = async (fecha, setData, setError) => {
    try {
        const response = await api.get('/acustica/contaminacion/'+ fecha );
        setData(response.data);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        setError(error.message || 'Error en la solicitud');
    }
};

const obtenerRiesgos = async (setData, setError) => {
    try {
        const response = await api.get('/acustica/riesgos');
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setError(error.message || 'Error en la solicitud');
      }
}

function UseMap({ marcadores, periodo, riesgos }) {
    const map = useMap();
    map.setView(gM.centro, gM.zoom);
    L.tileLayer(gM.url).addTo(map);

    map.setMaxBounds(gM.limites);
    map.options.bounceAtZoomLimits = false;

    const canvas = L.canvas();
    map.addLayer(canvas);

    useEffect(() => {    
        marcadores.forEach(marcador => {
            const {estacion, lat, lon, med_nocturno, med_diurno, med_vespertino, LAeq24, nombre, altura} = marcador;
            var valor = 0;
            switch (periodo) {
                case '24h':
                    valor = LAeq24;
                    break;
                case 'diurno':
                    valor = med_diurno;
                    break;
                case 'vespertino':
                    valor = med_vespertino;
                    break;
                case 'nocturno':
                    valor = med_nocturno;
                    break;
                default:
                    valor = LAeq24;
                    break;
            }

            var riesgoNivelPunto = "Desconocido";
            var riesgoDescPunto = "Desconocidos";

            //array de colores creado arriba

            for (var i = 0; i < riesgos.length; i++) {
                if (valor > riesgos[i].min && valor <= riesgos[i].max) {
                    riesgoNivelPunto = riesgos[i].nivel;
                    riesgoDescPunto = riesgos[i].riesgo;
                    break;
                }
            }

            const colorPunto = colores[i];


            L.circleMarker([lat, lon], {
                renderer: canvas
            }).addTo(map).bindPopup(`${valor}dB, ${riesgoNivelPunto}\nDescripción: ${riesgoDescPunto}`);   
            
        });
    }, [periodo, marcadores]);

    return null;
}

const MapaContaminacion = (props) => {
    const { fecha, periodo, contador } = props;
    const [marcadores, setMarcadores] = useState([]);
    const [riesgos, setRiesgos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        obtenerRiesgos(setRiesgos, setError);
    }, []);
  
    useEffect(() => {
        obtenerMarcadores(fecha, setMarcadores, setError);
    }, [contador]);

    const UseMapMemoized = memo(UseMap);

    return (
        <div>
            <p>Fecha: {fecha}</p>
            <p>Periodo: {periodo} {marcadores.length}</p>

        <MapContainer>
            <UseMapMemoized marcadores={marcadores} periodo={periodo} riesgos={riesgos}/>
        </MapContainer>
    </div>
    );
}

export default MapaContaminacion;