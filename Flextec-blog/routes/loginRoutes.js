const express = require('express');
const router = express.Router();
const user_login = require('../controllers/loginController');


router.get('/', user_login.getUser_login );
router.post('/', user_login.postUser_login);

module.exports = router;
