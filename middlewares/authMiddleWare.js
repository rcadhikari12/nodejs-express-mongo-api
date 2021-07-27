

const jwt = require('jsonwebtoken');


const SCECRET_KEY = 'Hepola12345!@@##$%$';






const requireAuth = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    jwt.verify(token, SCECRET_KEY, (err, decoded) => {

        if (err) return res.status(401).send({ auth: false, message: "No token provided" });

        next();

    })



}


module.exports = { requireAuth };