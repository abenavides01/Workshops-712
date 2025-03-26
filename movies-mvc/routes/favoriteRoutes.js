const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { isAuthenticated } = require('../middleware/authMiddleWare');

// Proteger todas las rutas
router.use(isAuthenticated);

// Rutas API REST
router.get('/', favoriteController.getAllFavoritesAPI);
router.get('/:id', favoriteController.getFavoriteByIdAPI);
router.post('/', favoriteController.addFavoriteAPI);
router.delete('/:id', favoriteController.removeFavoriteAPI);

// Rutas de vistas
router.post('/add', favoriteController.addFavorite);
router.delete('/:favoriteId', favoriteController.removeFavorite);

module.exports = router;