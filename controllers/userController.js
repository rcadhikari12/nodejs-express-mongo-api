

var express = require('express');
var router = express.Router();
const { requireAuth } = require('../middlewares/authMiddleWare')




var userService = require('../services/userService')
let authService = require('../services/authService');


//login
router.post('/api/v1/users/login', authService.loginUser);

//getLoggedInUser
router.get('/api/v1/users/getLoggedUser', authService.getLoggedUser);


//users

router.get('/getAllUsers', requireAuth, userService.getAllUsers);
router.get('/getUserById/:id', userService.getUserById);
router.post('/api/v1/users/register', userService.registerUser);


//profiles

router.delete('/api/v1/profile/image/:id', userService.deleteProfileImage);
router.get('/api/v1/profile/:id', userService.getUserById);


//address
router.patch('/api/v1/profile/address/:id', userService.updateAddress); //pass only address objec: {steet, city, state, zip}


//products
router.get('/api/v1/products/:PRODUCT_ID', userService.getProductById); //returns {status: "success", product:{} }
router.get('/api/v1/homepage/products', userService.getHomepageProducts); //returns {status: "success", products: []} -> 8 random category products
router.get('/api/v1/products', userService.getAllProducts); //returns {status: "success", products: []}


//admin-products
router.post('/admin/add-new-product', userService.addNewProduct);
router.delete('/api/v1/admin/products/:id', userService.deleteProductById);
router.patch('/api/v1/admin/products/:id', userService.updateProduct); //pass the whole product obj


//admin-orders
router.get('/api/v1/admin/orders', userService.getAllOrders);
router.delete('/api/v1/admin/orders/:id', userService.deleteOrderById);
router.patch('/api/v1/orders/:id', userService.processOrder); //no need to pass body, only pass id to parameter


//homepage-banner
router.get('/api/v1/homepage/banner', userService.getBannerImages); //returns {status: "success", products:[]}


//categories
router.get('/api/v1/homepage/categories', userService.getCategories); //returns {status: "success", categories: []}


//checkout
router.post('/api/v1/checkout', userService.checkoutProduct);

//orders
router.get('/api/v1/orders/:user_id', userService.getOrdersUsers);




module.exports = router;