// models/reviewModel.js
const mongoose = require('mongoose');

// Esquema para la reseña
const reviewSchema = new mongoose.Schema({
    comment: { type: String, required: true }, // Comentario de la reseña
    rating: { type: Number, required: true, min: 1, max: 5 }, // Puntuación (1 a 5)
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true }, // Referencia a la película
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario que hizo la reseña
    date: { type: Date, default: Date.now } // Fecha de creación de la reseña
});

// Modelo de reseña
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
