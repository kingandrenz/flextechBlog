// Logout routes
const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

// GET logout page
router.get('/', logoutController);
//router.post('/', logoutController.logout_post);

module.exports = router;