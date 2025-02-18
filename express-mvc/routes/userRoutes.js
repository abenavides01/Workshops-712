const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Crear un nuevo usuario
router.post('/', userController.createUser);

// Obtener el formulario de edición
router.get('/edit/:id', userController.getUserById);

// Editar usuario
router.post('/edit/:id', userController.editUser);

// Eliminar usuario
router.post('/delete/:id', userController.deleteUser);

module.exports = router;
