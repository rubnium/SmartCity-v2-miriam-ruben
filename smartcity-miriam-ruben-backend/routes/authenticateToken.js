var jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY;

function authenticateToken(req, res, next) {
    var token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send({
            ok: false,
            message: 'Token inválido'
        });
    }
    token = token.replace('Bearer ', '');
    jwt.verify(token, secretKey, function(err, token) {
        if (err) {
            return res.status(401).send({
                ok: false,
                message: 'Token inválido'
            });
        } else {
            req.token = token;
            next();
        }
    });
}

module.exports = authenticateToken;
