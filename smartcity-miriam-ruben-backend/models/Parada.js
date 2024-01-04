var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ParadaSchema = new Schema({
  lat: String,
  lon: String,
  linea: String,
  parada: String,
  deshabilitado: Boolean,
  motivo: { type: String, default: "" }
});

module.exports = ParadaSchema;
