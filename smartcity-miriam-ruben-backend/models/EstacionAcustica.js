var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var EstacionAcusticaSchema = new Schema({
    id: Number,
    nombre: String,
    codigo_via: String,
    direccion: String,
    fecha_alta: String,
    altura: Number,
    lat: String,
    lon: String
});

module.exports = EstacionAcusticaSchema;