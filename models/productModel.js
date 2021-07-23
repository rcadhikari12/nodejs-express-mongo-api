

let mongoose = require('mongoose');

let productSchema = mongoose.Schema({

    name: String,
    category: String,
    price: Number,
    discountPrice: Number,
    description: String,
    image: String,
    created_on: { type: Date, default: Date.now },
    isTopProduct: Boolean

});


module.exports = mongoose.model('Product', productSchema);