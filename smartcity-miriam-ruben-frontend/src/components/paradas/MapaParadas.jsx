import L from 'leaflet';
import CircleIcon from '@mui/icons-material/Circle';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { MapContainer, useMap } from 'react-leaflet';

import api from '../../utils/api';
import gM from '../../utils/generalMap';
import '../../utils/Map.css';

const obtenerMarcadores = (tipo, setMarcadores, setDeshabilitados, setError) => {
  try {
    api.get('/paradas/'+ tipo).then((res) => {
        setMarcadores(res.data);
    });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    setError(error.message || 'Error en la solicitud');
  }

  
  /*try {
    api.get('/bicicletasAforo/'+ fecha +'/'+hora).then((res) => {
      setData(res.data);
    });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    setError(error.message || 'Error en la solicitud');
  }*/
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

  /*
  useEffect(() => {    
    map.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Path) {
          map.removeLayer(layer);
      }
    });

    
    marcadores.forEach(marcador => {
//      const {lat, lon, bicicletas, nombre_vial, numero} = marcador;

      L.circleMarker([lat, lon], {
          renderer: canvas
      }).addTo(map).bindPopup(`<div style="text-align: center;">
        Texto
      </div>`);   

    });
  }, [marcadores]);
*/

  return null;
}

const MapaParadas = (props) => {
  const { tipo } = props;
  const [marcadores, setMarcadores] = useState([]);
  const [paradasDeshabilitadas, setParadasDeshabilitadas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerMarcadores(tipo, setMarcadores, setParadasDeshabilitadas, setError);
  }, [tipo]);

  return (
    <Grid item container xs={12}>
      <Grid item xs={12} md={3} lg={2}>
        <p>
            {tipo}
        </p>
      </Grid>
      {/*
      <Grid item xs={12} md={9} lg={10}>
        <MapContainer>
          <UseMap marcadores={marcadores} />
        </MapContainer>
      </Grid>*/}
    </Grid>
  );
}

export default MapaParadas;