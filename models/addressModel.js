
let mongoose = require('mongoose');

let addressSchema = mongoose.Schema({

    streetAddress: String,
    city: String,
    state: String,
    zipcode: String

});


module.exports = mongoose.model('Address', addressSchema);


