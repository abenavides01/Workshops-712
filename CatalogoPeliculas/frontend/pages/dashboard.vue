<template>
    <div>
        <h1>Dashboard de Administración</h1>
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Total de Películas</h5>
                        <p class="card-text">{{ totalMovies }}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Películas Más Vistas</h5>
                        <ul>
                            <li v-for="movie in mostViewedMovies" :key="movie._id">{{ movie.title }} ({{ movie.views }}
                                vistas)</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Películas Mejor Puntuadas</h5>
                        <ul>
                            <li v-for="movie in topRatedMovies" :key="movie._id">{{ movie.title }} ({{ movie.rating }}
                                estrellas)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const totalMovies = ref(0)
const mostViewedMovies = ref([])
const topRatedMovies = ref([]) // Corregido aquí
const { $api } = useNuxtApp()

onMounted(async () => {
    try {
        const response = await $api.get('/dashboard')
        totalMovies.value = response.data.totalMovies
        mostViewedMovies.value = response.data.mostViewedMovies
        topRatedMovies.value = response.data.topRatedMovies
    } catch (error) {
        console.error('Error al obtener las estadísticas del dashboard:', error)
    }
})
</script>