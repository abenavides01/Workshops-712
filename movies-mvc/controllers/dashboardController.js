const Movie = require('../models/movieModel');
const Review = require('../models/reviewModel');

// Obtener estadísticas del dashboard
exports.getDashboardStats = async (req, res) => {
    try {
        const totalMovies = await Movie.countDocuments();
        const mostViewedMovies = await Movie.find().sort({ views: -1 }).limit(5);
        const topRatedMovies = await Movie.find().sort({ rating: -1 }).limit(5);

        res.render('dashboard', {
            title: 'Dashboard',
            totalMovies,
            mostViewedMovies,
            topRatedMovies
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las estadísticas');
    }
};