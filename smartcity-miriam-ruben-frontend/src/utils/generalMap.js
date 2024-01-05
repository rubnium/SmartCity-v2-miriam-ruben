import L from 'leaflet';

const gM = {
    centro: [40.41692952216298, -3.700834722849244], //centro del mapa, Madrid
    limites: L.latLngBounds( //limite del mapa para mostrar Madrid
        [41.802697, -7.384931], 
        [38.916897, -0.345458]
      ),
    zoom: 11,
    minZoom: 8,
    //url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
    //url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    //url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
    url: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoicnViZW5nb21lejEwIiwiYSI6ImNscXplbXlodTA0NGEycXBpcXF6cnVsNGsifQ.xmQA7ZiG3bx7DJb_KxTJtg"
    //Token: sk.eyJ1IjoicnViZW5nb21lejEwIiwiYSI6ImNscXplbXlodTA0NGEycXBpcXF6cnVsNGsifQ.xmQA7ZiG3bx7DJb_KxTJtg
};

export default gM;
