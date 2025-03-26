<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">
        <NuxtLink to="/" class="navbar-item">
          Vue Movie
        </NuxtLink>
      </div>
      <div class="navbar-menu">
        <NuxtLink to="/users" class="navbar-item">
          Usuarios
        </NuxtLink>
        <NuxtLink to="/movies" class="navbar-item">
          Películas
        </NuxtLink>
      </div>
    </nav>

    <main class="container">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-menu {
  display: flex;
  gap: 1rem;
}

.navbar-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.navbar-item:hover {
  background-color: #34495e;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>


