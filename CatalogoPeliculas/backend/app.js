const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const userRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
const movieRouter = require('./routes/movieRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const favoriteRouter = require('./routes/favoriteRoutes')
const dashboardRouter = require('./routes/dashboardRoutes')
const { isAuthenticated, isAdmin } = require('./middleware/authMiddleWare')

dotenv.config()

const app = express()
const port = 3002

app.use(session({
  secret: process.env.SESSION_SECRET || 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGOD_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((error) => console.error("Error al conectar a MongoDB Atlas: ", error))

app.use('/api/auth', authRouter)
app.use('/api/users', isAuthenticated, userRouter)
app.use('/api/movies', isAuthenticated, movieRouter)
app.use('/api/reviews', isAuthenticated, reviewRouter)
app.use('/api/favorites', isAuthenticated, favoriteRouter)
app.use('/api/dashboard', isAuthenticated, isAdmin, dashboardRouter)

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})