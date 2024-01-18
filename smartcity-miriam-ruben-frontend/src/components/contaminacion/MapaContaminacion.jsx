import CircleIcon from '@mui/icons-material/Circle';
import { Grid } from '@mui/material';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, useMap } from 'react-leaflet';

import { apiGet } from '../../utils/apiRequests';
import gM from '../../utils/generalMap';
import '../../utils/Map.css';

const colores = ['green', 'yellow', 'red', 'brown', 'black'];

const obtenerMarcadores = (fecha, setData, setError) => {
  apiGet('/acustica/contaminacion/'+ fecha, setData, setError);
};

const obtenerRiesgos = (setData, setError) => {
  apiGet('/acustica/riesgos', setData, setError);
};

function UseMap({ marcadores, periodo, riesgos }) {
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
    	const {estacion, lat, lon, med_nocturno, med_diurno, med_vespertino, LAeq24, nombre, altura} = marcador;
      var valor = 0;
      switch (periodo) {
        case '24h':
        	valor = LAeq24;
        	break;
        case 'diurno':
        	valor = med_diurno;
        	break;
        case 'vespertino':
          valor = med_vespertino;
          break;
        case 'nocturno':
          valor = med_nocturno;
          break;
        default:
          valor = LAeq24;
          break;
      }

      if (valor > 0){
        var riesgoNivelPunto = "Desconocido";

        for (var i = 0; i < riesgos.length; i++) {
          if (valor > riesgos[i].min && valor <= riesgos[i].max) {
            riesgoNivelPunto = riesgos[i].nivel;
          	break;
          }
        }

        const colorPunto = colores[i];

        L.circleMarker([lat, lon], {
          renderer: canvas,
          color: colorPunto
        }).addTo(map).bindPopup(`<div style="text-align: center;">
          <b>${valor}dB</b>, ${riesgoNivelPunto}<br />
          ${nombre}, ${altura}m de altura
        </div>`);   
      }
  	});
	}, [periodo, marcadores]);

  return null;
}

const MapaContaminacion = (props) => {
  const { fecha, periodo, contador } = props;
  const [marcadores, setMarcadores] = useState([]);
  const [riesgos, setRiesgos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerRiesgos(setRiesgos, setError);
  }, []);
  
  useEffect(() => {
    obtenerMarcadores(fecha, setMarcadores, setError);
  }, [contador]);

	return (
    <Grid item container xs={12}>
      <Grid item xs={12} md={3} lg={2}>
        {riesgos.map((riesgo, index) => (
          <p key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '-5px' }}>
            <CircleIcon sx={{ color: colores[index] }}/>
            <span><i>{riesgo.nivel}</i>: {riesgo.riesgo}</span>
          </p>
        ))}
        <p />
      </Grid>
      <Grid item xs={12} md={9} lg={10}>
        <MapContainer>
          <UseMap marcadores={marcadores} periodo={periodo} riesgos={riesgos} />
        </MapContainer>
      </Grid>
    </Grid>
  );
};

export default MapaContaminacion;
