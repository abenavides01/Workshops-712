import { obtenerUsuarios } from './db.js';

export const handler = async (event) => {
    try {
        const response = await obtenerUsuarios();
        return {
            statusCode: response.success ? 200 : 500,
            body: JSON.stringify(response)
        };
    } catch (error) {
        return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }
}; 