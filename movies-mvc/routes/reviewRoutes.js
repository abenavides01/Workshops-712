const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { isAuthenticated } = require('../middleware/authMiddleWare');

// Proteger todas las rutas
router.use(isAuthenticated);

// Rutas API REST
router.get('/', reviewController.getAllReviewsAPI);
router.get('/:id', reviewController.getReviewByIdAPI);
router.post('/', reviewController.createReviewAPI);
router.put('/:id', reviewController.updateReviewAPI);
router.delete('/:id', reviewController.deleteReviewAPI);

// Rutas de vistas
router.post('/create', reviewController.createReview);
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;