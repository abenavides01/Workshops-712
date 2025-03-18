<template>
    <div>
        <form @submit.prevent="createUser" class="mb-4">
            <div class="mb-3">
                <label for="name" class="form-label">Nombre</label>
                <input type="text" v-model="name" id="name" class="form-control" placeholder="Nombre" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Correo</label>
                <input type="email" v-model="email" id="email" class="form-control" placeholder="Correo" required>
            </div>
            <div class="mb-3">
                <label for="age" class="form-label">Edad</label>
                <input type="number" v-model="age" id="age" class="form-control" placeholder="Edad" required>
            </div>
            <div class="mb-3">
                <label for="role" class="form-label">Rol</label>
                <select v-model="role" id="role" class="form-control" required>
                    <option value="usuario">Usuario</option>
                    <option value="administrador">Administrador</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Crear Usuario</button>
        </form>

        <h2>Usuarios Registrados</h2>
        <ul class="list-group">
            <li v-for="user in users" :key="user._id" class="list-group-item">
                {{ user.name }} - {{ user.email }} - {{ user.age }} -
                <span :class="user.role === 'administrador' ? 'badge bg-danger' : 'badge bg-primary'">{{ user.role
                    }}</span>
                <nuxt-link :to="`/users/${user._id}/edit`" class="btn btn-warning btn-sm ms-2">Editar</nuxt-link>
                <form :action="`/users/${user._id}?_method=DELETE`" method="POST" class="d-inline ms-2">
                    <button type="submit" class="btn btn-danger btn-sm">Eliminar</button>
                </form>
            </li>
            <li v-if="users.length === 0" class="list-group-item">No hay usuarios disponibles.</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const name = ref('')
const email = ref('')
const age = ref('')
const role = ref('usuario')
const users = ref([])
const { $api } = useNuxtApp()

onMounted(async () => {
    try {
        const response = await $api.get('/users')
        users.value = response.data
    } catch (error) {
        console.error('Error al obtener los usuarios:', error)
    }
})

const createUser = async () => {
    try {
        await $api.post('/users', { name: name.value, email: email.value, age: age.value, role: role.value })
        // Actualizar la lista de usuarios
        const response = await $api.get('/users')
        users.value = response.data
    } catch (error) {
        console.error('Error al crear el usuario:', error)
    }
}
</script>