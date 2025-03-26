<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  users: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>
