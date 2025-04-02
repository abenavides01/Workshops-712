import { actualizarUsuario } from './db.js';

export const handler = async (event) => {
    try {
        const id = event.pathParameters.id;
        const body = JSON.parse(event.body);
        const response = await actualizarUsuario(id, body);
        return {
            statusCode: response.success ? 200 : 404,
            body: JSON.stringify(response)
        };
    } catch (error) {
        return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }
}; 