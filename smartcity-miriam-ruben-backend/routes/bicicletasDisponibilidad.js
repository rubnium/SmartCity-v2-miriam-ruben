var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var db = mongoose.connection;

const collection = 'bicicletasDisponibilidad'

var BicicletaDisponibilidadSchema = require('../models/BicicletaDisponibilidad').set('collection', collection);

router.get('/:dia/:mes/:ano', function (req, res){
    const fecha = `${req.params.dia}/${req.params.mes}/${req.params.ano}`;
  
    var Disponibilidad = mongoose.model(collection, BicicletaDisponibilidadSchema);
    Disponibilidad.find({ fecha: fecha }).exec()
      .then(document => {
        res.status(200).json(document);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
  
module.exports = router;
