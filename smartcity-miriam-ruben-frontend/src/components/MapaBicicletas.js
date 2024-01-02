import { memo, useEffect, useState } from 'react';
import { MapContainer, useMap } from 'react-leaflet';

import L from 'leaflet';

import api from '../utils/api';
import gM from '../utils/generalMap';
import './ExampleMap.css';

const obtenerMarcadores = async (fecha, hora, setData, setError) => {
  try {
    const response = await api.get('/bicicletasAforo/'+ fecha +'/'+hora);
    setData(response.data);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    setError(error.message || 'Error en la solicitud');
  }
};

function UseMap({ marcadores }) {
  const map = useMap();
  map.setView(gM.centro, gM.zoom);
  L.tileLayer(gM.url).addTo(map);

  map.setMaxBounds(gM.limites);
  map.options.bounceAtZoomLimits = false;

  const canvas = L.canvas();
  map.addLayer(canvas);

  useEffect(() => {    
    marcadores.forEach(marcador => {
      const {lat, lon, bicicletas} = marcador;
      if (bicicletas !== 0){
        L.circleMarker([lat, lon], {
          renderer: canvas
        }).addTo(map).bindPopup('Bicis: '+bicicletas);   
      }
    });
  }, [marcadores]);

  return null;
}

const MapaBicicletas = (props) => {
  const { fecha, hora, contador } = props;
  const [fechaLocal, setFecha] = useState('');
  const [marcadores, setMarcadores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFecha(fecha);
    if (contador === 1) {
      obtenerMarcadores(fechaLocal, hora, setMarcadores, setError);
    }
  }, [contador]);

  useEffect(() => {
    obtenerMarcadores(fechaLocal, hora, setMarcadores, setError);
  }, [fechaLocal, hora]);

  const UseMapMemoized = memo(UseMap);

  return (
    <div>
      <p>Fecha: {fechaLocal}</p>
      <p>Hora: {hora} {marcadores.length}</p>

      <ul>
      {marcadores.map((marcador, index) => (
          <li>{marcador.id}, {marcador.lat}, {marcador.lon}, {marcador.bicicletas}</li>
      ))}
      </ul>
      <MapContainer>
        <UseMapMemoized marcadores={marcadores} />
      </MapContainer>
    </div>
  );
}

export default MapaBicicletas;