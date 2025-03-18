<template>
    <div>
        <h1>Películas</h1>
        <nuxt-link to="/movies/add" class="btn btn-primary mb-3">Agregar Película</nuxt-link>
        <ul class="list-group">
            <li v-for="movie in movies" :key="movie._id" class="list-group-item">
                <h5>{{ movie.title }}</h5>
                <p><strong>Director:</strong> {{ movie.director }}</p>
                <p><strong>Año:</strong> {{ movie.releaseYear }}</p>
                <p><strong>Género:</strong> {{ movie.genre }}</p>
                <p><strong>Puntuación:</strong> {{ movie.rating !== undefined ? movie.rating.toFixed(1) : '0.0' }} / 5
                </p>
                <nuxt-link :to="`/movies/${movie._id}`" class="btn btn-info btn-sm">Ver Detalles</nuxt-link>
                <form v-if="user" :action="isFavorite(movie) ? `/favorites/${movie._id}?_method=DELETE` : '/favorites'"
                    method="POST" class="d-inline ms-2">
                    <input type="hidden" name="movieId" :value="movie._id">
                    <button type="submit" :class="isFavorite(movie) ? 'btn btn-danger' : 'btn btn-success'">{{
                        isFavorite(movie) ? 'Quitar de Favoritos' : 'Agregar a Favoritos' }}</button>
                </form>
                <nuxt-link v-if="user && user.role === 'administrador'" :to="`/movies/${movie._id}/edit`"
                    class="btn btn-warning btn-sm ms-2">Editar</nuxt-link>
                <form v-if="user && user.role === 'administrador'" :action="`/movies/${movie._id}?_method=DELETE`"
                    method="POST" class="d-inline ms-2">
                    <button type="submit" class="btn btn-danger btn-sm">Eliminar</button>
                </form>
            </li>
            <li v-if="movies.length === 0" class="list-group-item">No hay películas disponibles.</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const movies = ref([])
const user = ref(null)
const { $api } = useNuxtApp()

onMounted(async () => {
    try {
        const response = await $api.get('/movies')
        movies.value = response.data.movies
        user.value = response.data.user
    } catch (error) {
        console.error('Error al obtener las películas:', error)
    }
})

const isFavorite = (movie) => {
    return user.value && user.value.favorites.includes(movie._id)
}
</script>