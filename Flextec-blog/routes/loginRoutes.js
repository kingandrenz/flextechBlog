const express = require('express');
const router = express.Router();
const user_login = require('../controllers/loginController');
const redirectIfAuthenticated = require('../middleware/redirectIfAuthenticated');
const logoutController = require('../controllers/logoutController');

// Login routes
router.get('/', redirectIfAuthenticated, user_login.getUser_login);
router.post('/', redirectIfAuthenticated, user_login.postUser_login);

module.exports = router;
