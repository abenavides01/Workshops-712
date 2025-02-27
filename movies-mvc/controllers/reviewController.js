const Review = require('../models/reviewModel');
const Movie = require('../models/movieModel');

// Crear una nueva reseña
exports.createReview = async (req, res) => {
    const { movieId, rating, comment } = req.body;
    const userId = req.session.user.id; // ID del usuario autenticado

    try {
        // Verificar si el usuario ya ha reseñado esta película
        const existingReview = await Review.findOne({ user: userId, movie: movieId });
        if (existingReview) {
            return res.status(400).send('Ya has reseñado esta película');
        }

        // Crear la reseña
        const newReview = new Review({ user: userId, movie: movieId, rating, comment });
        await newReview.save();

        // Actualizar la puntuación promedio de la película
        const movie = await Movie.findById(movieId);
        const reviews = await Review.find({ movie: movieId });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        movie.rating = totalRating / reviews.length;
        await movie.save();

        res.redirect(`/movies/${movieId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear la reseña');
    }
};

// Eliminar una reseña
exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.session.user.id; // ID del usuario autenticado

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).send('Reseña no encontrada');
        }

        // Solo el usuario que creó la reseña o un administrador puede eliminarla
        if (review.user.toString() !== userId && req.session.user.role !== 'administrador') {
            return res.status(403).send('No tienes permiso para eliminar esta reseña');
        }

        await Review.findByIdAndDelete(reviewId);

        // Actualizar la puntuación promedio de la película
        const movie = await Movie.findById(review.movie);
        const reviews = await Review.find({ movie: review.movie });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        movie.rating = reviews.length > 0 ? totalRating / reviews.length : 0;
        await movie.save();

        res.redirect(`/movies/${review.movie}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la reseña');
    }
};