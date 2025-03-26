import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Movie {
  _id: string
  title: string
  description: string
  year: number
  director: string
  genre: string
  rating: number
  imageUrl: string
}

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const API_URL = 'http://localhost:3002'

  const fetchMovies = async () => {
    try {
      loading.value = true
      error.value = null
      console.log('Intentando obtener películas...')
      const response = await fetch(`${API_URL}/api/movies`, {
        headers: {
          'Accept': 'application/json'
        }
      })
      console.log('Respuesta recibida:', response.status)
      if (!response.ok) {
        const errorData = await response.text()
        console.error('Error en la respuesta:', errorData)
        throw new Error(`Error al obtener películas: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      console.log('Datos recibidos:', data)
      movies.value = data
      return movies.value
    } catch (err) {
      console.error('Error completo:', err)
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createMovie = async (movieData: Omit<Movie, '_id'>) => {
    try {
      loading.value = true
      error.value = null
      console.log('Creando película:', movieData)
      const response = await fetch(`${API_URL}/api/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(movieData)
      })
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error al crear película:', errorData)
        throw new Error(errorData.error || 'Error al crear película')
      }
      const newMovie = await response.json()
      console.log('Película creada:', newMovie)
      movies.value.push(newMovie)
      return newMovie
    } catch (err) {
      console.error('Error al crear película:', err)
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateMovie = async (id: string, movieData: Partial<Movie>) => {
    try {
      loading.value = true
      error.value = null
      console.log('Actualizando película:', id, movieData)
      const response = await fetch(`${API_URL}/api/movies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(movieData)
      })
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error al actualizar película:', errorData)
        throw new Error(errorData.error || 'Error al actualizar película')
      }
      const updatedMovie = await response.json()
      console.log('Película actualizada:', updatedMovie)
      const index = movies.value.findIndex(m => m._id === id)
      if (index !== -1) {
        movies.value[index] = updatedMovie
      }
      return updatedMovie
    } catch (err) {
      console.error('Error al actualizar película:', err)
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteMovie = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      console.log('Eliminando película:', id)
      const response = await fetch(`${API_URL}/api/movies/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      })
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error al eliminar película:', errorData)
        throw new Error(errorData.error || 'Error al eliminar película')
      }
      movies.value = movies.value.filter(m => m._id !== id)
      return true
    } catch (err) {
      console.error('Error al eliminar película:', err)
      error.value = err instanceof Error ? err.message : 'Error desconocido'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    movies,
    loading,
    error,
    fetchMovies,
    createMovie,
    updateMovie,
    deleteMovie
  }
}) 