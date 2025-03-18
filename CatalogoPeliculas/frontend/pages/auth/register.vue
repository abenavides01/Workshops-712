<template>
    <div>
        <h1>Registrarse</h1>
        <form @submit.prevent="register">
            <input v-model="name" type="text" placeholder="Nombre" required />
            <input v-model="email" type="email" placeholder="Correo Electrónico" required />
            <input v-model="password" type="password" placeholder="Contraseña" required />
            <button type="submit">Registrarse</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const { $api } = useNuxtApp()

const register = async () => {
    try {
        await $api.post('/auth/register', { name: name.value, email: email.value, password: password.value })
        router.push('/auth/login')
    } catch (error) {
        console.error('Error al registrarse:', error)
    }
}
</script>