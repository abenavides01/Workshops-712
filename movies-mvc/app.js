const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const movieRouter = require('./routes/movieRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const favoriteRouter = require('./routes/favoriteRoutes');
const dashboardRouter = require('./routes/dashboardRoutes');
const { isAuthenticated, isAdmin } = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/movies_db')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas API (con prefijo /api)
app.use('/api/auth', authRouter);
app.use('/api/users', isAuthenticated, userRouter);
app.use('/api/movies', isAuthenticated, movieRouter);
app.use('/api/reviews', isAuthenticated, reviewRouter);
app.use('/api/favorites', isAuthenticated, favoriteRouter);
app.use('/api/dashboard', isAuthenticated, isAdmin, dashboardRouter);

// Rutas de vistas (sin prefijo /api)
app.use('/auth', authRouter);
app.use('/users', isAuthenticated, userRouter);
app.use('/movies', isAuthenticated, movieRouter);
app.use('/reviews', isAuthenticated, reviewRouter);
app.use('/favorites', isAuthenticated, favoriteRouter);
app.use('/dashboard', isAuthenticated, isAdmin, dashboardRouter);

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});