<template>
    <v-app>
        <nav class="bg-gray-800 p-4">
            <div class="container mx-auto flex justify-between items-center">
                <NuxtLink to="/" class="text-white text-xl font-bold">Logo</NuxtLink>
                <div class="space-x-4">
                    <NuxtLink to="/" class="text-black hover:text-gray-300">Home</NuxtLink>
                    <NuxtLink to="/users" class="text-black hover:text-gray-300">Users</NuxtLink>
                </div>
            </div>
        </nav>
        <div>
            <NuxtPage />
        </div>
    </v-app>
</template>
