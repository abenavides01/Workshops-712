<template>
  <div>
    <h1>Usuarios</h1>
    <div class="user-actions">
      <button @click="showCreateForm = true">Crear Usuario</button>
    </div>
    
    <!-- Mensaje de error -->
    <div v-if="store.error" class="error-message">
      {{ store.error }}
    </div>
    
    <!-- Indicador de carga -->
    <div v-if="store.loading" class="loading">
      Cargando...
    </div>
    
    <!-- Lista de usuarios -->
    <div v-else class="users-list">
      <div v-for="user in store.users" :key="user._id" class="user-card">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <p>Usuario: {{ user.username }}</p>
        <p>Edad: {{ user.age }}</p>
        <div class="user-actions">
          <button @click="handleEdit(user)" class="edit-button">
            Editar
          </button>
          <button @click="handleDelete(user._id)" class="delete-button">
            Eliminar
          </button>
        </div>
      </div>
    </div>
    
    <!-- Modal para crear/editar usuario -->
    <div v-if="showCreateForm || showEditForm" class="modal">
      <div class="modal-content">
        <h2>{{ showEditForm ? 'Editar Usuario' : 'Crear Usuario' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Nombre de usuario:</label>
            <input v-model="userForm.username" required>
          </div>
          <div class="form-group">
            <label>Nombre completo:</label>
            <input v-model="userForm.name" required>
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input v-model="userForm.email" type="email" required>
          </div>
          <div class="form-group">
            <label>Edad:</label>
            <input v-model="userForm.age" type="number" required>
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
import { useUsersStore } from '../store/users';
import { ref, onMounted } from 'vue';

const store = useUsersStore();
const showCreateForm = ref(false);
const showEditForm = ref(false);
const userForm = ref({
  username: '',
  name: '',
  email: '',
  age: ''
});
const editingUserId = ref(null);

const loadUsers = async () => {
  try {
    await store.fetchUsers();
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
};

const handleEdit = (user) => {
  userForm.value = {
    username: user.username,
    name: user.name,
    email: user.email,
    age: user.age
  };
  editingUserId.value = user._id;
  showEditForm.value = true;
};

const handleDelete = async (userId) => {
  if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    try {
      await store.deleteUser(userId);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  }
};

const handleSubmit = async () => {
  try {
    if (showEditForm.value) {
      await store.updateUser(editingUserId.value, userForm.value);
    } else {
      await store.createUser(userForm.value);
    }
    closeForm();
  } catch (error) {
    console.error('Error al guardar usuario:', error);
  }
};

const closeForm = () => {
  showCreateForm.value = false;
  showEditForm.value = false;
  userForm.value = {
    username: '',
    name: '',
    email: '',
    age: ''
  };
  editingUserId.value = null;
};

onMounted(async () => {
  await loadUsers();
});
</script>

<style scoped>
.user-actions {
  margin-bottom: 20px;
}

.users-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.user-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
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
