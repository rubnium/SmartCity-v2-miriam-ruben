import L from 'leaflet';
import CircleIcon from '@mui/icons-material/Circle';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { MapContainer, useMap } from 'react-leaflet';

import api from '../../utils/api';
import gM from '../../utils/generalMap';
import '../../utils/Map.css';

const colores = ['green', 'yellow', 'orange', 'red', 'purple'];

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
  map.setView(gM.centro, gM.zoom+1);
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
      const {lat, lon, bicicletas, nombre_vial, numero} = marcador;
      var colorPunto = '';
      var radioPunto = 10;

      if (bicicletas > 10) {
        colorPunto = colores[0];
      } else if (bicicletas >= 5 && bicicletas <= 10) {
        colorPunto = colores[1];
      } else if (bicicletas >= 2 && bicicletas <= 4) {
        colorPunto = colores[2];
      } else if (bicicletas === 1) {
        colorPunto = colores[3];
      } else {
        colorPunto = colores[4];
        radioPunto = 2;
      }

      L.circleMarker([lat, lon], {
          renderer: canvas,
          color: colorPunto,
          radius: radioPunto
      }).addTo(map).bindPopup(`<div style="text-align: center;">
        Bicicletas: <b>${bicicletas}</b><br />
        ${nombre_vial}, ${numero}<br />
        <a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=walking">Abrir en Maps</a>
      </div>`);   

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
    <Grid item container xs={12}>
      <Grid item xs={12} md={3} lg={2}>
        <p style={{ display: 'flex', alignItems: 'center', marginBottom: '-5px' }}>
          <CircleIcon sx={{ color: colores[0] }}/>
          <span>{'>10 bicicletas disponibles'}</span>
        </p>
        <p style={{ display: 'flex', alignItems: 'center', marginBottom: '-5px' }}>
          <CircleIcon sx={{ color: colores[1] }}/>
          <span>{'5-10 bicicletas disponibles'}</span>
        </p>
        <p style={{ display: 'flex', alignItems: 'center', marginBottom: '-5px' }}>
          <CircleIcon sx={{ color: colores[2] }}/>
          <span>{'2-4 bicicletas disponibles'}</span>
        </p>
        <p style={{ display: 'flex', alignItems: 'center', marginBottom: '-5px' }}>
          <CircleIcon sx={{ color: colores[3] }}/>
          <span>{'1 bicicleta disponible'}</span>
        </p>
        <p style={{ display: 'flex', alignItems: 'center', marginBottom: '-5px' }}>
          <CircleIcon sx={{ color: colores[4], fontSize: 14 }}/>
          <span>{'Sin bicicletas disponibles'}</span>
        </p>
        <p />
      </Grid>
      <Grid item xs={12} md={9} lg={10}>
        <MapContainer>
          <UseMap marcadores={marcadores} />
        </MapContainer>
      </Grid>
    </Grid>
  );
}

export default MapaBicicletas;