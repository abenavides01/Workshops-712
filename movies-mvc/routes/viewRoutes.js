const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleWare');

// Rutas públicas
router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Iniciar Sesión' });
});

router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Rutas protegidas
router.use(isAuthenticated);

// Rutas de películas
router.get('/movies', movieController.getAllMoviesView);
router.get('/movies/add', movieController.getAddMovieForm);
router.post('/movies/add', movieController.createMovie);
router.get('/movies/:id/edit', movieController.getEditMovieForm);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);

// Rutas de usuarios (solo admin)
router.get('/users', isAdmin, userController.getAllUsersView);
router.get('/users/add', isAdmin, userController.getAddUserForm);
router.post('/users/add', isAdmin, userController.createUser);
router.get('/users/:id/edit', isAdmin, userController.getEditUserForm);
router.put('/users/:id', isAdmin, userController.updateUser);
router.delete('/users/:id', isAdmin, userController.deleteUser);

// Ruta principal
router.get('/', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        res.redirect('/movies');
    }
});

module.exports = router; 