const Favorite = require('../models/favoriteModel');
const Movie = require('../models/movieModel');

// API REST endpoints
exports.getAllFavoritesAPI = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user.id })
            .populate('movie', 'title director releaseYear genre')
            .exec();
        res.json(favorites);
    } catch (error) {
        console.error("Error al obtener los favoritos:", error);
        res.status(500).json({ error: 'Error al obtener los favoritos' });
    }
};

exports.getFavoriteByIdAPI = async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id)
            .populate('movie', 'title director releaseYear genre')
            .exec();
        if (!favorite) {
            return res.status(404).json({ error: 'Favorito no encontrado' });
        }
        if (favorite.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'No tienes permiso para ver este favorito' });
        }
        res.json(favorite);
    } catch (error) {
        console.error("Error al obtener el favorito:", error);
        res.status(500).json({ error: 'Error al obtener el favorito' });
    }
};

exports.addFavoriteAPI = async (req, res) => {
    const { movieId } = req.body;
    const userId = req.user.id;

    try {
        const existingFavorite = await Favorite.findOne({ user: userId, movie: movieId });
        if (existingFavorite) {
            return res.status(400).json({ error: 'Esta película ya está en tus favoritos' });
        }

        const newFavorite = new Favorite({ user: userId, movie: movieId });
        await newFavorite.save();

        const populatedFavorite = await Favorite.findById(newFavorite._id)
            .populate('movie', 'title director releaseYear genre')
            .exec();

        res.status(201).json(populatedFavorite);
    } catch (error) {
        console.error("Error al agregar a favoritos:", error);
        res.status(500).json({ error: 'Error al agregar a favoritos' });
    }
};

exports.removeFavoriteAPI = async (req, res) => {
    const favoriteId = req.params.id;
    const userId = req.user.id;

    try {
        const favorite = await Favorite.findById(favoriteId);
        if (!favorite) {
            return res.status(404).json({ error: 'Favorito no encontrado' });
        }

        if (favorite.user.toString() !== userId) {
            return res.status(403).json({ error: 'No tienes permiso para eliminar este favorito' });
        }

        await Favorite.findByIdAndDelete(favoriteId);
        res.json({ message: 'Favorito eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar de favoritos:", error);
        res.status(500).json({ error: 'Error al eliminar de favoritos' });
    }
};

// Vista endpoints (mantener la funcionalidad existente)
exports.addFavorite = async (req, res) => {
    const { movieId } = req.body;
    const userId = req.session.user.id;

    try {
        const existingFavorite = await Favorite.findOne({ user: userId, movie: movieId });
        if (existingFavorite) {
            return res.status(400).send('Esta película ya está en tus favoritos');
        }

        const newFavorite = new Favorite({ user: userId, movie: movieId });
        await newFavorite.save();

        res.redirect(`/movies/${movieId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar a favoritos');
    }
};

exports.removeFavorite = async (req, res) => {
    const { favoriteId } = req.params;
    const userId = req.session.user.id;

    try {
        const favorite = await Favorite.findById(favoriteId);
        if (!favorite) {
            return res.status(404).send('Favorito no encontrado');
        }

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