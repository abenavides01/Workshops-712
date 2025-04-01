const mongoose = require('mongoose');

const uri = 'mongodb+srv://andrepaobena:J5Zucz8gfxl457Wv@cluster.bo2mn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar:', err));

const userCollection = mongoose.connection.collection('users');

async function obtenerUsuarios() {
    try {
        const usuarios = await userCollection.find({}).toArray();
        return { success: true, data: usuarios };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = { obtenerUsuarios }; 