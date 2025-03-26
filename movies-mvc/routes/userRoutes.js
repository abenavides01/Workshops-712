const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Proteger todas las rutas
router.use(isAuthenticated);

// Rutas API REST
router.get('/', userController.getAllUsersAPI);
router.get('/:id', userController.getUserByIdAPI);
router.post('/', userController.createUserAPI);
router.put('/:id', userController.updateUserAPI);
router.delete('/:id', userController.deleteUserAPI);

// Rutas de vistas (solo admin)
router.get('/view', isAdmin, userController.getAllUsers);
router.post('/create', isAdmin, userController.createUser);
router.get('/:id/edit', isAdmin, userController.getEditUser);
router.put('/:id', isAdmin, userController.updateUser);
router.delete('/:id', isAdmin, userController.deleteUser);

module.exports = router;