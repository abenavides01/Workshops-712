const Movie = require('../models/movieModel');
const Favorite = require('../models/favoriteModel');

// API REST endpoints
exports.getAllMoviesAPI = async (req, res) => {
    try {
        const movies = await Movie.find().populate('reviews').exec();
        res.json(movies);
    } catch (error) {
        console.error("Error al obtener las películas:", error);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
};

exports.getMovieByIdAPI = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('reviews').exec();
        if (!movie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        res.json(movie);
    } catch (error) {
        console.error("Error al obtener la película:", error);
        res.status(500).json({ error: 'Error al obtener la película' });
    }
};

exports.createMovieAPI = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        console.error("Error al crear la película:", error);
        res.status(500).json({ error: 'Error al crear la película' });
    }
};

exports.updateMovieAPI = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMovie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        res.json(updatedMovie);
    } catch (error) {
        console.error("Error al actualizar la película:", error);
        res.status(500).json({ error: 'Error al actualizar la película' });
    }
};

exports.deleteMovieAPI = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        res.json({ message: 'Película eliminada correctamente' });
    } catch (error) {
        console.error("Error al eliminar la película:", error);
        res.status(500).json({ error: 'Error al eliminar la película' });
    }
};

// Vista endpoints (mantener la funcionalidad existente)
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find().populate('reviews').exec();
        let userFavorites = [];
        if (req.session.user) {
            userFavorites = await Favorite.find({ user: req.session.user.id });
            userFavorites = userFavorites.map(fav => fav.movie.toString());
        }
        res.render('movies', { 
            title: 'Películas', 
            movies, 
            userFavorites, 
            user: req.session.user || null 
        });
    } catch (error) {
        console.error("Error al obtener las películas:", error);
        res.status(500).send('Error al obtener las películas');
    }
};

exports.getAddMovieForm = (req, res) => {
    res.render('addMovie', { title: 'Agregar Película' });
};

exports.addMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.redirect('/movies');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar la película');
    }
};

exports.getEditMovieForm = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send('Película no encontrada');
        }
        res.render('editMovie', { title: 'Editar Película', movie });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la película para editar');
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMovie) {
            return res.status(404).send('Película no encontrada');
        }
        res.redirect('/movies');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la película');
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).send('Película no encontrada');
        }
        res.redirect('/movies');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la película');
    }
};