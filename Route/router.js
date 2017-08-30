const router = require('express').Router();
const map = require('../database/Model/mapModel');
const logic = require('./logic');
let request = require('request');


router.route('/auth/weather').post((req, res) => {
    let lati = req.body.lati;
    let longi = req.body.longi;

    logic.search(lati, longi).then((data) => {
        res.send(data);
        res.end();
    });
});

router.route('/auth/search').get((req, res) => {
    let lati = req.query.lati;
    let longi = req.query.longi;
    let cate = req.query.category;

    logic.map(lati, longi).then((data) => {
        res.send(JSON.parse(data));
    })
});

router.route('/auth/getSi').get((req, res) => {
    let url = req.query.url;

});


module.exports = router;