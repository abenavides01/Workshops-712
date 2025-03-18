const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController'); // Importa el controlador
const { isAuthenticated } = require('../middleware/authMiddleWare');

// Proteger todas las rutas
router.use(isAuthenticated);

// Crear una reseña
router.post('/', reviewController.createReview); // Asegúrate de que createReview esté definido

// Eliminar una reseña
router.delete('/:reviewId', reviewController.deleteReview); // Asegúrate de que deleteReview esté definido

module.exports = router;