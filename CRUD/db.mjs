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
