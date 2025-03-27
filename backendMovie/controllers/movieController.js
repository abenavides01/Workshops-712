const Movie = require('../models/Movie');

// Crear nueva película
exports.createMovie = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        console.error('Error detallado al crear película:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Error de validación',
                details: Object.values(error.errors).map(err => err.message)
            });
        }
        res.status(400).json({ error: 'Error al crear película', details: error.message });
    }
};

// Obtener todas las películas
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        console.error('Error al obtener películas:', error);
        res.status(500).json({ error: 'Error al obtener películas' });
    }
};

// Obtener una película por ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('createdBy', 'username');
        if (!movie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una película
exports.updateMovie = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'year', 'director', 'genre', 'rating', 'imageUrl'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Actualizaciones inválidas' });
    }

    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!movie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        res.json(movie);
    } catch (error) {
        console.error('Error al actualizar película:', error);
        res.status(400).json({ error: 'Error al actualizar película' });
    }
};

// Eliminar una película
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        res.json({ message: 'Película eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar película:', error);
        res.status(500).json({ error: 'Error al eliminar película' });
    }
}; 