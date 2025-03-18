const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { isAuthenticated } = require('../middleware/authMiddleWare');

// Proteger todas las rutas
router.use(isAuthenticated);

// Agregar una película a favoritos
router.post('/', favoriteController.addFavorite);

// Eliminar una película de favoritos
router.delete('/:favoriteId', favoriteController.removeFavorite);

module.exports = router;