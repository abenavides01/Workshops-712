<template>
    <div class="movie-card">
        <img :src="movie.image" alt="Movie Image" />
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.synopsis }}</p>
        <nuxt-link :to="`/movie/${movie.id}`">Ver Detalles</nuxt-link>
    </div>
</template>

<script setup>
defineProps({
    movie: Object
})
</script>

<style scoped>
.movie-card {
    border: 1px solid #ddd;
    padding: 20px;
    margin: 10px;
    background-color: white;
    border-radius: 5px;
}

.movie-card img {
    max-width: 100%;
    height: auto;
}

.movie-card h2 {
    margin: 10px 0;
}

.movie-card p {
    color: #666;
}
</style>