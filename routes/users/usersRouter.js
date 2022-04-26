var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) { res.send('Hello from User Router :D')});

module.exports = router;
