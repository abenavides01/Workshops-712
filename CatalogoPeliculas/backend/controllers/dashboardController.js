const Movie = require('../models/movieModel')

exports.getDashboardStats = async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments()
    const mostViewedMovies = await Movie.find().sort({ views: -1 }).limit(5)
    const topRatedMovies = await Movie.find().sort({ rating: -1 }).limit(5)

    res.json({
      totalMovies,
      mostViewedMovies,
      topRatedMovies
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener las estadísticas' })
  }
}