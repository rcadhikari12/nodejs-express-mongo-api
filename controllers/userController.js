

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

//admin-products
router.post('/admin/add-new-product', userService.addNewProduct);

module.exports = router;