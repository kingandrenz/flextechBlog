const express = require('express');
const router = express.Router();
const regUser_controller = require('../controllers/regUserController');
const redirectIfAuthenticated = require('../middleware/redirectIfAuthenticated');

router.get('/', redirectIfAuthenticated, regUser_controller.register_user);

router.post('/', redirectIfAuthenticated, regUser_controller.store_user);

module.exports = router;
