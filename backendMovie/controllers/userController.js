const User = require('../models/User');

// Crear usuario
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
    try {
        console.log('Actualizando usuario:', req.params.id);
        console.log('Datos recibidos:', req.body);

        const updates = Object.keys(req.body);
        const allowedUpdates = ['username', 'email', 'name', 'age'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            console.log('Actualizaciones inválidas:', updates);
            return res.status(400).json({ 
                error: 'Actualizaciones inválidas',
                allowedUpdates,
                receivedUpdates: updates
            });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            console.log('Usuario no encontrado:', req.params.id);
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        updates.forEach(update => {
            user[update] = req.body[update];
            console.log(`Actualizando ${update}:`, req.body[update]);
        });

        await user.save();
        console.log('Usuario actualizado:', user);
        res.json(user);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(400).json({ 
            error: error.message,
            details: error.errors ? Object.keys(error.errors) : undefined
        });
    }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await user.deleteOne();
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 