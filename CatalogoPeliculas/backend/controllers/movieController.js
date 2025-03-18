const Movie = require('../models/movieModel')
const Favorite = require('../models/favoriteModel')

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate('reviews').exec()

    let userFavorites = []
    if (req.session.user) {
      userFavorites = await Favorite.find({ user: req.session.user.id })
      userFavorites = userFavorites.map(fav => fav.movie.toString())
    }

    res.json({ movies, userFavorites })
  } catch (error) {
    console.error("Error al obtener las películas:", error)
    res.status(500).json({ error: 'Error al obtener las películas' })
  }
}

exports.addMovie = async (req, res) => {
  const { title, director, releaseYear, genre, synopsis, duration, coverImage } = req.body
  try {
    const newMovie = new Movie({ title, director, releaseYear, genre, synopsis, duration, coverImage })
    await newMovie.save()
    res.status(201).json(newMovie)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al agregar la película' })
  }
}

exports.updateMovie = async (req, res) => {
  const { id } = req.params
  const { title, director, releaseYear, genre, synopsis, duration, coverImage } = req.body
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, director, releaseYear, genre, synopsis, duration, coverImage },
      { new: true }
    )
    if (!updatedMovie) {
      return res.status(404).json({ error: 'Película no encontrada' })
    }
    res.json(updatedMovie)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar la película' })
  }
}

exports.deleteMovie = async (req, res) => {
  const { id } = req.params
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id)
    if (!deletedMovie) {
      return res.status(404).json({ error: 'Película no encontrada' })
    }
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar la película' })
  }
}