import L from 'leaflet';
import CircleIcon from '@mui/icons-material/Circle';
import { Button, Grid } from '@mui/material';
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
    api.get('/paradas/'+ fecha +'/'+hora).then((res) => {
      setDeshabilitados(res.data);
    });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    setError(error.message || 'Error en la solicitud');
  }*/
};

function deshabilitarParada() {
	console.log("deshabilitada")
}

function UseMap({ marcadores, tipo }) {
  const map = useMap();

	var zoom = gM.zoom;
	if (tipo === 'autobus') {
		zoom = zoom+1;
	} else if (tipo === 'cercanias') {
		zoom = zoom-1;
	} else if (tipo === 'interurbano') {
		zoom = zoom-2;
	}

  map.setView(gM.centro, zoom);
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

		const lineas = {}; // Almacena las coordenadas de los puntos para cada línea
    
    marcadores.forEach(marcador => {
			const {lat, lon, linea, parada} = marcador;

			const coordenadas = [lat, lon];

			if (lineas[linea]) {
				lineas[linea].push(coordenadas);
			} else {
				lineas[linea] = [coordenadas];
			}

      L.circleMarker([lat, lon], {
          renderer: canvas,
					radius: 5
      }).addTo(map).bindPopup(`<div style="text-align: center;">
				${linea}<br />
				${parada}<br />
				<Button onclick={deshabilitarParada}>Deshabilitar</button>
      </div>`);   

    });

		Object.keys(lineas).forEach(linea => {
			const polyline = L.polyline(lineas[linea], { color: 'blue' }).addTo(map);

			polyline.on('click', (event) => {
				const latlng = event.latlng;
				L.popup()
					.setLatLng(latlng)
					.setContent(`<div style="text-align: center;">Línea ${linea}</div>`)
					.openOn(map);
			});
		});
	}, [marcadores]);

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
      
      <Grid item xs={12} md={9} lg={10}>
        <MapContainer>
          <UseMap marcadores={marcadores} tipo={tipo}/>
        </MapContainer>
      </Grid>
    </Grid>
  );
}

export default MapaParadas;
