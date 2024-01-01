import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import { useEffect, useState } from 'react';
import 'leaflet-polylinedecorator';
import L from 'leaflet';

import api from '../utils/api';
import './ExampleMap.css';

const groupMarkersByLine = (markers) => {
  const markersByLine = {};

  markers.forEach((marker) => {
    const { linea } = marker;

    if (!markersByLine[linea]) {
      markersByLine[linea] = [];
    }

    markersByLine[linea].push(marker);
  });

  return markersByLine;
};

const createPolylines = (markersByLine) => {
  const polylines = [];

  for (const linea in markersByLine) {
    const markers = markersByLine[linea];
    const coordinates = markers.map(({ lat, lon }) => [lat, lon]);

    polylines.push({
      linea,
      coordinates,
    });
  }

  return polylines;
};

const renderPolylines = (polylines) => {
  return polylines.map((polyline) => (
    <Polyline
      key={polyline.linea}
      positions={polyline.coordinates}
      color={'blue'} // Puedes personalizar el color según tus necesidades
    >
      <Popup>Línea: {polyline.linea}</Popup>
    </Polyline>
  ));
};

const obtenerMarcadores = async (apiUrl, setData, setError) => {
  try {
    const response = await api.get(apiUrl);
    setData(response.data);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    setError(error.message || 'Error en la solicitud');
  }
};

function ExampleMap() {
  const madridCenter = [40.41692952216298, -3.700834722849244];
  const [marcadoresAutobus, setMarcadoresAutobus] = useState([]);
  const [marcadoresCercanias, setMarcadoresCercanias] = useState([]);
  const [marcadoresInterurbano, setMarcadoresInterurbano] = useState([]);
  const [marcadoresMetro, setMarcadoresMetro] = useState([]);
  const [marcadoresMetroLigero, setMarcadoresMetroLigero] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerMarcadores('/paradas/metroLigero', setMarcadoresMetroLigero, setError);
  }, []);

  const markersByLine = groupMarkersByLine(marcadoresMetroLigero);
  const polylines = createPolylines(markersByLine);

  return (
    <div>
      <MapContainer center={madridCenter} id="mapId" zoom={13}>
        {renderPolylines(polylines)}
        {marcadoresMetroLigero.map((marcador, index) => (
          <Marker position={[marcador.lat, marcador.lon]}>
            <Popup>Línea: {marcador.linea}<br/>Parada: {marcador.parada}</Popup>
          </Marker>
        ))}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}

export default ExampleMap;