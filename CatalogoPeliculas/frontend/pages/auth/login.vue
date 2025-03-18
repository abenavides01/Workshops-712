<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Iniciar Sesión</h3>
                    </div>
                    <div class="card-body">
                        <div v-if="error" class="alert alert-danger" role="alert">
                            {{ error }}
                        </div>
                        <form @submit.prevent="login">
                            <div class="mb-3">
                                <label for="email" class="form-label">Correo Electrónico</label>
                                <input type="email" class="form-control" id="email" v-model="email" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="password" v-model="password" required>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const { $api } = useNuxtApp()

const login = async () => {
    try {
        const response = await $api.post('/auth/login', { email: email.value, password: password.value })
        localStorage.setItem('token', response.data.token)
        router.push('/movies')
    } catch (err) {
        error.value = 'Email o contraseña incorrectos'
    }
}
</script>