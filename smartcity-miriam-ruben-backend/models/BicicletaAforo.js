var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var BicicletaAforoSchema = new Schema({
  fecha: String,
  hora: String,
  id: String,
  bicicletas: Number,
  num_distrito: Number,
  distrito: String,
  nombre_vial: String,
  numero: String,
  codigo_postal: Number,
  observaciones_direccion: String,
  lat: String,
  lon: String
});

module.exports = BicicletaAforoSchema;
