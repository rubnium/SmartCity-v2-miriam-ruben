import { useEffect, useState } from 'react';
import { MapContainer, useMap } from 'react-leaflet';
import L from 'leaflet';

import api from '../utils/api';
import './ExampleMap.css';

const madridCenter = [40.41692952216298, -3.700834722849244];
const limitesMapa = L.latLngBounds(
  [41.802697, -7.384931], 
  [38.916897, -0.345458]
);
const marcadores = [];


const obtenerMarcadores = async (fecha, hora, setError) => {
  try {
    const response = await api.get('/bicicletasAforo/'+ fecha +'/'+hora);
    marcadores = response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    setError(error.message || 'Error en la solicitud');
  }
};

function UseMap() {
  const map = useMap();
  map.setView(madridCenter, 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  map.setMaxBounds(limitesMapa);
  map.options.bounceAtZoomLimits = false;

  const canvas = L.canvas();
  map.addLayer(canvas);

  useEffect(() => {    
    marcadores.forEach(marcador => {
      const {lat, lon, bicicletas} = marcador;

      L.circleMarker([lat, lon], {
        renderer: canvas
      }).addTo(map).bindPopup(bicicletas);   
    });
  }, [marcadores]);

  L.circleMarker([48.85, 2.35], {
  	renderer: canvas
  }).addTo(map).bindPopup('marker 2');
  return null;
}

const MapaBicicletas = (props) => {
  const { fecha, hora, contador } = props;
  const [fechaLocal, setFecha] = useState('');

  const [error, setError] = useState(null);


  useEffect(() => {
    setFecha(fecha);
    if (contador === 1) {
      obtenerMarcadores(fecha, hora, setError);
    }
  }, [contador]);

  useEffect(() => {
    obtenerMarcadores(fecha, hora, setError);
  }, [hora]);


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
        <UseMap />
      </MapContainer>
    </div>
  );
}

export default MapaBicicletas;