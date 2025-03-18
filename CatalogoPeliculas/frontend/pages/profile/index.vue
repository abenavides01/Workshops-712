<template>
    <div>
        <h1>Mi Perfil</h1>
        <p>Nombre: {{ user.name }}</p>
        <p>Correo Electrónico: {{ user.email }}</p>
        <!-- Más información del usuario -->
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const user = ref({})
const { $api } = useNuxtApp()

onMounted(async () => {
    const response = await $api.get('/user')
    user.value = response.data
})
</script>