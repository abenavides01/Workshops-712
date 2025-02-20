const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    director: {type: String, required: true, unique: true},
    yearRelase: {type: String, required: true, unique: true},
    genre: {type: String, required:true, unique: true},
    synopsis: {type: String, required:true, unique: true},
    length: {type: String, required:true, unique: true},
    cover: {type: String, required:true, unique: true}
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;