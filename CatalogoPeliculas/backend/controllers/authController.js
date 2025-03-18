const User = require('../models/userModel')

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' })
    }

    // Guardar el usuario en la sesión
    req.session.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    }

    res.json({ token: 'fake-jwt-token' }) // Devuelve un token falso para la autenticación
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
}

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err)
    }
    res.status(200).json({ message: 'Sesión cerrada' })
  })
}