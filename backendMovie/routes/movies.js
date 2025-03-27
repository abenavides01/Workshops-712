const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Rutas para películas
router.get('/', movieController.getAllMovies);
router.post('/', movieController.createMovie);
router.patch('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);

module.exports = router; 