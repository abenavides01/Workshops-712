const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const movieRouter = require('./routes/movieRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const favoriteRouter = require('./routes/favoriteRoutes');
const dashboardRouter = require('./routes/dashboardRoutes');
const { isAuthenticated, isAdmin } = require('./middleware/authMiddleWare');

dotenv.config();

const app = express();
const port = 3002;

// Configuración de express-session
app.use(session({
    secret: process.env.SESSION_SECRET || 'tu_secreto_aqui',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// Middleware para pasar el usuario a todas las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para manejar JSON en las peticiones API
app.use(express.static(path.join(__dirname, 'css')));
app.use(methodOverride('_method'));

// Conectar a MongoDB
mongoose.connect(process.env.MONGOD_URI)
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((error) => console.error("Error al conectar a MongoDB Atlas: ", error));

// Rutas API (con prefijo /api)
app.use('/api/auth', authRouter);
app.use('/api/users', isAuthenticated, userRouter);
app.use('/api/movies', isAuthenticated, movieRouter);
app.use('/api/reviews', isAuthenticated, reviewRouter);
app.use('/api/favorites', isAuthenticated, favoriteRouter);
app.use('/api/dashboard', isAuthenticated, isAdmin, dashboardRouter);

// Middleware para manejar errores 404 en API
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'Ruta API no encontrada' });
});

// Rutas de vistas (sin prefijo /api)
app.use('/auth', authRouter);
app.use('/users', isAuthenticated, userRouter);
app.use('/movies', isAuthenticated, movieRouter);
app.use('/reviews', isAuthenticated, reviewRouter);
app.use('/favorites', isAuthenticated, favoriteRouter);
app.use('/dashboard', isAuthenticated, isAdmin, dashboardRouter);

// Redirigir la ruta principal al login si no está autenticado
app.get('/', (req, res) => {
    if (!req.session.user) {
        res.redirect('/auth/login');
    } else {
        res.render('index', { title: 'Bienvenido' });
    }
});

// En lugar de usar una vista 404, simplemente redirigimos al login
app.use((req, res) => {
    res.redirect('/auth/login');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});