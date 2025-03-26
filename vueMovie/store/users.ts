import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  _id: string
  username: string
  email: string
  name: string
  age: number
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const API_URL = 'http://localhost:3002'

  const fetchUsers = async () => {
    try {
      loading.value = true
      error.value = null
      console.log('Intentando obtener usuarios...')
      const response = await fetch(`${API_URL}/api/users`, {
        headers: {
          'Accept': 'application/json'
        }
      })
      console.log('Respuesta recibida:', response.status)
      if (!response.ok) {
        const errorData = await response.text()
        console.error('Error en la respuesta:', errorData)
        throw new Error(`Error al obtener usuarios: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      console.log('Datos recibidos:', data)
      users.value = data
      return users.value
    } catch (err) {
      console.error('Error completo:', err)
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createUser = async (userData: Omit<User, '_id'>) => {
    try {
      loading.value = true
      error.value = null
      console.log('Creando usuario:', userData)
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error al crear usuario:', errorData)
        throw new Error(errorData.error || 'Error al crear usuario')
      }
      const newUser = await response.json()
      console.log('Usuario creado:', newUser)
      users.value.push(newUser)
      return newUser
    } catch (err) {
      console.error('Error al crear usuario:', err)
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id: string, userData: Partial<User>) => {
    try {
      loading.value = true
      error.value = null
      console.log('Actualizando usuario:', id, userData)
      const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error al actualizar usuario:', errorData)
        throw new Error(errorData.error || 'Error al actualizar usuario')
      }
      const updatedUser = await response.json()
      console.log('Usuario actualizado:', updatedUser)
      const index = users.value.findIndex(u => u._id === id)
      if (index !== -1) {
        users.value[index] = updatedUser
      }
      return updatedUser
    } catch (err) {
      console.error('Error al actualizar usuario:', err)
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      console.log('Eliminando usuario:', id)
      const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      })
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error al eliminar usuario:', errorData)
        throw new Error(errorData.error || 'Error al eliminar usuario')
      }
      users.value = users.value.filter(u => u._id !== id)
      return true
    } catch (err) {
      console.error('Error al eliminar usuario:', err)
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
})
