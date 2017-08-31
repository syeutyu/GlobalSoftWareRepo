const fcm = require('../fcmSend');
const userModel = require('../../database/Model/userModel');

exports.findByuser = (module_num, type, res) => {
    userModel.findByUser(module_num, (err, find) => {
        if (err) {
            console.log(err);
        } else if (0 < find.length) {
            console.log(find);
            fcm.sendFcm(find[0].token, type).then((response) => {
                console.log(response);
                res.end();
            }).catch((err) => {
                console.log(err);
                res.end();
            });
        } else {
            console.log('해당되는 유저 정보 찾지못함');
            res.end();
        }
    });
};