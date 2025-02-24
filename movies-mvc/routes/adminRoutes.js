// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Vista del dashboard de administración
router.get('/admin/dashboard', adminController.viewDashboard);

// Estadísticas de películas más vistas y mejor puntuadas
router.get('/statistics', adminController.viewStatistics);

// Gestión de usuarios y revisión de reseñas
router.get('/users', adminController.manageUsers);
router.get('/reviews', adminController.manageReviews);

module.exports = router;
