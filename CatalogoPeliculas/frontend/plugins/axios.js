import axios from 'axios'

export default defineNuxtPlugin(() => {
    const api = axios.create({
        baseURL: 'http://localhost:3000/api', // Asegúrate de que esta URL sea correcta
    })

    return {
        provide: {
            api,
        },
    }
})