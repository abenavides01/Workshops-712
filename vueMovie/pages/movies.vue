<template>
  <div>
    <h1>Películas</h1>
    <div class="movie-actions">
      <button @click="showCreateForm = true">Crear Película</button>
    </div>
    
    <!-- Mensaje de error -->
    <div v-if="store.error" class="error-message">
      {{ store.error }}
    </div>
    
    <!-- Indicador de carga -->
    <div v-if="store.loading" class="loading">
      Cargando...
    </div>
    
    <!-- Lista de películas -->
    <div v-else class="movies-list">
      <div v-for="movie in store.movies" :key="movie._id" class="movie-card">
        <img v-if="movie.imageUrl" :src="movie.imageUrl" :alt="movie.title" class="movie-image">
        <h3>{{ movie.title }}</h3>
        <p class="director">Director: {{ movie.director }}</p>
        <p class="year">Año: {{ movie.year }}</p>
        <p class="genre">Género: {{ movie.genre }}</p>
        <p class="rating">Calificación: {{ movie.rating }}/10</p>
        <p class="description">{{ movie.description }}</p>
        <div class="movie-actions">
          <button @click="handleEdit(movie)" class="edit-button">
            Editar
          </button>
          <button @click="handleDelete(movie._id)" class="delete-button">
            Eliminar
          </button>
        </div>
      </div>
    </div>
    
    <!-- Modal para crear/editar película -->
    <div v-if="showCreateForm || showEditForm" class="modal">
      <div class="modal-content">
        <h2>{{ showEditForm ? 'Editar Película' : 'Crear Película' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Título:</label>
            <input v-model="movieForm.title" required>
          </div>
          <div class="form-group">
            <label>Director:</label>
            <input v-model="movieForm.director" required>
          </div>
          <div class="form-group">
            <label>Año:</label>
            <input v-model="movieForm.year" type="number" required>
          </div>
          <div class="form-group">
            <label>Género:</label>
            <input v-model="movieForm.genre" required>
          </div>
          <div class="form-group">
            <label>Calificación:</label>
            <input v-model="movieForm.rating" type="number" min="0" max="10" step="0.1" required>
          </div>
          <div class="form-group">
            <label>URL de la imagen:</label>
            <input v-model="movieForm.imageUrl">
          </div>
          <div class="form-group">
            <label>Descripción:</label>
            <textarea v-model="movieForm.description" required></textarea>
          </div>
          <div class="form-actions">
            <button type="submit">{{ showEditForm ? 'Actualizar' : 'Crear' }}</button>
            <button type="button" @click="closeForm">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMoviesStore } from '../store/movies';
import { ref, onMounted } from 'vue';

const store = useMoviesStore();
const showCreateForm = ref(false);
const showEditForm = ref(false);
const movieForm = ref({
  title: '',
  director: '',
  year: null,
  genre: '',
  rating: null,
  imageUrl: '',
  description: ''
});
const editingMovieId = ref(null);

const loadMovies = async () => {
  try {
    await store.fetchMovies();
  } catch (error) {
    console.error('Error al cargar películas:', error);
  }
};

const handleEdit = (movie) => {
  movieForm.value = {
    title: movie.title,
    director: movie.director,
    year: movie.year,
    genre: movie.genre,
    rating: movie.rating,
    imageUrl: movie.imageUrl,
    description: movie.description
  };
  editingMovieId.value = movie._id;
  showEditForm.value = true;
};

const handleDelete = async (movieId) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
    try {
      await store.deleteMovie(movieId);
    } catch (error) {
      console.error('Error al eliminar película:', error);
    }
  }
};

const handleSubmit = async () => {
  try {
    const movieData = {
      ...movieForm.value,
      year: Number(movieForm.value.year),
      rating: Number(movieForm.value.rating)
    };
    
    if (showEditForm.value) {
      await store.updateMovie(editingMovieId.value, movieData);
    } else {
      await store.createMovie(movieData);
    }
    closeForm();
    await loadMovies(); // Recargar la lista después de crear/editar
  } catch (error) {
    console.error('Error al guardar película:', error);
  }
};

const closeForm = () => {
  showCreateForm.value = false;
  showEditForm.value = false;
  movieForm.value = {
    title: '',
    director: '',
    year: null,
    genre: '',
    rating: null,
    imageUrl: '',
    description: ''
  };
  editingMovieId.value = null;
};

onMounted(async () => {
  await loadMovies();
});
</script>

<style scoped>
.movie-actions {
  margin-bottom: 20px;
}

.movies-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.movie-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.movie-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px;
}

.movie-card h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.movie-card p {
  margin: 5px 0;
  color: #666;
}

.director {
  font-weight: bold;
  color: #444;
}

.rating {
  color: #f39c12;
  font-weight: bold;
}

.description {
  margin-top: 10px;
  font-style: italic;
  color: #666;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.edit-button {
  background-color: #2196F3;
}

.edit-button:hover {
  background-color: #1976D2;
}

.delete-button {
  background-color: #f44336;
}

.delete-button:hover {
  background-color: #da190b;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
}

.loading {
  text-align: center;
  padding: 20px;
  font-style: italic;
}
</style> 