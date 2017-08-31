const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
    novel: { type: JSON }
});

module.exports = personSchema;