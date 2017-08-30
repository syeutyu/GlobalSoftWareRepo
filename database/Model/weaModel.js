let mongoose = require('mongoose');
let schema = require('../Schema/weaSchema');

let model = mongoose.model('story', schema);
module.exports = model;