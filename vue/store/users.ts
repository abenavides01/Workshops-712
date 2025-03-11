import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', () => {

    const fetchUsers = async () => {
        //const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const response = await fetch('http://localhost:3002/users/api');
        const data = await response.json();
        return data;
    };

    const fetchUserById = async (id: number) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        return data;
    };

    return {
        fetchUsers,
        fetchUserById,
    };
});

