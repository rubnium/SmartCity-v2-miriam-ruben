var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var ParadaSchema = require('../models/Parada');

var db = mongoose.connection;

const tipos = ['autobus', 'cercanias', 'interurbano', 'metro', 'metroLigero'];

//GET todas las paradas de un tipo
router.get('/:tipo', function (req, res){
  const tipo = req.params.tipo;
  if (tipos.includes(tipo)) {
    var Parada = mongoose.model(tipo, ParadaSchema.set('collection', tipo));
    Parada.find().exec()
    .then(document => {
      res.status(200).json(document);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  } else {
    res.status(400).send('Error: Tipo no válido.');
  }
});

//GET todas las paradas de un tipo habilitadas o no
router.get('/:tipo/desh=:deshabilitado', function (req, res){
  const tipo = req.params.tipo;
  const deshabilitado = req.params.deshabilitado;
  if (tipos.includes(tipo)) {
    var Parada = mongoose.model(tipo, ParadaSchema.set('collection', tipo));
    Parada.find({ deshabilitado: deshabilitado }).exec()
    .then(document => {
      res.status(200).json(document);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  } else {
    res.status(400).send('Error: Tipo no válido.');
  }
});

//GET las paradas de un tipo y una linea
router.get('/:tipo/:linea', function (req, res){
  const tipo = req.params.tipo;
  const linea = req.params.linea;
  if (tipos.includes(tipo)) {
    var Parada = mongoose.model(tipo, ParadaSchema.set('collection', tipo));
    Parada.find({ linea: linea }).exec()
    .then(document => {
      res.status(200).json(document);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  } else {
    res.status(400).send('Error: Tipo no válido.');
  }
});

module.exports = router;