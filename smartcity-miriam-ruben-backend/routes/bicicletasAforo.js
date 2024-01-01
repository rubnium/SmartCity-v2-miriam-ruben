var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var db = mongoose.connection;

const collection = 'bicicletasAforo'

var BicicletaAforoSchema = require('../models/BicicletaAforo').set('collection', collection);

//GET todas las paradas de un tipo
router.get('/id=:id', function (req, res){
  const id = req.params.id;
  var Aforo = mongoose.model(collection, BicicletaAforoSchema);
  Aforo.find().exec({ id: id })
    .then(document => {
      res.status(200).json(document);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:dia/:mes/:ano/:hora', function (req, res){
  const fecha = '{req.params.dia}/{req.params.mes}/{req.params.ano}';
  const hora = req.params.hora;

  var Aforo = mongoose.model(collection, BicicletaAforoSchema);
  Aforo.find().exec({ fecha: fecha, hora: hora })
    .then(document => {
      res.status(200).json(document);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;