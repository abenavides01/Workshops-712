<template>
    <div>
        <h1>Mis Películas Favoritas</h1>
        <div v-for="movie in favorites" :key="movie.id">
            <nuxt-link :to="`/movie/${movie.id}`">{{ movie.title }}</nuxt-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const favorites = ref([])
const { $api } = useNuxtApp()

onMounted(async () => {
    const response = await $api.get('/favorites')
    favorites.value = response.data
})
</script>