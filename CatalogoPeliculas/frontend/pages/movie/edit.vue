<template>
    <div>
        <h1>Editar Película</h1>
        <form @submit.prevent="updateMovie">
            <div class="mb-3">
                <label for="title" class="form-label">Título</label>
                <input type="text" v-model="movie.title" id="title" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="director" class="form-label">Director</label>
                <input type="text" v-model="movie.director" id="director" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="releaseYear" class="form-label">Año de Estreno</label>
                <input type="number" v-model="movie.releaseYear" id="releaseYear" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="genre" class="form-label">Género</label>
                <input type="text" v-model="movie.genre" id="genre" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="synopsis" class="form-label">Sinopsis</label>
                <textarea v-model="movie.synopsis" id="synopsis" class="form-control" required></textarea>
            </div>
            <div class="mb-3">
                <label for="duration" class="form-label">Duración (minutos)</label>
                <input type="number" v-model="movie.duration" id="duration" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="coverImage" class="form-label">URL de la Imagen de Portada</label>
                <input type="text" v-model="movie.coverImage" id="coverImage" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Actualizar Película</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

const route = useRoute()
const router = useRouter()
const movie = ref({
    title: '',
    director: '',
    releaseYear: '',
    genre: '',
    synopsis: '',
    duration: '',
    coverImage: ''
})
const { $api } = useNuxtApp()

onMounted(async () => {
    try {
        const response = await $api.get(`/movies/${route.params.id}`)
        movie.value = response.data
    } catch (error) {
        console.error('Error al obtener la película:', error)
    }
})

const updateMovie = async () => {
    try {
        await $api.put(`/movies/${route.params.id}`, movie.value)
        router.push('/movies')
    } catch (error) {
        console.error('Error al actualizar la película:', error)
    }
}
</script>