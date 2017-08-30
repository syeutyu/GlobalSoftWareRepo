const mongoose = require('mongoose');
const Story = require('./weaSchema');
const Schema = mongoose.Schema;

const personSchema = Schema({
    token: { type: String, unique: true },
    module: { type: Array }
});

module.exports = personSchema;