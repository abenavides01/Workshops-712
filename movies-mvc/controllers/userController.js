const User = require('../models/userModel');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { title: 'Usuarios Registrados', users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los usuarios');
    }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    const { name, email, age, role } = req.body;
    try {
        const newUser = new User({ name, email, age, role });
        await newUser.save();
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el usuario');
    }
};

// Obtener el formulario de edición de un usuario
exports.getEditUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.render('editUser', { title: 'Editar Usuario', user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el usuario para editar');
    }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, age, role } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { name, email, age, role }, 
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el usuario');
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.redirect('/users'); // Redirige a la lista de usuarios
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el usuario');
    }
};