var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var db = mongoose.connection;

const collectionContaminacion = 'contaminacionAcustica';
var ContaminacionAcusticaSchema = require('../models/ContaminacionAcustica').set('collection', collectionContaminacion);
var ContaminacionAcusticaModel = mongoose.model(collectionContaminacion, ContaminacionAcusticaSchema);

const collectionEstaciones = 'estacionesMedidaAcustica';
var EstacionAcusticaSchema = require('../models/EstacionAcustica').set('collection', collectionEstaciones);

const collectionRiesgos = 'riesgosAcustica';
var RiesgoAcusticaSchema = require('../models/RiesgoAcustica').set('collection', collectionRiesgos);

//Implementación JWT
const authenticateToken = require('./authenticateToken');
router.use('/', authenticateToken);

router.get('/contaminacion/:mes/:ano', function (req, res) {
  const mes = parseInt(req.params.mes, 10);
  const ano = parseInt(req.params.ano, 10);

  ContaminacionAcusticaModel.aggregate([
    {
      $match: {
        mes: mes
      },
    },
    {
      $lookup: {
        from: 'estacionesMedidaAcustica',
        localField: 'estacion',
        foreignField: 'id',
        as: 'estacion_info',
      },
    },
    {
      $unwind: '$estacion_info',
    },
    {
      $project: {
        _id: 1,
        estacion: '$estacion',
        med_nocturno: '$med_nocturno',
        med_diurno: '$med_diurno',
        med_vespertino: '$med_vespertino',
        LAeq24: '$LAeq24',
        lat: '$estacion_info.lat',
        lon: '$estacion_info.lon',
        nombre: '$estacion_info.nombre',
        altura: '$estacion_info.altura',
        mes: '$mes',
        ano: '$ano'
      },
    },
  ])
    .exec()
    .then((document) => {
      res.status(200).json(document);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/riesgos', function (req, res){  
    var Riesgo = mongoose.model(collectionRiesgos, RiesgoAcusticaSchema);
    Riesgo.find().exec()
      .then(document => {
        res.status(200).json(document);
      })
      .catch(err => {
        res.status(500).send(err);
      });
 });

router.post('/estacion', async function (req, res){
  var Estacion = mongoose.model(collection, EstacionAcusticaSchema);
  try {
    await Estacion.create(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message || err);
  }
});

router.post('/contaminacion', async function (req, res){
  var Contaminacion = mongoose.model(collection, ContaminacionAcusticaSchema);
  try {
    await Contaminacion.create(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message || err);
  }
});

module.exports = router;