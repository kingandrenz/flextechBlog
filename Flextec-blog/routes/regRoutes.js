const express = require('express');
const router = express.Router();
const regUser_controller = require('../controllers/regUserController');

router.get('/', regUser_controller.register_user);

router.post('/', regUser_controller.store_user);

module.exports = router;
