import { obtenerUsuarioPorId } from './db.js';

export const handler = async (event) => {
    try {
        const id = event.pathParameters.id;
        const response = await obtenerUsuarioPorId(id);
        return {
            statusCode: response.success ? 200 : 404,
            body: JSON.stringify(response)
        };
    } catch (error) {
        return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }
}; 