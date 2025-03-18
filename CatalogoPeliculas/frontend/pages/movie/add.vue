<template>
    <div>
        <h1>Agregar Película</h1>
        <form @submit.prevent="addMovie">
            <div class="mb-3">
                <label for="title" class="form-label">Título</label>
                <input type="text" v-model="title" id="title" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="director" class="form-label">Director</label>
                <input type="text" v-model="director" id="director" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="releaseYear" class="form-label">Año de Estreno</label>
                <input type="number" v-model="releaseYear" id="releaseYear" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="genre" class="form-label">Género</label>
                <input type="text" v-model="genre" id="genre" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="synopsis" class="form-label">Sinopsis</label>
                <textarea v-model="synopsis" id="synopsis" class="form-control" required></textarea>
            </div>
            <div class="mb-3">
                <label for="duration" class="form-label">Duración (minutos)</label>
                <input type="number" v-model="duration" id="duration" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="coverImage" class="form-label">URL de la Imagen de Portada</label>
                <input type="text" v-model="coverImage" id="coverImage" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Agregar Película</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNuxtApp } from '#app'

const title = ref('')
const director = ref('')
const releaseYear = ref('')
const genre = ref('')
const synopsis = ref('')
const duration = ref('')
const coverImage = ref('')
const { $api } = useNuxtApp()

const addMovie = async () => {
    try {
        await $api.post('/movies/add', {
            title: title.value,
            director: director.value,
            releaseYear: releaseYear.value,
            genre: genre.value,
            synopsis: synopsis.value,
            duration: duration.value,
            coverImage: coverImage.value
        })
        // Redirigir o mostrar un mensaje de éxito
    } catch (error) {
        console.error('Error al agregar la película:', error)
    }
}
</script>