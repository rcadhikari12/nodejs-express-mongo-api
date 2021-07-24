


let mongoose = require('mongoose');

let orderSchema = mongoose.Schema({

    user: String,
    userDetails: { type: Object, default: null },
    orderPlacedOn: Date,
    isDelievered: { type: Boolean, default: false },
    orderDeliveredOn: Date,
    cart: Array


});


module.exports = mongoose.model('Order', orderSchema);