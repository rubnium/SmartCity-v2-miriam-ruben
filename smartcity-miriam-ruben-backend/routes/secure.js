var express = require('express');
var jwt = require('jsonwebtoken');
require('dotenv').config();

var router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY;
const expiration = process.env.TOKEN_EXPIRATION;

//POST para obtener un token de autenticación
router.post('/login', function (req, res){
    const email = req.body.email;

    if(!email){
        res.status(400).send('Error: Email no enviado');
        return;
    }

    var u = {
        email: email,
        ipDir: req.ip
    };

    const token = jwt.sign(u, secretKey, {
        expiresIn: 60 * 60 * expiration
    });

    res.status(200).send({"token": token});
});
/*el cuerpo tiene que tener el siguiente formato:
{
    "email": "example@example.com"
}*/

//Implementación JWT
const authenticateToken = require('./authenticateToken');
router.use('/test', authenticateToken);
//GET para comprobar que el token es válido
router.get('/test', function (req, res) {
    res.status(200).send("Token válido");
});

module.exports = router;
