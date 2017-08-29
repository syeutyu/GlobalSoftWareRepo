const router = require('express').Router();
const logic = require('./logic');

router.route('/auth/search').get((req, res) => {
    let lati = req.query.lati;
    let longi = req.query.longi;

    logic.search().then((num) => {
        console.log(num)
    })
});


module.exports = router;