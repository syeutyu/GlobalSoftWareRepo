const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
    writer: { type: String },
    title: { type: String },
    content: { type: String }
});

module.exports = personSchema;