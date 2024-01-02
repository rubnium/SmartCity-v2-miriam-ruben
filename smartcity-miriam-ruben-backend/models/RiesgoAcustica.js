var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var RiesgoAcusticaSchema = new Schema({
  min: Number,
  max: Number,
  nivel: String,
  riesgo: String
});

module.exports = RiesgoAcusticaSchema;
