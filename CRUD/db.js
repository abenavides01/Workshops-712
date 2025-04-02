import mongoose from 'mongoose';  

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar:', err));

const userCollection = mongoose.connection.collection('users');

export async function crearUsuario(userData) {
    try {
        const resultado = await userCollection.insertOne(userData);
        return { success: true, data: resultado };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function obtenerUsuarios() {
    try {
        const usuarios = await userCollection.find({}).toArray();
        return { success: true, data: usuarios };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function obtenerUsuarioPorId(id) {
    try {
        const usuario = await userCollection.findOne({ _id: new mongoose.Types.ObjectId(id) });
        return { success: true, data: usuario };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function actualizarUsuario(id, userData) {
    try {
        const resultado = await userCollection.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: userData }
        );
        return { success: true, data: resultado };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function eliminarUsuario(id) {
    try {
        const resultado = await userCollection.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        return { success: true, data: resultado };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
