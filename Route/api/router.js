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

    Promise.all([logic.map(lati, longi), getNovel()]).then((data) => {
        console.log('data');
        console.log(data[1]);
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
            console.log(nArr);
            resolve({ writer: nArr });
        }).catch((err) => {
            console.log(err);
            reject(err);
        });

    });
}

function selectNovel(find) {
    let ar = new Array();
    let Arr = new Array();
    let temp;
    let rnum;

    //전달받은 매개변수 n만큼 배열 생성 ( 1~n )
    for (let i = 1; i <= 12; i++) {
        ar.push(i);
    }

    //값을 서로 섞기
    for (let i = 0; i < ar.length; i++) {
        rnum = Math.floor(Math.random() * 12); //난수발생
        temp = ar[i];
        ar[i] = ar[rnum];
        ar[rnum] = temp;
    }
    for (let i = 0; i < 5; i++) {
        Arr.push(find[ar[i]]);
    }
    return Arr;
}
module.exports = router;