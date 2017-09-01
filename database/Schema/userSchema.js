const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
    token: { type: String, unique: true },
    module: { type: String, default: "" }
});

module.exports = personSchema;