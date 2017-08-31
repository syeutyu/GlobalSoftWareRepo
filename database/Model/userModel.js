let mongoose = require('mongoose');
let schema = require('../Schema/userSchema');

schema.static('findModule', function(token, callback) {
    return this.find({ token: token }, callback);
});

schema.static('findByUser', function(module_num, callback) {
    console.log('실행 ' + module_num);
    return this.find({ 'module.as': module_num }, callback);
});

let model = mongoose.model('person', schema);
module.exports = model;