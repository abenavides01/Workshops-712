const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de autenticación
router.get('/register', userController.showRegisterForm);
router.post('/register', userController.registerUser);

router.get('/login', userController.showLoginForm);
router.post('/login', userController.loginUser);

router.get('/logout', userController.logoutUser);

module.exports = router;