const router = require('express').Router();
const logic = require('./logic');
const userModel = require('../../database/Model/userModel');
const fcm = require('../fcmSend');

router.route('/auth/open').get((req, res) => {
    let token = req.query.token;

    let user = new userModel({ "token": token });

    logic.saveToken(user).then((status) => {
        console.log('사용자 생성 완료');
        res.status(status);
        res.end();

    }).catch((err) => {
        logic.findModule(token, (err, find) => {
            console.log(find);
            if (err) {
                console.log('모듈 번호 찾기 에러');
                res.status(500).json(err);
                res.end();

            } else if (find[0]._doc.module) {
                console.log('성공');
                res.status(200).json(find[0]);
                res.end();

            } else {
                console.log('Data Not Found');
                res.status(204);
                res.end();
            }

        });
    });
});

router.route('/auth/add').get((req, res) => {
    let code = req.query.code;
    let token = req.query.token;
    console.log(code);
    userModel.findModule(token, (err, find) => {
        if (find[0].module) {
            res.status(400);
            res.end();
        } else {
            userModel.update({ token: token }, { $set: { module: code } }, (err, change) => {
                if (err) {
                    console.log(err);
                }
                res.status(204);
                res.end();
            });
        }

    });

});

router.route('/auth/delete').delete((req, res) => {
    let token = req.query.token;
    console.log(token);
    userModel.updateModule(token, (err, find) => {
        if (err) {
            res.status(400);
            res.end();
        } else {
            res.status(204);
            res.end();
        }
    });
});

module.exports = router;