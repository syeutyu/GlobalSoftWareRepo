const router = require('express').Router();
const map = require('../../database/Model/mapModel');
const logic = require('./logic');
const request = require('request');
const novel = require('../../database/Model/novelModel');

router.route('/auth/weather').get((req, res) => {
    let lati = req.query.lati;
    let longi = req.query.longi;
    console.log(lati + ',' + longi);
    logic.search(lati, longi).then((data) => {
        console.log(data);
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

    Promise.all([logic.map(lati, longi), getNovel()]).then((data) => {
        console.log(data);
        res.status(200).json(data);
        res.end();
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
        res.end();
    });

});

function getNovel() {
    return new Promise((resolve, reject) => {

        novel.findNovel().then((find) => {
            let nArr = selectNovel(find);
            resolve(nArr);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });

    });
}

function selectNovel(find) {
    let nArr = new Array();
    for (let i = 0; i < 5; i++) {
        let random = Math.floor((Math.random() * 20) + 1);
        nArr.push(find[0]);
    }
    return nArr;
}
module.exports = router;