const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const { title } = require('process');
const userRouter = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
 
dotenv.config();//inicialización de las const

const app = express();//inicialización de express
const port = 3003;//variable constante

//Middleware de autenticación
app.set('view engine', 'ejs');//use el view engine
app.set('views', path.join(__dirname, 'views'));//busque las vista en 'views'
app.use(expressLayout);
app.use(express.urlencoded({extended: true}));//para evitar problemas de url a la hora de hacer request
app.use(express.static(path.join(__dirname, 'css')));//busque las vista en 'css'

//Middleware de gestion de sesiones
app.use(session({
    secret: 'session26',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

//Conexión a MongoDB
mongoose.connect(process.env.MONGOD_URI)//pasa la url de la conexión
    .then(()=>console.log("Conncetado a MongoDB Atlas"))//then es algo asincrono
    .catch((error)=> console.error("Error al conectar a MongoDB Atlas: ", error));

//Rutas
app.use('/', userRouter);
app.use('/', adminRoutes);
app.get('/', (req, res) => {
    res.render('index', { title: 'Bienvenido' });
});

app.listen(port, ()=>{
    console.log(`Servidor escuchando en http://localhost:${port}`);
})