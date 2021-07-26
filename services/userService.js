

var mongoose = require('mongoose')
var User = require('../models/userModel')
let Response = require('../models/responseModel')
let Product = require('../models/productModel')
let Order = require('../models/orderModel')



//users
module.exports.getAllUsers = (req, res, next) => {

    User.find((err, users) => {
        if (err) throw err;
        res.send(users);
    })

}


module.exports.getUserById = function (req, res, next) {
    User.findById(req.params.id, (err, user) => {
        if (err) throw err;
        if (!user) return res.status(404).send('user doesnt exist with this Id.');
        res.send({ status: "success", profile: user });
    });
};


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



module.exports.getProductById = function (req, res, next) {
    Product.findById(req.params.PRODUCT_ID, (err, product) => {
        if (err) throw err;
        if (!product) return res.status(404).send('Product doesnt exist with this Id.');

        let responseProduct = {};
        responseProduct.status = "success";
        responseProduct.product = product;
        res.send(responseProduct);
    });
};


module.exports.deleteProductById = (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err) => {
        if (err) throw err;

        let response = new Response();
        response.status = "success";
        response.message = "product deleted successfully";
        res.send(response);


    })

}


module.exports.updateProduct = (req, res) => {

    Product.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) throw err;

        let response = new Response();
        response.status = "success";
        response.message = "profile modified successfully";
        res.send(response);


    });

};


module.exports.getBannerImages = (req, res, next) => {

    Product.find((err, products) => {
        if (err) throw err;

        let productList = [];

        let counter = 0;
        for (var i = products.length - 1; i >= 0; i--) {

            productObj = {}
            productObj.image = products[i].image;
            productObj.name = products[i].name;
            productObj.created_on = products[i].created_on;
            productList[counter] = productObj;
            counter++;

            if (counter == 3) {
                break;
            }

        }


        let responseProduct = {};
        responseProduct.status = "success";
        responseProduct.products = productList;
        res.send(responseProduct);
    })

}

module.exports.getCategories = (req, res, next) => {

    Product.find((err, products) => {
        if (err) throw err;

        let categoriesList = [];
        let categoryNames = []

        for (var i = 0; i < 20; i++) {
            let index = Math.floor(Math.random() * (products.length - 1 - 0));

            if (categoryNames.indexOf(products[index].category) === -1) {
                categoryNames.push(products[index].category);
                let categoryObj = {};
                categoryObj.name = products[index].category;
                categoriesList.push(categoryObj);
            }

            if (categoryNames.length >= 3) {
                break;
            }
        }

        let responseProduct = {};
        responseProduct.status = "success";
        responseProduct.categories = categoriesList;
        res.send(responseProduct);
    })

}


module.exports.getHomepageProducts = (req, res, next) => {

    Product.find((err, products) => {
        if (err) throw err;

        let productList = [];
        let categoryNames = []

        for (var i = 0; i < 40; i++) {
            let index = Math.floor(Math.random() * (products.length - 1 - 0));

            if (categoryNames.indexOf(products[index].category) === -1) {
                categoryNames.push(products[index].category);
                console.log(products[index].category);
                productList.push(products[index]);
            }

            if (categoryNames.length >= 8) {
                break;
            }
        }

        let responseProduct = {};
        responseProduct.status = "success";
        responseProduct.products = productList;
        res.send(responseProduct);
    })

}

module.exports.getAllProducts = (req, res, next) => {

    Product.find((err, products) => {
        if (err) throw err;

        let responseProduct = {};
        responseProduct.status = "success";
        responseProduct.products = products;
        res.send(responseProduct);

    })

}


//checkout

module.exports.checkoutProduct = (req, res) => {

    let order = new Order();
    userDetails = {};
    User.findOne(({ email: req.body.email }), (err, user) => {
        if (err) throw err;
        if (!user) {
            order.user = 'guest-user';
            userDetails.firstName = req.body.firstName;
            userDetails.lastName = req.body.lastName;
            userDetails.email = req.body.email;
            order.userDetails = userDetails;

        }
        else {
            order.user = user.id;
        }


        order.orderPlacedOn = new Date();
        order.orderDeliveredOn = null;
        order.cart = req.body.cart;


        Order.create(order, (err) => {
            if (err) throw err;

            let response = {};
            response.status = "success";
            response.message = "Order placed successfully";
            res.send(response);
        })


    });
}


module.exports.getAllOrders = (req, res, next) => {

    Order.find((err, orders) => {
        if (err) throw err;

        let responseOrder = {};
        responseOrder.status = "success";
        responseOrder.orders = orders;
        res.send(responseOrder);

    })

}

module.exports.getOrdersUsers = (req, res, next) => {

    Order.find((err, orders) => {
        if (err) throw err;

        orderList = [];

        for (var i = 0; i < orders.length; i++) {
            if (orders[i].user === req.params.user_id) {
                orderList.push(orders[i]);
            }
        }

        let responseOrder = {};
        responseOrder.status = "success";
        responseOrder.orders = orderList;
        res.send(responseOrder);

    })

}

module.exports.deleteOrderById = (req, res) => {
    Order.findByIdAndRemove(req.params.id, (err) => {
        if (err) throw err;

        let response = {};
        response.status = "success";
        response.message = "order deleted successfully";
        res.send(response);


    })

}

module.exports.processOrder = (req, res) => {


    Order.findByIdAndUpdate(req.params.id, { isDelievered: true, orderDeliveredOn: new Date() }, (err) => {
        if (err) throw err;

        let response = {};
        response.status = "success";
        response.message = "order modified successfully";
        res.send(response);


    });

};









