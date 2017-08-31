let mongoose = require('mongoose');
let schema = require('../Schema/userSchema');

schema.static('findModule', function(token, callback) {
    return this.find({ token: token }, callback);
});

let model = mongoose.model('person', schema);
module.exports = model;