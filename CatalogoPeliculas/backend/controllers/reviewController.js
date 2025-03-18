const Review = require('../models/reviewModel')
const Movie = require('../models/movieModel')

exports.createReview = async (req, res) => {
  const { movieId, rating, comment } = req.body
  const userId = req.session.user.id

  try {
    const existingReview = await Review.findOne({ user: userId, movie: movieId })
    if (existingReview) {
      return res.status(400).json({ error: 'Ya has reseñado esta película' })
    }

    const newReview = new Review({ user: userId, movie: movieId, rating, comment })
    await newReview.save()

    const movie = await Movie.findById(movieId)
    const reviews = await Review.find({ movie: movieId })
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    movie.rating = totalRating / reviews.length
    await movie.save()

    res.status(201).json(newReview)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear la reseña' })
  }
}

exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params
  const userId = req.session.user.id

  try {
    const review = await Review.findById(reviewId)
    if (!review) {
      return res.status(404).json({ error: 'Reseña no encontrada' })
    }

    if (review.user.toString() !== userId && req.session.user.role !== 'administrador') {
      return res.status(403).json({ error: 'No tienes permiso para eliminar esta reseña' })
    }

    await Review.findByIdAndDelete(reviewId)

    const movie = await Movie.findById(review.movie)
    const reviews = await Review.find({ movie: review.movie })
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    movie.rating = reviews.length > 0 ? totalRating / reviews.length : 0
    await movie.save()

    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar la reseña' })
  }
}