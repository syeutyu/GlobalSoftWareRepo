const router = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');
const logic = require('./logic');


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


    logic.search().then((num) => {
        console.log(num)
    });
});

router.route('/auth/getSi').get((req, res) => {
    let url = req.query.url;
    request(url, (err, res, body) => {
        console.log(body);
    });
});


module.exports = router;