

var express = require('express');
var router = express.Router();
const { requireAuth } = require('../middlewares/authMiddleWare')


var userService = require('../services/userService')
let authService = require('../services/authService');


//login
router.post('/api/v1/users/login', authService.loginUser);



//getLoggedInUser
router.get('/api/v1/users/getLoggedUser', requireAuth, authService.getLoggedUser);


//admin-users
router.get('/getAllUsers', requireAuth, userService.getAllUsers);
router.delete('/api/v1/admin/users/:id', requireAuth, userService.deleteUser);
router.delete('/api/v1/admin/users/add-user', requireAuth, userService.addUser);



//users
router.get('/getUserById/:id', requireAuth, userService.getUserById);
router.post('/api/v1/users/register', userService.registerUser);


//profiles
router.delete('/api/v1/profile/image/:id', requireAuth, userService.deleteProfileImage);
router.get('/api/v1/profile/:id', requireAuth, userService.getUserById);


//address
router.patch('/api/v1/profile/address/:id', requireAuth, userService.updateAddress); //pass only address objec: {steet, city, state, zip}


//products
router.get('/api/v1/products/:PRODUCT_ID', userService.getProductById); //returns {status: "success", product:{} }
router.get('/api/v1/homepage/products', userService.getHomepageProducts); //returns {status: "success", products: []} -> 8 random category products
router.get('/api/v1/products', userService.getAllProducts); //returns {status: "success", products: []}


//admin-products
router.post('/admin/add-new-product', requireAuth, userService.addNewProduct);
router.delete('/api/v1/admin/products/:id', requireAuth, userService.deleteProductById);
router.patch('/api/v1/admin/products/:id', requireAuth, userService.updateProduct); //pass the whole product obj


//admin-orders
router.get('/api/v1/admin/orders', requireAuth, userService.getAllOrders);
router.delete('/api/v1/admin/orders/:id', requireAuth, userService.deleteOrderById);
router.patch('/api/v1/orders/:id', requireAuth, userService.processOrder); //no need to pass body, only pass id to parameter


//homepage-banner
router.get('/api/v1/homepage/banner', userService.getBannerImages); //returns {status: "success", products:[]}


//categories
router.get('/api/v1/homepage/categories', userService.getCategories); //returns {status: "success", categories: []}


//checkout
router.post('/api/v1/checkout', userService.checkoutProduct);

//orders
router.get('/api/v1/orders/:user_id', requireAuth, userService.getOrdersUsers);




module.exports = router;