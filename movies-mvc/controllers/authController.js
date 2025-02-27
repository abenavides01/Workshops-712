// controllers/authController.js
const User = require('../models/userModel');


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