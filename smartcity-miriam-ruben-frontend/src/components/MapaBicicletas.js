import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import { useEffect, useState } from 'react';
import 'leaflet-polylinedecorator';
import L from 'leaflet';

import api from '../utils/api';
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

//TODO: cuando se toque el boton, la fecha se almacena, y se pone a true lo de fecha cambiada.
//- Tras ello se muestran las estadístias resumen de las bicicletas de ese día (solo se actualizan cada vez que se toca al botón)
//- cuando cambia la hora, se actualiza el mapa

const MapaBicicletas = (props) => {
  const { fecha, hora } = props;
  const madridCenter = [40.41692952216298, -3.700834722849244];
  const [marcadores, setMarcadores] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (fecha && hora) {
      obtenerMarcadores(fecha, hora, setMarcadores, setError);
    }
  }, [fecha, hora]);

  return (
    <div>
      <p>Fecha: {fecha}</p>
      <p>Hora: {hora}</p>
      <ul>
      {marcadores.map((marcador, index) => (
          <li>{marcador.id}, {marcador.lat}, {marcador.lon}</li>
      ))}
      </ul>
      {/*
      <MapContainer center={madridCenter} id="mapId" zoom={13}>
        {marcadoresMetroLigero.map((marcador, index) => (
          <Marker position={[marcador.lat, marcador.lon]}>
            <Popup>Línea: {marcador.linea}<br/>Parada: {marcador.parada}</Popup>
          </Marker>
        ))}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    */}
    </div>
  );
}

export default MapaBicicletas;