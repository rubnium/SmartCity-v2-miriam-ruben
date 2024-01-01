var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var BicicletaDisponibilidadSchema = new Schema({
  fecha: String,
  horas_totales_uso: Number,
  horas_totales_disponibilidad: Number,
  total_horas_servicio: Number,
  media_disponibles: Number,
  usos_abonado_anual: Number,
  usos_abonado_ocasional: Number,
  total_usos: Number
});

module.exports = BicicletaDisponibilidadSchema;
