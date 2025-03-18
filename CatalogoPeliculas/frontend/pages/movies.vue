<template>
    <div>
        <h1>Catálogo de Películas</h1>
        <div v-for="movie in movies" :key="movie.id">
            <nuxt-link :to="`/movie/${movie.id}`">{{ movie.title }}</nuxt-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const movies = ref([])
const { $api } = useNuxtApp()

onMounted(async () => {
    try {
        const response = await $api.get('/movies')
        movies.value = response.data
    } catch (error) {
        console.error('Error al obtener las películas:', error)
    }
})
</script>