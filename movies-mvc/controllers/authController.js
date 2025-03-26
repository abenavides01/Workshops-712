// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// API REST endpoints
exports.loginAPI = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        // Generar token JWT
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            process.env.JWT_SECRET || 'tu_secreto_jwt',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

exports.logoutAPI = (req, res) => {
    // En una API REST, el logout se maneja del lado del cliente
    // simplemente eliminando el token
    res.json({ message: 'Sesión cerrada correctamente' });
};

exports.getCurrentUserAPI = (req, res) => {
    // El middleware de autenticación JWT ya habrá agregado el usuario a req.user
    res.json(req.user);
};

// Vista endpoints (mantener la funcionalidad existente)
exports.getLoginForm = (req, res) => {
    res.render('auth/login', { title: 'Iniciar Sesión' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user || user.password !== password) {
            return res.render('auth/login', {
                title: 'Iniciar Sesión',
                error: 'Email o contraseña incorrectos'
            });
        }

        // Guardar el usuario en la sesión
        req.session.user = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        console.log("Usuario autenticado:", req.session.user); // Verifica que la sesión se guardó correctamente

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('auth/login', {
            title: 'Iniciar Sesión',
            error: 'Error al iniciar sesión'
        });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
        }
        res.redirect('/auth/login');
    });
};