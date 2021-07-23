

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({

    firstName: String,
    lastName: String,
    password: String,
    email: String,
    profileImage: String,

    address: {
        streetAddress: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zipcode: { type: String, default: '' },
    }


});


module.exports = mongoose.model('User', userSchema);