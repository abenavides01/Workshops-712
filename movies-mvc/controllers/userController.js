const User = require('../models/userModel');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { title: 'Usuarios Registrados', users, editUser: null }); // Agrega editUser como null
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los usuarios');
    }
};

// Crear usuario
exports.createUser = async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el usuario');
    }
};

// Obtener usuario por ID y renderizar el formulario de edición
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const users = await User.find(); // 🔹 Para mostrar la lista junto con la edición
        res.render('users', { title: 'Editar Usuario', users, editUser: user }); // Pasa editUser con los datos del usuario
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el usuario');
    }
};

// Editar usuario
exports.editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    try {
        await User.findByIdAndUpdate(id, { name, email, age });
        res.redirect('/users'); // Redirige a la lista de usuarios
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el usuario');
    }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.redirect('/users'); // Redirige después de eliminar
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el usuario');
    }
};
