const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weaSchema = Schema({
    sky: { type: String },
    maxTc: { type: String },
    minTc: { type: String }

});

module.exports = weaSchema;