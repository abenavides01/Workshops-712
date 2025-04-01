const mongoose = require('mongoose');

const uri = 'mongodb+srv://andrepaobena:J5Zucz8gfxl457Wv@cluster.bo2mn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar:', err));

const userCollection = mongoose.connection.collection('users');

async function eliminarUsuario(id) {
    try {
        const resultado = await userCollection.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        return { success: true, data: resultado };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = { eliminarUsuario }; 