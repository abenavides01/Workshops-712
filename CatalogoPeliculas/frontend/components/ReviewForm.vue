<template>
    <form @submit.prevent="submitReview">
        <textarea v-model="comment" placeholder="Escribe tu reseña" required></textarea>
        <input v-model="rating" type="number" min="1" max="5" placeholder="Puntuación (1-5)" required />
        <button type="submit">Enviar Reseña</button>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useNuxtApp } from '#app'

const comment = ref('')
const rating = ref(1)
const { $api } = useNuxtApp()

const submitReview = async () => {
    try {
        await $api.post('/reviews', { comment: comment.value, rating: rating.value })
        // Manejar la respuesta y actualizar la UI según sea necesario
    } catch (error) {
        console.error('Error al enviar la reseña:', error)
    }
}
</script>