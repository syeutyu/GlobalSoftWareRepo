let mongoose = require('mongoose');
let schema = require('../Schema/novelSchema');

schema.static('findNovel', function() {
    return new Promise((resolve, reject) => {
        resolve(this.find({}));
    });
});

let model = mongoose.model('novel', schema);
module.exports = model;