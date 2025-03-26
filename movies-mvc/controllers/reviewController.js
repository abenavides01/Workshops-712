const Review = require('../models/reviewModel');
const Movie = require('../models/movieModel');

// API REST endpoints
exports.getAllReviewsAPI = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'username')
            .populate('movie', 'title')
            .exec();
        res.json(reviews);
    } catch (error) {
        console.error("Error al obtener las reseñas:", error);
        res.status(500).json({ error: 'Error al obtener las reseñas' });
    }
};

exports.getReviewByIdAPI = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('user', 'username')
            .populate('movie', 'title')
            .exec();
        if (!review) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }
        res.json(review);
    } catch (error) {
        console.error("Error al obtener la reseña:", error);
        res.status(500).json({ error: 'Error al obtener la reseña' });
    }
};

exports.createReviewAPI = async (req, res) => {
    const { movieId, rating, comment } = req.body;
    const userId = req.user.id; // Asumiendo que el middleware de autenticación agrega req.user

    try {
        const existingReview = await Review.findOne({ user: userId, movie: movieId });
        if (existingReview) {
            return res.status(400).json({ error: 'Ya has reseñado esta película' });
        }

        const newReview = new Review({ user: userId, movie: movieId, rating, comment });
        await newReview.save();

        // Actualizar la puntuación promedio de la película
        const movie = await Movie.findById(movieId);
        const reviews = await Review.find({ movie: movieId });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        movie.rating = totalRating / reviews.length;
        await movie.save();

        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error al crear la reseña:", error);
        res.status(500).json({ error: 'Error al crear la reseña' });
    }
};

exports.updateReviewAPI = async (req, res) => {
    const { rating, comment } = req.body;
    const userId = req.user.id;
    const reviewId = req.params.id;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        if (review.user.toString() !== userId && req.user.role !== 'administrador') {
            return res.status(403).json({ error: 'No tienes permiso para actualizar esta reseña' });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { rating, comment },
            { new: true }
        );

        // Actualizar la puntuación promedio de la película
        const movie = await Movie.findById(review.movie);
        const reviews = await Review.find({ movie: review.movie });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        movie.rating = totalRating / reviews.length;
        await movie.save();

        res.json(updatedReview);
    } catch (error) {
        console.error("Error al actualizar la reseña:", error);
        res.status(500).json({ error: 'Error al actualizar la reseña' });
    }
};

exports.deleteReviewAPI = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        if (review.user.toString() !== userId && req.user.role !== 'administrador') {
            return res.status(403).json({ error: 'No tienes permiso para eliminar esta reseña' });
        }

        await Review.findByIdAndDelete(reviewId);

        // Actualizar la puntuación promedio de la película
        const movie = await Movie.findById(review.movie);
        const reviews = await Review.find({ movie: review.movie });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        movie.rating = reviews.length > 0 ? totalRating / reviews.length : 0;
        await movie.save();

        res.json({ message: 'Reseña eliminada correctamente' });
    } catch (error) {
        console.error("Error al eliminar la reseña:", error);
        res.status(500).json({ error: 'Error al eliminar la reseña' });
    }
};

// Vista endpoints (mantener la funcionalidad existente)
exports.createReview = async (req, res) => {
    const { movieId, rating, comment } = req.body;
    const userId = req.session.user.id;

    try {
        const existingReview = await Review.findOne({ user: userId, movie: movieId });
        if (existingReview) {
            return res.status(400).send('Ya has reseñado esta película');
        }

        const newReview = new Review({ user: userId, movie: movieId, rating, comment });
        await newReview.save();

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

exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.session.user.id;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).send('Reseña no encontrada');
        }

        if (review.user.toString() !== userId && req.session.user.role !== 'administrador') {
            return res.status(403).send('No tienes permiso para eliminar esta reseña');
        }

        await Review.findByIdAndDelete(reviewId);

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