const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { isAuthenticated } = require('../middleware/authMiddleWare');

// Proteger todas las rutas
router.use(isAuthenticated);

// Rutas de películas
router.get('/view', movieController.getAllMovies);
router.get('/add', movieController.getAddMovieForm);
router.post('/add', movieController.addMovie);
router.get('/:id/edit', movieController.getEditMovieForm);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);

// Rutas API REST
router.get('/', movieController.getAllMoviesAPI);
router.get('/:id', movieController.getMovieByIdAPI);
router.post('/', movieController.createMovieAPI);
router.put('/:id', movieController.updateMovieAPI);
router.delete('/:id', movieController.deleteMovieAPI);

module.exports = router;