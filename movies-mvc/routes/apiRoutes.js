const express = require('express');
const router = express.Router();
const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const movieRouter = require('./movieRoutes');
const reviewRouter = require('./reviewRoutes');
const favoriteRouter = require('./favoriteRoutes');
const dashboardRouter = require('./dashboardRoutes');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleWare');

// Rutas de autenticación (públicas)
router.use('/auth', authRouter);

// Rutas protegidas
router.use('/users', isAuthenticated, userRouter);
router.use('/movies', isAuthenticated, movieRouter);
router.use('/reviews', isAuthenticated, reviewRouter);
router.use('/favorites', isAuthenticated, favoriteRouter);
router.use('/dashboard', isAuthenticated, isAdmin, dashboardRouter);

// Middleware para manejar errores 404 en API
router.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = router; 