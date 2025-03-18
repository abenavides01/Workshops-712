const User = require('../models/userModel')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los usuarios' })
  }
}

exports.createUser = async (req, res) => {
  const { name, email, age, role } = req.body
  try {
    const newUser = new User({ name, email, age, role })
    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear el usuario' })
  }
}

exports.getEditUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener el usuario para editar' })
  }
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const { name, email, age, role } = req.body
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age, role },
      { new: true }
    )
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar el usuario' })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar el usuario' })
  }
}