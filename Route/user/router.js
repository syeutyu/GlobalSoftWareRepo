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
                res.status(400).send({ 'Data': 'Not Found Data' });
                res.end();
            }

        });
    });
});

module.exports = router;