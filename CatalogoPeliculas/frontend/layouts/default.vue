<template>
    <div>
        <header>
            <nav>
                <nuxt-link to="/">Inicio</nuxt-link>
                <nuxt-link to="/movies">Películas</nuxt-link>
                <nuxt-link to="/profile">Perfil</nuxt-link>
            </nav>
        </header>
        <main>
            <NuxtPage />
        </main>
    </div>
</template>

<style scoped>
header {
    background-color: #007bff;
    padding: 10px;
    color: white;
}

nav a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
}

nav a:hover {
    text-decoration: underline;
}

main {
    padding: 20px;
}
</style>