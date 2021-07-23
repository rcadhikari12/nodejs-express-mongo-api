

let mongoose = require('mongoose');

let responseSchema = mongoose.Schema({
    status: String,
    message: String

});


module.exports = mongoose.model('Response', responseSchema);