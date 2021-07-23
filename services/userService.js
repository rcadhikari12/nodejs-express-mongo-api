

var mongoose = require('mongoose')
var User = require('../models/userModel')
let Response = require('../models/responseModel')
let Product = require('../models/productModel')


module.exports.getAllUsers = (req, res, next) => {

    User.find((err, users) => {
        if (err) throw err;
        res.send(users);
    })

}


module.exports.registerUser = (req, res) => {
    var user = new User(req.body);
    User.create(user, (err) => {
        if (err) throw err;

        let response = new Response();
        response.status = "success";
        response.message = "User created successfully";
        res.send(response);
    })

}

//not tested yet
module.exports.deleteProfileImage = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err) => {
        if (err) throw err;

        let response = new Response();
        response.status = "success";
        response.message = "profile image deleted successfully";
        res.send(response);


    })

}


module.exports.updateAddress = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) throw err;
        if (!user) return res.status(404).send('user doesnt exist with this Id.');
        var updatedAddress = {

            address: {
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zipcode
            }
        };

        User.findByIdAndUpdate(req.params.id, updatedAddress, (err) => {
            if (err) throw err;

            let response = new Response();
            response.status = "success";
            response.message = "profile modified successfully";
            res.send(response);


        });
    });
};


module.exports.getUserById = function (req, res, next) {
    User.findById(req.params.id, (err, user) => {
        if (err) throw err;
        if (!user) return res.status(404).send('user doesnt exist with this Id.');
        res.send(user);
    });
};



//products-admin
module.exports.addNewProduct = (req, res) => {
    var product = new Product(req.body);
    Product.create(product, (err) => {
        if (err) throw err;

        let response = new Response();
        response.status = "success";
        response.message = "Product Added successfully";
        res.send(response);
    })

}

module.exports.getAllProducts = (req, res, next) => {

    Products.find((err, products) => {
        if (err) throw err;
        res.send(products);
        console.log("hello");
        console.log("ok");
    })

}

