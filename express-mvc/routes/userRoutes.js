const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Obtener todos los usuarios
router.get('/', userController.getAllUsers);

//Crear un nuevo usuario
router.post('/', userController.createUser);

module.exports = router;