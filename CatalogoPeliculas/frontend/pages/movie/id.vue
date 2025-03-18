<template>
    <div>
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.synopsis }}</p>
        <img :src="movie.image" alt="Movie Image" />
        <button @click="addToFavorites">Agregar a Favoritos</button>
        <ReviewForm />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNuxtApp } from '#app'
import ReviewForm from '~/components/ReviewForm.vue'

const route = useRoute()
const movie = ref({})
const { $api } = useNuxtApp()

onMounted(async () => {
    const response = await $api.get(`/movies/${route.params.id}`)
    movie.value = response.data
})

const addToFavorites = async () => {
    try {
        await $api.post('/favorites', { movieId: movie.value.id })
        // Manejar la respuesta y actualizar la UI según sea necesario
    } catch (error) {
        console.error('Error al agregar a favoritos:', error)
    }
}
</script>