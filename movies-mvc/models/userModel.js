const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        unique: true, 
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] // Validación de correo
    },
    password: { type: String, required: true },
    role: { 
        type: String, 
        required: true, 
        enum: ['user', 'admin'], // Role limitado a "user" o "admin"
        default: 'user' 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;