

var mongoose = require('mongoose')
var User = require('../models/userModel')
let jwt = require('jsonwebtoken')


const SCECRET_KEY = 'Hepola12345!@@##$%$';



module.exports.loginUser = (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        if (!user) return res.status(404).send('user doesnt exist with this email.');


        if (user.password === req.body.password) {
            const authToken = jwt.sign({ user: user }, SCECRET_KEY);
            res.send({ authToken: authToken });
        }
        else {
            res.send({ status: "failure", message: "Invalid password" })
        }

    });

}


module.exports.getLoggedUser = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    jwt.verify(token, SCECRET_KEY, (err, decoded) => {

        if (err) return res.status(401).send({ auth: false, message: "No token provided" });


        User.findById(decoded.user._id, { password: 0 }, (err, user) => {
            if (err) throw err;
            if (!user) return res.status(404).send('user doesnt exist with this email.');

            res.send(user);

        });

    })

}


