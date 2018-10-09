
var bodyParser = require('body-parser');
var router = require('express').Router();

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));

router.use(require('./*user'));
router.use(require('./*login'));
router.use(require('./*profile'));



module.exports = router;

// var config = require('./config.js');

// console.dir(config);

