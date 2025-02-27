const Favorite = require('../models/favoriteModel');
const Movie = require('../models/movieModel');

// Agregar una película a favoritos
exports.addFavorite = async (req, res) => {
    const { movieId } = req.body;
    const userId = req.session.user.id; // ID del usuario autenticado

    try {
        // Verificar si la película ya está en favoritos
        const existingFavorite = await Favorite.findOne({ user: userId, movie: movieId });
        if (existingFavorite) {
            return res.status(400).send('Esta película ya está en tus favoritos');
        }

        // Agregar a favoritos
        const newFavorite = new Favorite({ user: userId, movie: movieId });
        await newFavorite.save();

        res.redirect(`/movies/${movieId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar a favoritos');
    }
};

// Eliminar una película de favoritos
exports.removeFavorite = async (req, res) => {
    const { favoriteId } = req.params;
    const userId = req.session.user.id; // ID del usuario autenticado

    try {
        const favorite = await Favorite.findById(favoriteId);
        if (!favorite) {
            return res.status(404).send('Favorito no encontrado');
        }

        // Solo el usuario que agregó la película a favoritos puede eliminarla
        if (favorite.user.toString() !== userId) {
            return res.status(403).send('No tienes permiso para eliminar este favorito');
        }

        await Favorite.findByIdAndDelete(favoriteId);
        res.redirect(`/movies/${favorite.movie}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar de favoritos');
    }
};