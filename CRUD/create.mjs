import { crearUsuario } from './db.js';  

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const response = await crearUsuario(body);
        return {
            statusCode: response.success ? 201 : 500,
            body: JSON.stringify(response)
        };
    } catch (error) {
        return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }
};