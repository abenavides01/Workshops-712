const Favorite = require('../models/favoriteModel')

exports.addFavorite = async (req, res) => {
  const { movieId } = req.body
  const userId = req.session.user.id

  try {
    const existingFavorite = await Favorite.findOne({ user: userId, movie: movieId })
    if (existingFavorite) {
      return res.status(400).json({ error: 'Esta película ya está en tus favoritos' })
    }

    const newFavorite = new Favorite({ user: userId, movie: movieId })
    await newFavorite.save()

    res.status(201).json(newFavorite)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al agregar a favoritos' })
  }
}

exports.removeFavorite = async (req, res) => {
  const { favoriteId } = req.params
  const userId = req.session.user.id

  try {
    const favorite = await Favorite.findById(favoriteId)
    if (!favorite) {
      return res.status(404).json({ error: 'Favorito no encontrado' })
    }

    if (favorite.user.toString() !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este favorito' })
    }

    await Favorite.findByIdAndDelete(favoriteId)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar de favoritos' })
  }
}