import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, useMap } from 'react-leaflet';

import api from '../../utils/api';
import gM from '../../utils/generalMap';
import '../../utils/Map.css';

const obtenerMarcadores = (fecha, hora, setData, setError) => {
  try {
    api.get('/bicicletasAforo/'+ fecha +'/'+hora).then((res) => {
      setData(res.data);
    });
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
  map.setMinZoom(gM.minZoom);
  map.options.bounceAtZoomLimits = false;

  const canvas = L.canvas();
  map.addLayer(canvas);

  useEffect(() => {    
    map.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Path) {
          map.removeLayer(layer);
      }
    });

    marcadores.forEach(marcador => {
      const {lat, lon, bicicletas} = marcador;
      if (bicicletas !== 0){
        L.circleMarker([lat, lon], {
          renderer: canvas
        }).addTo(map).bindPopup(`<div style="text-align: center;">
        <b>Bicicletas: ${bicicletas}</b><br />
        <a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=walking">Abrir en Maps</a>
      </div>`);   
      }
    });
  }, [marcadores]);

  return null;
}

const MapaBicicletas = (props) => {
  const { fecha, hora, contador } = props;
  const [marcadores, setMarcadores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerMarcadores(fecha, hora, setMarcadores, setError);
  }, [fecha, hora]);

  return (
    <div>
      <p>Fecha: {fecha}</p>
      <p>Hora: {hora} {marcadores.length}</p>

      <ul>
      {marcadores.map((marcador, index) => (
          <li>{marcador.id}, {marcador.lat}, {marcador.lon}, {marcador.bicicletas}</li>
      ))}
      </ul>
      <MapContainer>
        <UseMap marcadores={marcadores} />
      </MapContainer>
    </div>
  );
}

export default MapaBicicletas;