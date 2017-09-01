const userModel = require('../../database/Model/userModel');

exports.saveToken = (user) => {
    return new Promise((resolve, reject) => {
        user.save((err) => {
            if (err) { reject(err); } else { resolve(204); }
        });
    });
};

exports.findModule = (token, callback) => {
    userModel.findModule(token, (err, find) => {
        console.log(token + ',' + find);
        if (err) {
            callback(err, null);
        } else if (find) {
            callback(null, find[0].module);
        }
    });
};