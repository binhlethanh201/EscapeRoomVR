const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/authController');

router.get('/login', AuthController.loginForm);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

module.exports = router;
