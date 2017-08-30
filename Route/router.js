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
        console.log('실행');
        logic.getCategory(arr, (data) => {
            console.log(data.length);
            res.json(data);
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

/* let add = (a,b,callback)=>{
    callback(a+b);
};

add((num)=>{
    console.log(num);
});

console.log('0');
*/