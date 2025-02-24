// controllers/adminController.js
const Movie = require('../models/movieModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');

// Vista del Dashboard
exports.viewDashboard = async (req, res) => {
    try {
        // Obtener cantidad total de películas
        const totalMovies = await Movie.countDocuments();
        
        // Obtener estadísticas de las películas más vistas y mejor puntuadas
        const topRatedMovies = await Movie.find().sort({ rating: -1 }).limit(5); // Películas mejor puntuadas
        const mostViewedMovies = await Movie.find().sort({ views: -1 }).limit(5); // Películas más vistas

        res.render('admin/dashboard', {
            title: 'Dashboard de Administración',
            totalMovies,
            topRatedMovies,
            mostViewedMovies
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el dashboard');
    }
};

// Estadísticas de películas más vistas y mejor puntuadas
exports.viewStatistics = async (req, res) => {
    try {
        const topRatedMovies = await Movie.find().sort({ rating: -1 }).limit(5);
        const mostViewedMovies = await Movie.find().sort({ views: -1 }).limit(5);

        res.render('admin/statistics', {
            title: 'Estadísticas de Películas',
            topRatedMovies,
            mostViewedMovies
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar las estadísticas');
    }
};

// Gestión de usuarios
exports.manageUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('admin/users', {
            title: 'Gestión de Usuarios',
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar los usuarios');
    }
};

// Revisión de reseñas
exports.manageReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('movie user');
        res.render('admin/reviews', {
            title: 'Revisión de Reseñas',
            reviews
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar las reseñas');
    }
};
