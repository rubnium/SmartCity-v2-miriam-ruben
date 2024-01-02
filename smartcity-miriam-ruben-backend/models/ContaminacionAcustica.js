var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ContaminacionAcusticaSchema = new Schema({
    mes: Number,
    ano: Number,
    estacion: Number,
    med_diurno: Number,
    med_vespertino: Number,
    med_nocturno: Number,
    LAeq24: Number,
    med_percentil01: Number,
    med_percentil10: Number,
    med_percentil50: Number,
    med_percentil90: Number,
    med_percentil99: Number
});

module.exports = ContaminacionAcusticaSchema;
