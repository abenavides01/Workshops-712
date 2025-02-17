const User = require('../models/userModel');

exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.render('users', {title: 'Usuarios Registrados', users})
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al obtener los usuarios');
    }
}

exports.createUser = async (req, res) =>{
    const { name, email, age} = req.body;
    try {
        const newUser = new User({name, email, age});
        await newUser.save();
        res.redirect('/users');
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al obtener los usuarios');
    }
}