const router = require('express').Router();
const logic = require('./logic');

// router.route('/module/wifi').get((req, res) => {
//     let data = req.query.gData;
//     console.log(data);
// }).post((req, res) => {
//     let data = req.query.gData;
//     console.log(data);
// });

// router.route('/').get((req, res) => {
//     console.log('클라 들어옴');
// }).post((req, res) => {
//     console.log('클라 들어옴');
// });

router.route('/module/water').get((req, res) => {
    let module_num = req.query.num;
    logic.findByuser(module_num, 'water', res);
});

router.route('/module/door').get((req, res) => {
    let module_num = req.query.num;
    console, log(module_num);
    logic.findByuser(module_num, 'door', res);
});

module.exports = router;