let mongoose = require('mongoose');
let schema = require('../Schema/userSchema');

schema.static('findModule', function(token, callback) {
    console.log('findModule');
    return this.find({ token: token }, callback);
});

schema.static('findByUser', function(module_num, callback) {
    console.log('findByUser');
    return this.find({ 'module': module_num }, callback);
});

schema.static('updateModule', function(token, callback) {
    console.log('updateModule');
    return this.update({ token: token }, { $set: { module: "" } }, callback);
});

let model = mongoose.model('person', schema);
module.exports = model;