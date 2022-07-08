var express = require('express');
var router = express.Router();

const { getCurrentUser, createUser, userLogin, updateTheProfile } = require('./controller/userController');
const { checkIsEmpty, jwtMiddleware, vCreateData, vLoginData, vUpdateData } = require('./lib/authMiddleware/index');

/* GET users listing. */
router.get('/', function(req, res, next) { res.send('Hello from Workout-Mania User Router :D')});
router.get('/get-current-user', jwtMiddleware, getCurrentUser);
router.post('/create', createUser);
router.post('/login', userLogin);
router.post('/update-user-profile', jwtMiddleware, checkIsEmpty, vUpdateData, updateTheProfile);

module.exports = router;
