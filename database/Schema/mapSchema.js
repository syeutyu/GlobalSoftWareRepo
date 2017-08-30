const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mapSchema = Schema({
    lati: { type: String },
    longi: { type: String },
    name: { type: String },
    tel: { type: String },
    category: { type: String }
});

module.exports = mapSchema;