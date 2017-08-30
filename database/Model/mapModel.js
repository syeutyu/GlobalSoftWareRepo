let mongoose = require('mongoose');
let schema = require('../Schema/mapSchema');

let model = mongoose.model('map', schema);
module.exports = model;