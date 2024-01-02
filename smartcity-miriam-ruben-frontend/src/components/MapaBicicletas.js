import { memo, useEffect, useState } from 'react';
import { MapContainer, useMap } from 'react-leaflet';
import L from 'leaflet';

import api from '../utils/api';
import './ExampleMap.css';

const madridCenter = [40.41692952216298, -3.700834722849244];
const limitesMapa = L.latLngBounds(
  [41.802697, -7.384931], 
  [38.916897, -0.345458]
);


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
  map.setView(madridCenter, 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  map.setMaxBounds(limitesMapa);
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

  L.circleMarker([48.85, 2.35], {
  	renderer: canvas
  }).addTo(map).bindPopup('marker 2');
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
      obtenerMarcadores(fecha, hora, setMarcadores, setError);
    }
  }, [contador]);

  useEffect(() => {
    obtenerMarcadores(fecha, hora, setMarcadores, setError);
  }, [hora]);

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