<template>
    <div>
        <h1>Users</h1>
        <List :users="users" titulo="Lista de usuarios" />
        <v-btn variant="outline" @click="buttonHandler"> click me! </v-btn>
        <v-btn variant="tonal" @click="buttonHandler"> click me! </v-btn>
        <v-btn variant="plain" @click="buttonHandler"> click me! </v-btn>
        <template>
            <div>
                <div class="text-subtitle-2 mb-2">Default</div>
                <v-expansion-panels>
                    <v-expansion-panel
                        v-for="i in 3"
                        :key="i"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        title="Item"
                    ></v-expansion-panel>
                </v-expansion-panels>
            </div>
        </template>
    </div>
</template>
<script setup>
import { useUsersStore } from "@/store/users";
import { onMounted, ref } from "vue";

const { fetchUsers } = useUsersStore();

const users = ref([]);

const buttonHandler = () => {
    console.log("Clicked!");
};

onMounted(async () => {
    users.value = await fetchUsers();
});
</script>
