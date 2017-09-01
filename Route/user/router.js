const router = require('express').Router();
const logic = require('./logic');
const userModel = require('../../database/Model/userModel');
const fcm = require('../fcmSend');

router.route('/auth/open').get((req, res) => {
    let token = req.query.token;

    let user = new userModel({ "token": token });

    logic.saveToken(user).then((status) => {
        req.session.key = token;
        res.status(status).send({ 'Result': '사용자 생성완료' });
        res.end();

    }).catch((err) => {
        logic.findModule(token, (err, find) => {
            console.log(find);
            if (err) {
                console.log('모듈 번호 찾기 에러');
                res.status(500).json(err);
                res.end();

            } else if (0 < find.length) {
                req.session.key = token;
                console.log(req.session.key);
                res.status(200).json(find);
                res.end();

            } else {
                req.session.key = token;
                res.status(204).send({ 'Data': 'Not Found Data' });
                res.end();
            }

        });
    });
});

router.route('/auth/add').get((req, res) => {
    let code = req.query.code;
    if (req.session.key) {
        userModel.findModule(req.session.key, (err, find) => {
            if (find[0].module) {
                res.status(400);
                res.end();
            } else {
                userModel.update({ token: req.session.key }, { $set: { module: code } }, (err, change) => {
                    if (err) {
                        console.log(err);
                    }
                    res.status(204);
                    res.end();
                });
            }

        });

    } else {
        res.status(401);
        res.end();
    }
});

router.route('/auth/delete').delete((req, res) => {
    if (req.session.key) {
        userModel.updateModule(req.session.key, (err) => {
            if (err) {
                res.status(400);
                res.end();
            } else {
                res.status(204);
                res.end();
            }
        });
    } else {
        res.status(401);
        res.end();
    }
});

module.exports = router;