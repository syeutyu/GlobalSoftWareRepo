let mongoose = require('mongoose');
let schema = require('../Schema/novelSchema');

schema.static('findNovel', function() {
    console.log('findNovel');
    return new Promise((resolve, reject) => {
        resolve(this.find({}));
    });
});

let model = mongoose.model('novel', schema);
module.exports = model;