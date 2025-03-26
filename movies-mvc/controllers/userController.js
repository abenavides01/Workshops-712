const User = require('../models/userModel');

// API REST endpoints
exports.getAllUsersAPI = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Excluir contraseñas
        res.json(users);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

exports.getUserByIdAPI = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

exports.createUserAPI = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

exports.updateUserAPI = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

exports.deleteUserAPI = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

// Vista endpoints (mantener la funcionalidad existente)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { title: 'Usuarios Registrados', users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los usuarios');
    }
};

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

exports.getEditUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.render('editUser', { title: 'Editar Usuario', user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el usuario para editar');
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
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

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el usuario');
    }
};