const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authMiddleWare');

// Proteger todas las rutas
router.use(isAuthenticated);

// Rutas de usuario
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id/edit', userController.getEditUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;