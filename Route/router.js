const router = require('express').Router();
const map = require('../database/Model/mapModel');
const logic = require('./logic');
let request = require('request');

router.route('/auth/weather').get((req, res) => {
    let lati = req.query.lati;
    let longi = req.query.longi;

    logic.search(lati, longi).then((data) => {
        res.status(200).json(data);
        res.end();
    }).catch((err) => {
        res.status(400).send(err);
        res.end();
    });
});

router.route('/auth/search').get((req, res) => {
    let lati = req.query.lati;
    let longi = req.query.longi;
    let cate = req.query.category;

    logic.map(lati, longi).then((data) => {
        let arr = new Array();
        for (let i = 0; i < data.length; i++) {
            let object = {};
            object.id = data[i].id
            object.lati = data[i].frontLat;
            object.longi = data[i].frontLon;
            object.name = data[i].name;
            object.tel = data[i].telNo;
            arr.push(object);
        }
        return arr;

    }).then((arr) => {
        logic.getCategory(arr, (data) => {
            res.status(200).json(data);
        });
    }).catch((err) => {
        res.status(204).send({ err: err });
        res.end();
    });
});

router.route('/auth/getSi').get((req, res) => {
    let url = req.query.url;

});

module.exports = router;