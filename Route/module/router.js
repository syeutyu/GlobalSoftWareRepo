const router = require('express').Router();
const logic = require('./logic');


router.route('/module/water').get((req, res) => {
    let module_num = req.query.module_num;
    logic.findByuser(module_num, 'water', res);
});

router.route('/module/door').get((req, res) => {
    let module_num = req.query.module_num;
    console.log(module_num);
    logic.findByuser(module_num, 'door', res);
});

module.exports = router;