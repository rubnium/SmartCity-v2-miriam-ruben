import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-polylinedecorator';
import L from 'leaflet';

import gM from './generalMap'
import './Map.css';


function ExampleMap() {
  return (
    <div>
      <MapContainer center={gM.centro} id="mapId" zoom={gM.zoom}>
        <TileLayer url={gM.url} />
      </MapContainer>
    </div>
  );
}

export default ExampleMap;