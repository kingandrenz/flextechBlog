const express = require('express');
const router = express.Router();
const user_login = require('../controllers/loginController');
const redirectIfAuthenticated = require('../middleware/redirectIfAuthenticated');

// Import the reset password controller functions
const {
    showForgotPasswordForm,
    processForgotPasswordRequest,
    showResetPasswordForm,
    processResetPasswordRequest,
} = require('../controllers/resetPasswordController');


// Login routes
router.get('/', redirectIfAuthenticated, user_login.getUser_login);
router.post('/', redirectIfAuthenticated, user_login.postUser_login);

// Forgot Password routes
//router.get('/blogs/users/forgot-password', showForgotPasswordForm);
router.post('/blogs/users/forgot-password', processForgotPasswordRequest);

// Reset Password routes
//router.get('/blogs/users/reset-password/:token', showResetPasswordForm);
router.post('/blogs/users/reset-password/:token', processResetPasswordRequest);

module.exports = router;
