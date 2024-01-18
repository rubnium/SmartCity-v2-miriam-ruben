var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var db = mongoose.connection;

const collection = 'bicicletasAforo'

var BicicletaAforoSchema = require('../models/BicicletaAforo').set('collection', collection);

//Implementación JWT
const authenticateToken = require('./authenticateToken');
router.use('/', authenticateToken);

//GET todos los datos de una estación de aforo
router.get('/id=:id', function (req, res){
  const id = req.params.id;
  var Aforo = mongoose.model(collection, BicicletaAforoSchema);
  Aforo.find({ id: id }).exec()
    .then(document => {
      res.status(200).json(document);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:dia/:mes/:ano/:hora', function (req, res){
  const fecha = `${req.params.dia}/${req.params.mes}/${req.params.ano}`;
  const hora = req.params.hora;

  var Aforo = mongoose.model(collection, BicicletaAforoSchema);
  Aforo.find({ fecha: fecha, hora: hora }).exec()
    .then(document => {
      res.status(200).json(document);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;