import L from 'leaflet';

const gM = {
    centro: [40.41692952216298, -3.700834722849244], //centro del mapa, Madrid
    limites: L.latLngBounds( //limite del mapa para mostrar Madrid
        [41.802697, -7.384931], 
        [38.916897, -0.345458]
      ),
    zoom: 11,
    minZoom: 8,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

export default gM;
