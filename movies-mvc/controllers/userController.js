const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { title: 'Usuarios Registrados', users, editUser: null });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los usuarios');
    }
};

// Mostrar formulario de registro
exports.showRegisterForm = (req, res) => {
    res.render('register', { title: 'Registro', error: null });
};

// Registrar usuario
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('register', { title: 'Registro', error: 'El correo ya está en uso' });
        }

        // Encriptar la contraseña
        //const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el registro');
    }
};

// Mostrar formulario de login
exports.showLoginForm = (req, res) => {
    res.render('login', { title: 'Login', error: null });
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {  // Comparar la contraseña en texto claro
            return res.render('login', { title: 'Login', error: 'Credenciales incorrectas' });
        }
        req.session.user = user; // Aquí puedes almacenar la información del usuario en la sesión
        
        if (user.role === "admin"){
            return res.redirect('/admin/dashboard');
        } else{
            return res.redirect('/user/movies');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el inicio de sesión');
    }
};

// Cerrar sesión
exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
