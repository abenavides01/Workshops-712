const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { auth, isAdmin } = require('../middleware/auth');

// Rutas públicas
router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

// Rutas protegidas
router.post('/', auth, movieController.createMovie);
router.patch('/:id', auth, movieController.updateMovie);
router.delete('/:id', auth, movieController.deleteMovie);

module.exports = router; 