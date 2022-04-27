var express = require('express');
var router = express.Router();

const { getCurrentUser, createUser, userLogin } = require('./controller/userController');
const { checkIsEmpty, jwtMiddleware, vCreateData, vLoginData } = require('./lib/authMiddleware/index');
/* GET users listing. */
router.get('/', function(req, res, next) { res.send('Hello from Workout-Mania User Router :D')});
router.get('/get-current-user', jwtMiddleware, getCurrentUser);
router.post('/create-user', checkIsEmpty, vCreateData, createUser);
router.post('/login', checkIsEmpty, vLoginData, userLogin);
module.exports = router;
