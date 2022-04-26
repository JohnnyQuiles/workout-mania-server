var express = require('express');
var router = express.Router();

const { createUser } = require('./controller/userController');
const { checkIsEmpty, jwtMiddleware, vCreateData } = require('./lib/authMiddleware/index');
/* GET users listing. */
router.get('/', function(req, res, next) { res.send('Hello from Workout-mania User Router :D')});
router.post('/create-user', checkIsEmpty, vCreateData, createUser);
module.exports = router;
