

var express = require('express');
var router = express.Router();

var userService = require('../services/userService')


//users

router.get('/getAllUsers', userService.getAllUsers);
router.get('/getUserById/:id', userService.getUserById);
router.post('/api/v1/users/register', userService.registerUser);


//profiles

router.delete('/api/v1/profile/image/:id', userService.deleteProfileImage);


//address
router.patch('/api/v1/profile/address/:id', userService.updateAddress); //pass only address objec: steet, city, state, zip


//products
router.get('/api/v1/products/:PRODUCT_ID', userService.getProductById); //returns {status: "success", product:{} }
router.get('/api/v1/homepage/products', userService.getHomepageProducts); //returns {status: "success", products: []} -> 8 random category products
router.get('/api/v1/products', userService.getAllProducts); //returns {status: "success", products: []}


//admin-products
router.post('/admin/add-new-product', userService.addNewProduct);
router.delete('/api/v1/admin/products/:id', userService.deleteProductById);
router.patch('/api/v1/admin/products/:id', userService.updateProduct); //pass the whole product obj


//homepage-banner
router.get('/api/v1/homepage/banner', userService.getBannerImages); //returns {status: "success", products:[]}

//categories
router.get('/api/v1/homepage/categories', userService.getCategories); //returns {status: "success", categories: []}



module.exports = router;