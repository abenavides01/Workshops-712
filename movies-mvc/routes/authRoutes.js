const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/authMiddleWare');

// Rutas API REST
router.post('/login', authController.loginAPI);
router.post('/logout', authController.logoutAPI);
router.get('/me', isAuthenticated, authController.getCurrentUserAPI);

// Rutas de vistas
router.get('/login', authController.getLoginForm);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;