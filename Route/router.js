let router = require('express').Router();
let logic = require('./logic');

router.route('/test').get(logic.test);

module.exports = router;