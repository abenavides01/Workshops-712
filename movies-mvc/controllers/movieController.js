

// Obtener todas las películas
const Movie = require('../models/movieModel');
const Favorite = require('../models/favoriteModel');

// Obtener todas las películas
exports.getAllMovies = async (req, res) => {
    try {
        // Obtener todas las películas de la base de datos
        const movies = await Movie.find().populate('reviews').exec(); // Popula las reseñas si es necesario

        let userFavorites = [];
        if (req.session.user) {
            // Obtener las películas favoritas del usuario
            userFavorites = await Favorite.find({ user: req.session.user.id });
            userFavorites = userFavorites.map(fav => fav.movie.toString()); // Convertir a array de IDs
        }

        // Renderizar la vista con los datos
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

// Mostrar formulario para agregar una película
exports.getAddMovieForm = (req, res) => {
    res.render('addMovie', { title: 'Agregar Película' });
};

// Agregar una nueva película
exports.addMovie = async (req, res) => {
    const { title, director, releaseYear, genre, synopsis, duration, coverImage } = req.body;
    try {
        const newMovie = new Movie({ title, director, releaseYear, genre, synopsis, duration, coverImage });
        await newMovie.save();
        res.redirect('/movies');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar la película');
    }
};

// Mostrar formulario para editar una película
exports.getEditMovieForm = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).send('Película no encontrada');
        }
        res.render('editMovie', { title: 'Editar Película', movie });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la película para editar');
    }
};

// Actualizar una película
exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, director, releaseYear, genre, synopsis, duration, coverImage } = req.body;
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            { title, director, releaseYear, genre, synopsis, duration, coverImage },
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

// Eliminar una película
exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).send('Película no encontrada');
        }
        res.redirect('/movies');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la película');
    }
};