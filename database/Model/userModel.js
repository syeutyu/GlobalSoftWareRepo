let mongoose = require('mongoose');
let schema = require('../Schema/userSchema');

schema.static('findModule', function(token, callback) {
    console.log(token);
    return this.find({ token: token }, callback);
});

schema.static('findByUser', function(module_num, callback) {
    return this.find({ 'module': module_num }, callback);
});

schema.static('updateModule', function(token, callback) {
    return this.update({ token: token }, { $set: { module: "" } }, callback);
});

let model = mongoose.model('person', schema);
module.exports = model;