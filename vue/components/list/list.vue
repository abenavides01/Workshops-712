<template>
    <div class="list">
        <h1>{{ titulo }}</h1>
        <div v-if="!users.length">Loading...</div>
        <div v-else>
            <ul>
                <li v-for="user in users" :key="user.id">
                    {{ user.name }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    users: {
        type: Array,
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    },
});
</script>
<style>
.list ul {
    list-style: none;
}
</style>
