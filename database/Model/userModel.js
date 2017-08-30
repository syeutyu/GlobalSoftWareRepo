let mongoose = require('mongoose');
let schema = require('../Schema/userSchema');

let model = mongoose.model('person', schema);
module.exports = model;